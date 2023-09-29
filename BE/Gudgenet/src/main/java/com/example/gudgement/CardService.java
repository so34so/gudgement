package com.example.gudgement;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CardService {

    private final RedisTemplate<String, String> redisTemplate;

    public void generateAndStoreCards(String roomNumber, String user) {
        // 각 유저에 대해 10장의 카드 생성 (금액은 임의로 설정)
        List<String> cards = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            int amount = (int)(Math.random() * 10000 + 1000); // 금액을 랜덤으로 설정
            cards.add("store" + (i+1) + ":" + amount);
        }

        // 카드 금액을 기준으로 정렬 후 순서 번호 부여
        Collections.sort(cards, Comparator.comparingInt(s -> Integer.parseInt(s.split(":")[1])));

        for (int i = 0; i < cards.size(); i++) {
            String cardInfo = cards.get(i) + ":" + (i+1); // 순서 번호 추가

            // 각 카드 정보를 Redis에 저장
            redisTemplate.opsForSet().add(roomNumber + ":" + user + ":cards", cardInfo);
        }
    }
    public String getRandomUsedCard(String roomNumber, String user) {
        Set<String> usedCards = redisTemplate.opsForSet().members(roomNumber + ":" + user + ":cards");

        if (usedCards != null && !usedCards.isEmpty()) {
            int size = usedCards.size();
            int item = new Random().nextInt(size);
            int i = 0;

            for(String usedCard : usedCards) {
                if (i == item)
                    return usedCard;
                i++;
            }
        }

        return null;
    }
}
