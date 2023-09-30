package com.example.gudgement.game.service;

import com.example.gudgement.CardService;
import com.example.gudgement.game.dto.*;
import com.example.gudgement.timer.service.TimerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class GameRoundServiceImpl implements GameRoundService {

    private final CardService cardService;
    private final RedisTemplate<String, String> redisTemplate;
    private final SimpMessagingTemplate messagingTemplate;


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

        if(otherUser == null){
            throw new RuntimeException("Other user is not found in Redis");
        }

        List<UserTiggleDto> userTiggles = new ArrayList<>();

        // 각 유저의 tiggle 값을 가져옵니다.
        for (String userNickName : Arrays.asList(userName, otherUser)) {
            log.info(userNickName+"입니다.");
            Object valueObj= redisTemplate.opsForHash().get(roomNumber, userNickName + ":tiggle");
            if(valueObj == null) throw new RuntimeException("Tiggle value is not found in Redis");

            Long tiggleValue= Long.parseLong(String.valueOf(valueObj));

            UserTiggleDto userTiggle= new UserTiggleDto(userNickName, tiggleValue);

            userTiggles.add(userTiggle);
        }

        Object roundsObj= redisTemplate.opsForHash().get(roomNumber, userName + ":rounds");
        if(roundsObj == null) throw new RuntimeException("Rounds value is not found in Redis");

        int rounds= Integer.parseInt(String.valueOf(roundsObj));

        // 상대방의 랜덤 카드 한 장을 가져옵니다.
        String cardString= cardService.getRandomUsedCard(roomNumber, otherUser);

        redisTemplate.opsForHash().put(roomNumber, otherUser + ":currentCard", cardString);

        CardInfoDto cardInfo= new CardInfoDto();
        cardInfo.setName(cardString.split(":")[0]);
        cardInfo.setAmount(Long.parseLong(cardString.split(":")[1]));
        cardInfo.setOrder(Integer.parseInt(cardString.split(":")[2]));

        return new GameRoundDto(userTiggles ,cardInfo,rounds);
    }

    public void playRound(BettingDto bettingDto) {
        String roomNumber = bettingDto.getRoomNumber();
        int round = bettingDto.getRounds();
        // Check if the user exists in Redis.
        Boolean hasKey = redisTemplate.opsForHash().hasKey(bettingDto.getRoomNumber(), bettingDto.getNickName() + ":status");

        if (!hasKey) {
            throw new IllegalArgumentException("Invalid nickname: " + bettingDto.getNickName());
        }

        // Update the acceptance status in Redis.
        redisTemplate.opsForHash().put(bettingDto.getRoomNumber(), bettingDto.getNickName() + ":status", "betting");

        // If both users have bet, then proceed with the comparison and result calculation
        if (allUsersBetting(roomNumber)) {
            // Both users have bet. Now we need to compare the cards and calculate the result

            String myCardString = (String)redisTemplate.opsForHash().get(roomNumber, bettingDto.getNickName()+":currentCard");
            String otherCardString = (String)redisTemplate.opsForHash().get(roomNumber ,  bettingDto.getOrderName()+":currentCard");


            Long myValue= Long.parseLong(myCardString.split(":")[1]);
            Long otherValue= Long.parseLong(otherCardString.split(":")[1]);

            RoundResultDto myResult = RoundResultDto.builder()
                    .isResult(myValue > otherValue)
                    .rounds(round)
                    .roomNumber(roomNumber)
                    .build();

            RoundResultDto otherResult = RoundResultDto.builder()
                    .isResult(myValue < otherValue)
                    .rounds(round)
                    .roomNumber(roomNumber)
                    .build();

            messagingTemplate.convertAndSendToUser(bettingDto.getNickName(), "/queue/start", myResult);
            messagingTemplate.convertAndSendToUser(bettingDto.getOrderName(), "/queue/start", otherResult);


            /* Reset status for next round */
            resetStatusForNextRound(roomNumber);
        }
    }

    private boolean allUsersBetting(String roomNumber) {
        // Get all keys (user info) from the Redis hash.
        Set<Object> membersKeys = redisTemplate.opsForHash().keys(roomNumber);

        for (Object keyObject : membersKeys) {
            String key = (String) keyObject;
            if (!key.endsWith(":status")) {  // Ignore keys that are not related to status.
                continue;
            }

            Object acceptanceStatusObj =  redisTemplate.opsForHash().get(roomNumber, key);

            if(acceptanceStatusObj == null || !"betting".equals(acceptanceStatusObj.toString())) {
                return false;  // If any user's status is not 'success', return false immediately.
            }
        }

        return true;  // If all users' statuses are 'success', return true.
    }

    private void resetStatusForNextRound(String roomNumber){
        // Get all keys (user info) from the Redis hash.
        Set<Object> membersKeys = redisTemplate.opsForHash().keys(roomNumber);

        for (Object keyObject : membersKeys) {
            String key = (String) keyObject;
            if (!key.endsWith(":status")) {  // Ignore keys that are not related to status.
                continue;
            }

            // Update the acceptance status in Redis to 'play'.
            redisTemplate.opsForHash().put(roomNumber, key, "play");
        }
    }


}
