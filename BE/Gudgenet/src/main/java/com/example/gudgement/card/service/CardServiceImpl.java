package com.example.gudgement.card.service;

import com.example.gudgement.account.entity.TransactionHistory;
import com.example.gudgement.account.entity.VirtualAccount;
import com.example.gudgement.account.repository.TransactionHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService{

    private final TransactionHistoryRepository transactionHistoryRepository;
    private final RedisTemplate<String, String> redisTemplate;

/*    public void generateAndStoreCards(String roomNumber, String user) {
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
    }*/

    public void generateAndStoreCards(VirtualAccount virtualAccountId, String roomNumber, String user) {
        // Get last month's date range
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfLastMonth = now.minusMonths(1).withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfLastMonth = now.withDayOfMonth(1).minusDays(1).withHour(23).withMinute(59).withSecond(59);

        // Fetch the transaction history of last month where type is 1
        List<TransactionHistory> transactionHistories = transactionHistoryRepository.findByVirtualAccountIdAndTransactionDateBetweenAndType(virtualAccountId, startOfLastMonth, endOfLastMonth, 1);

        if (transactionHistories.size() < 10) {
            throw new RuntimeException("Not enough transaction history");
        }

        List<String> cards = new ArrayList<>();

        for (TransactionHistory history : transactionHistories) {
            cards.add(history.getDepositSource() + ":" + history.getAmount());

            if(cards.size() == 10)
                break;
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
