package com.example.gudgement.game.service;

import com.example.gudgement.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class GameRoundServiceImpl implements GameRoundService {

    private final CardService cardService;
    private final RedisTemplate<String, String> redisTemplate;
    private final SimpMessagingTemplate messagingTemplate;

    // 각 사용자의 배팅 상태를 저장하는 Map
    private Map<String, Boolean> bettingStatus = new HashMap<>();

    public void startRound(String roomNumber, String currentUser) {
        // ... 기타 라운드 시작 로직 ...

        Set<String> members = redisTemplate.opsForSet().members(roomNumber);

        for(String member : members){
            if (!member.equals(currentUser)) {
                // 상대방의 사용한 카드 중 랜덤으로 하나 가져오기
                String usedCard = cardService.getRandomUsedCard(member);

                if (usedCard != null) {
                    // 가져온 카드 정보 삭제
                    redisTemplate.opsForSet().remove("roomnumber:" + member + ":usedcards", usedCard);

                    // 현재 유저에게 상대방의 카드 정보 전송
                    messagingTemplate.convertAndSendToUser(currentUser, "/queue/usedcard", usedCard);

                    // 배팅 상태 초기화
                    bettingStatus.put(member, false);
                }
            }
        }

        // 40초 후 체크하는 스케줄러 설정
        new Timer().schedule(new TimerTask() {
            @Override
            public void run() {
                checkBettingStatus(roomNumber);
            }
        }, 40000);  // 40초 후 실행

        // ... 기타 라운드 종료 로직 ...
    }

    public void checkBettingStatus(String roomNumber) {
        Set<String> members = redisTemplate.opsForSet().members(roomNumber);

        for(String member : members){
            if (!bettingStatus.getOrDefault(member,false)) {
                messagingTemplate.convertAndSendToUser(member,"/queue/result","You lost the round due to no response in time.");
            } else{
                compareCards();   // 카드 비교 메소드 호출
            }
        }
    }

    public void betReceived(String userName) {
        bettingStatus.put(userName,true);
    }

    public void compareCards() {
        /* 여기서 실제로 카드를 비교하고 결과를 반환합니다. */
    }
}
