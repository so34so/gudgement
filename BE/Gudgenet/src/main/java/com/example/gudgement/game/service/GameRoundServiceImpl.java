package com.example.gudgement.game.service;

import com.example.gudgement.CardService;
import com.example.gudgement.game.dto.CardInfoDto;
import com.example.gudgement.game.dto.GameRequestDto;
import com.example.gudgement.game.dto.GameRoundDto;
import com.example.gudgement.game.dto.UserTiggleDto;
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

        // 해당 카드 정보를 Redis에서 삭제합니다.
        redisTemplate.opsForSet().remove(roomNumber + ":" + otherUser + ":cards", cardString);

        CardInfoDto cardInfo= new CardInfoDto();
        cardInfo.setName(cardString.split(":")[0]);
        cardInfo.setAmount(Long.parseLong(cardString.split(":")[1]));
        cardInfo.setOrder(Integer.parseInt(cardString.split(":")[2]));

        return new GameRoundDto(userTiggles ,cardInfo,rounds);
    }


}
