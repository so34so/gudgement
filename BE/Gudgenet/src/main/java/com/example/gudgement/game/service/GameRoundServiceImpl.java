package com.example.gudgement.game.service;

import com.example.gudgement.card.service.CardService;
import com.example.gudgement.card.service.CardServiceImpl;
import com.example.gudgement.game.dto.*;
import com.example.gudgement.game.exception.BaseErrorException;
import com.example.gudgement.game.exception.GameErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class GameRoundServiceImpl implements GameRoundService {

    private final CardService cardService;
    private final RedisTemplate<String, String> redisTemplate;
    private final SimpMessagingTemplate messagingTemplate;


    @Transactional
    public GameRoundDto getGameStatus(GameRequestDto requestDto) {
        String roomNumber = requestDto.getRoomNumber();
        String userName = requestDto.getNickName();

        // 모든 키를 가져옵니다.
        Set<String> keys = redisTemplate.keys(roomNumber + "*:cards");

        String otherUser = null;

        // 'userName'을 제외한 다른 유저의 이름을 찾습니다.
        for (String key : keys) {
            String potentialOtherUser = key.split(":")[1];
            if (!potentialOtherUser.equals(userName)) {
                otherUser = potentialOtherUser;
                break;
            }
        }

        if (otherUser == null) {
            throw new BaseErrorException(GameErrorCode.NOT_FOUND_REDIS);
        }

        List<UserTiggleDto> userTiggles = new ArrayList<>();

        // 각 유저의 tiggle 값을 가져옵니다.
        for (String userNickName : Arrays.asList(userName, otherUser)) {
            log.info(userNickName + "입니다.");
            Object valueObj = redisTemplate.opsForHash().get(roomNumber, userNickName + ":tiggle");
            if (valueObj == null) throw new BaseErrorException(GameErrorCode.NOT_FOUND_REDIS);

            Long tiggleValue = Long.parseLong(String.valueOf(valueObj));

            UserTiggleDto userTiggle = new UserTiggleDto(userNickName, tiggleValue);

            userTiggles.add(userTiggle);
        }

        Object roundsObj = redisTemplate.opsForHash().get(roomNumber, userName + ":rounds");
        if (roundsObj == null) throw new BaseErrorException(GameErrorCode.NOT_FOUND_REDIS);

        int rounds = Integer.parseInt(String.valueOf(roundsObj));

        // 상대방의 랜덤 카드 한 장을 가져옵니다.
        String cardString = cardService.getRandomUsedCard(roomNumber, otherUser);

        redisTemplate.opsForHash().put(roomNumber, otherUser + ":currentCard", cardString);

        CardInfoDto cardInfo = new CardInfoDto();
        cardInfo.setName(cardString.split(":")[0]);
        cardInfo.setAmount(Long.parseLong(cardString.split(":")[1]));
        cardInfo.setOrder(Integer.parseInt(cardString.split(":")[2]));

        return new GameRoundDto(userTiggles, cardInfo, rounds);
    }

    @Transactional
    public void playRound(BettingDto bettingDto) {
        String roomNumber = bettingDto.getRoomNumber();
        int round = bettingDto.getRounds();
        RoundResultDto myResult;
        RoundResultDto otherResult;

        // Check if the user exists in Redis.
        Boolean hasKey = redisTemplate.opsForHash().hasKey(bettingDto.getRoomNumber(), bettingDto.getNickName() + ":status");

        if (!hasKey) {
            throw new IllegalArgumentException("Invalid nickname: " + bettingDto.getNickName());
        }

        // Update the acceptance status in Redis.
        redisTemplate.opsForHash().put(bettingDto.getRoomNumber(), bettingDto.getNickName() + ":status", "betting");
        redisTemplate.opsForHash().put(bettingDto.getRoomNumber(), bettingDto.getNickName() + ":bet", String.valueOf(bettingDto.getBettingAmount()));

        // If both users have bet, then proceed with the comparison and result calculation
        if (allUsersBetting(roomNumber)) {
            int myBet = Integer.parseInt((String) redisTemplate.opsForHash().get(roomNumber, bettingDto.getNickName() + ":bet"));
            int otherBet = Integer.parseInt((String) redisTemplate.opsForHash().get(roomNumber, bettingDto.getOtherName() + ":bet"));

            String myCardString = (String) redisTemplate.opsForHash().get(roomNumber, bettingDto.getNickName() + ":currentCard");
            String otherCardString = (String) redisTemplate.opsForHash().get(roomNumber, bettingDto.getOtherName() + ":currentCard");

            Long myValue = Long.parseLong(myCardString.split(":")[1]);
            Long otherValue = Long.parseLong(otherCardString.split(":")[1]);

            boolean iWon = !(myValue > otherValue);

            // Fetch the current tiggle values for each player
            int myTiggle = Integer.parseInt((String) redisTemplate.opsForHash().get(roomNumber, bettingDto.getNickName() + ":tiggle"));
            int otherTiggle = Integer.parseInt((String) redisTemplate.opsForHash().get(roomNumber, bettingDto.getOtherName() + ":tiggle"));

            if (iWon) {  // If I won...
                myTiggle += otherBet;  // Add the amount that the opponent bet to my tiggles.
                otherTiggle -= otherBet;  // Subtract the amount that the opponent bet from his/her own tiggles.
            } else {  // If I lost...
                myTiggle -= myBet;  // Subtract the amount that I bet from my own tiggles.
                otherTiggle += myBet;  // Add the amount that I bet to the opponent's tiggles.
            }

            if (myTiggle <= 0 || otherTiggle <= 0) {
                round = 10;
            }

            if (round == 10) {
                // If it's the final round or any player's tiggle is zero or less, determine the winner based on the tiggle values.
                boolean iWonFinal = myTiggle >= otherTiggle;  // If it's a tie, I win.

                myResult = RoundResultDto.builder()
                        .nickName(bettingDto.getNickName())
                        .isResult(iWonFinal)
                        .rounds(round)
                        .roomNumber(roomNumber)
                        .build();

                otherResult = RoundResultDto.builder()
                        .nickName(bettingDto.getOtherName())
                        .isResult(!iWonFinal)
                        .rounds(round)
                        .roomNumber(roomNumber)
                        .build();
            } else {
                myResult = RoundResultDto.builder()
                        .nickName(bettingDto.getNickName())
                        .isResult(iWon)
                        .rounds(round)
                        .roomNumber(roomNumber)
                        .build();

                otherResult = RoundResultDto.builder()
                        .nickName(bettingDto.getOtherName())
                        .isResult(!iWon)
                        .rounds(round)
                        .roomNumber(roomNumber)
                        .build();
            }

            redisTemplate.opsForHash().put(bettingDto.getRoomNumber(), bettingDto.getNickName() + ":tiggle", String.valueOf(myTiggle));
            redisTemplate.opsForHash().put(bettingDto.getRoomNumber(), bettingDto.getOtherName() + ":tiggle", String.valueOf(otherTiggle));

            
            messagingTemplate.convertAndSend("/topic/game/" + roomNumber + bettingDto.getNickName(), myResult);
            
            messagingTemplate.convertAndSend("/topic/game/" + roomNumber + bettingDto.getOtherName(), otherResult);

            /* Reset status for next round */
            resetStatusForNextRound(roomNumber);

            /*해당 선택된 카드 내용 redis에서 삭제하는 내용 구현*/
            for (String userNickName : Arrays.asList(bettingDto.getNickName(), bettingDto.getOtherName())) {
                String cardToRemove = (String) redisTemplate.opsForHash().get(roomNumber, userNickName + ":currentCard");
                Long removeResult = redisTemplate.opsForSet().remove(roomNumber + ":" + userNickName + ":cards", cardToRemove);

                if (removeResult == 0) {
                    throw new RuntimeException("Failed to remove the card: " + cardToRemove);
                }
            }
        }
    }

    @Transactional
    public void giveUpRound(BettingDto bettingDto) {
        String roomNumber = bettingDto.getRoomNumber();
        int round = bettingDto.getRounds();
        RoundResultDto myResult;
        RoundResultDto otherResult;
        // Check if the user exists in Redis.
        Boolean hasKey = redisTemplate.opsForHash().hasKey(bettingDto.getRoomNumber(), bettingDto.getNickName() + ":status");

        if (!hasKey) {
            throw new IllegalArgumentException("Invalid nickname: " + bettingDto.getNickName());
        }

        // If both users have bet, then proceed with the comparison and result calculation

        int myBet = Integer.parseInt((String) redisTemplate.opsForHash().get(roomNumber, bettingDto.getNickName() + ":betting"));

        myBet /= 10;

        String myCardString = (String) redisTemplate.opsForHash().get(roomNumber, bettingDto.getNickName() + ":currentCard");

        Long myValue = Long.parseLong(myCardString.split(":")[2]);

        if (myValue == 10) {
            myBet *= 2;
        }

        boolean iWon = false;

        // Fetch the current tiggle values for each player
        int myTiggle = Integer.parseInt((String) redisTemplate.opsForHash().get(roomNumber, bettingDto.getNickName() + ":tiggle"));
        int otherTiggle = Integer.parseInt((String) redisTemplate.opsForHash().get(roomNumber, bettingDto.getOtherName() + ":tiggle"));

        myTiggle -= myBet;  // Subtract the amount that I bet from my own tiggles.
        otherTiggle += myBet;  // Add the amount that I bet to the opponent's tiggles.

        if (myTiggle <= 0) {
            round = 10;
        }

        if (round == 10) {
            // If it's the final round or any player's tiggle is zero or less, determine the winner based on the tiggle values.
            boolean iWonFinal = myTiggle >= otherTiggle;  // If it's a tie, I win.

            myResult = RoundResultDto.builder()
                    .nickName(bettingDto.getNickName())
                    .isResult(iWonFinal)
                    .rounds(round)
                    .roomNumber(roomNumber)
                    .build();

            otherResult = RoundResultDto.builder()
                    .nickName(bettingDto.getOtherName())
                    .isResult(!iWonFinal)
                    .rounds(round)
                    .roomNumber(roomNumber)
                    .build();
        } else {
            myResult = RoundResultDto.builder()
                    .nickName(bettingDto.getNickName())
                    .isResult(iWon)
                    .rounds(round)
                    .roomNumber(roomNumber)
                    .build();

            otherResult = RoundResultDto.builder()
                    .nickName(bettingDto.getOtherName())
                    .isResult(!iWon)
                    .rounds(round)
                    .roomNumber(roomNumber)
                    .build();
        }

        redisTemplate.opsForHash().put(bettingDto.getRoomNumber(), bettingDto.getNickName() + ":tiggle", String.valueOf(myTiggle));
        redisTemplate.opsForHash().put(bettingDto.getRoomNumber(), bettingDto.getOtherName() + ":tiggle", String.valueOf(otherTiggle));

        messagingTemplate.convertAndSend("/topic/game/" + roomNumber, myResult);
        messagingTemplate.convertAndSend("/topic/game/" + roomNumber, otherResult);

        /* Reset status for next round */
        resetStatusForNextRound(roomNumber);

        /*해당 선택된 카드 내용 redis에서 삭제하는 내용 구현*/
        for (String userNickName : Arrays.asList(bettingDto.getNickName(), bettingDto.getOtherName())) {
            String cardToRemove = (String) redisTemplate.opsForHash().get(roomNumber, userNickName + ":currentCard");
            Long removeResult = redisTemplate.opsForSet().remove(roomNumber + ":" + userNickName + ":cards", cardToRemove);

            if (removeResult == 0) {
                throw new RuntimeException("Failed to remove the card: " + cardToRemove);
            }
        }
    }

    private boolean allUsersBetting (String roomNumber){
        // Get all keys (user info) from the Redis hash.
        Set<Object> membersKeys = redisTemplate.opsForHash().keys(roomNumber);

        for (Object keyObject : membersKeys) {
            String key = (String) keyObject;
            if (!key.endsWith(":status")) {  // Ignore keys that are not related to status.
                continue;
            }

            Object acceptanceStatusObj = redisTemplate.opsForHash().get(roomNumber, key);

            if (acceptanceStatusObj == null || !"betting".equals(acceptanceStatusObj.toString())) {
                return false;  // If any user's status is not 'success', return false immediately.
            }
        }

        return true;  // If all users' statuses are 'success', return true.
    }

    private void resetStatusForNextRound (String roomNumber){
        // Get all keys (user info) from the Redis hash.
        Set<Object> membersKeys = redisTemplate.opsForHash().keys(roomNumber);

        for (Object keyObject : membersKeys) {
            String key = (String) keyObject;

            if (key.endsWith(":rounds")) {  // If it's a rounds key, increment its value.
                redisTemplate.opsForHash().increment(roomNumber, key, 1);
            } else if (key.endsWith(":status")) {  // If it's a status key, update its value to 'play'.
                redisTemplate.opsForHash().put(roomNumber, key, "play");
            }
        }
    }
}
