package com.example.gudgement;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.redis.DataRedisTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

@DataRedisTest
@Import(TestConfig.class)
public class UserMatchingTest {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() throws JsonProcessingException {
        // 사용자 데이터를 Redis에 저장
        UserBetInfo user1 = new UserBetInfo("user:1", "JohnDoe", 1000, 3);
        UserBetInfo user2 = new UserBetInfo("user:2", "Alice", 1000, 2);
        UserBetInfo user3 = new UserBetInfo("user:3", "Bob", 1000, 3);
        UserBetInfo user4 = new UserBetInfo("user:4", "Eve", 1000, 4);
        UserBetInfo user5 = new UserBetInfo("user:5", "Charlie", 1500, 3);

        redisTemplate.opsForValue().set(user1.getKey(), objectMapper.writeValueAsString(user1));
        redisTemplate.opsForValue().set(user2.getKey(), objectMapper.writeValueAsString(user2));
        redisTemplate.opsForValue().set(user3.getKey(), objectMapper.writeValueAsString(user3));
        redisTemplate.opsForValue().set(user4.getKey(), objectMapper.writeValueAsString(user4));
        redisTemplate.opsForValue().set(user5.getKey(), objectMapper.writeValueAsString(user5));
    }

    @Test
    public void testMatchingLogic() throws JsonProcessingException {
        // 매칭 로직 테스트
        // 배팅 금액이 1000 이상인 사용자들 중 레벨이 비슷한 사람끼리 매칭

        // 매칭 기준: 배팅 금액이 1000 이상이고 레벨이 3인 사용자 검색
        String matchingCriteria = "betAmount >= 1000 && level == 3";

        // Redis에서 매칭 조건에 맞는 사용자 검색
        List<String> matchedUserKeys = new ArrayList<>();
        Set<String> allUserKeys = redisTemplate.keys("user:*");
        for (String userKey : allUserKeys) {
            String userJson = redisTemplate.opsForValue().get(userKey);
            UserBetInfo user = objectMapper.readValue(userJson, UserBetInfo.class);
            if (evaluateMatchingCriteria(user, matchingCriteria)) {
                matchedUserKeys.add(user.getKey());
            }
        }

        // 매칭된 사용자 키 목록 출력
        System.out.println("Matched Users: " + matchedUserKeys);

        // 매칭된 사용자 키 목록을 이용하여 매칭된 사용자 정보를 가져와서 테스트
        List<UserBetInfo> matchedUsers = new ArrayList<>();
        for (String userKey : matchedUserKeys) {
            String userJson = redisTemplate.opsForValue().get(userKey);
            UserBetInfo matchedUser = objectMapper.readValue(userJson, UserBetInfo.class);
            matchedUsers.add(matchedUser);
        }

        // 매칭된 사용자의 배팅 금액과 레벨 확인
        for (UserBetInfo user : matchedUsers) {
            assertThat(user.getBetAmount()).isGreaterThanOrEqualTo(1000);
            assertThat(user.getLevel()).isEqualTo(3);
        }
    }

    private boolean evaluateMatchingCriteria(UserBetInfo user, String criteria) {
        // 간단한 매칭 기준을 평가하는 메서드
        // 예: "betAmount >= 1000 && level == 3"
        // 실제 프로덕션 코드에서는 고급 매칭 알고리즘 사용 가능
        try {
            ExpressionParser parser = new SpelExpressionParser();
            StandardEvaluationContext context = new StandardEvaluationContext(user);
            return parser.parseExpression(criteria).getValue(context, Boolean.class);
        } catch (Exception e) {
            // 평가 중 오류가 발생하면 false 반환
            return false;
        }
    }

    static class UserBetInfo {
        private String key; // Redis에서 사용자 데이터를 식별하기 위한 고유 키
        private String nickname;
        private int betAmount;
        private int level;

        public UserBetInfo() {
        }

        public UserBetInfo(String key, String nickname, int betAmount, int level) {
            this.key = key;
            this.nickname = nickname;
            this.betAmount = betAmount;
            this.level = level;
        }

        // Getter/Setter methods

        public String getKey() {
            return key;
        }

        public void setKey(String key) {
            this.key = key;
        }

        public String getNickname() {
            return nickname;
        }

        public void setNickname(String nickname) {
            this.nickname = nickname;
        }

        public int getBetAmount() {
            return betAmount;
        }

        public void setBetAmount(int betAmount) {
            this.betAmount = betAmount;
        }

        public int getLevel() {
            return level;
        }

        public void setLevel(int level) {
            this.level = level;
        }
    }
}
