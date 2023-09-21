package com.example.gudgement;

import com.example.gudgement.match.common.config.RedisConfig;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.autoconfigure.data.redis.DataRedisTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.*;

@DataRedisTest
@Import(TestConfig.class)
@SpringJUnitConfig(classes = {UserMatchingTest.class, RedisConfig.class})
@SpringBootApplication
public class createGameRoomTest {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @BeforeEach
    public void setUp() throws JsonProcessingException {
        // 사용자 데이터를 Redis에 저장
        UserBetInfo user1 = new UserBetInfo("user:1", "JohnDoe", 1000, 3);
        UserBetInfo user2 = new UserBetInfo("user:2", "Alice", 1000, 2);
        UserBetInfo user3 = new UserBetInfo("user:3", "Bob", 1000, 3);

        redisTemplate.opsForValue().set(user1.getKey(), objectMapper.writeValueAsString(user1));
        redisTemplate.opsForValue().set(user2.getKey(), objectMapper.writeValueAsString(user2));
        redisTemplate.opsForValue().set(user3.getKey(), objectMapper.writeValueAsString(user3));
    }

    @Test
    public void testMatchingLogic() throws JsonProcessingException {
        // 매칭 로직 테스트
        // 예를 들어, 배팅 금액이 1000 이상이고 레벨이 3인 사용자와 매칭하는 경우를 시뮬레이션
        String matchingCriteria = "betAmount == 1000 && level == 3";

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

    @Controller
    public class GameController {
        @MessageMapping("/match")
        @SendTo("/topic/matchResult")
        public MatchResult matchPlayers(MatchRequest request) throws JsonProcessingException {
            // Redis에서 사용자 데이터 조회 및 매칭 로직
            UserBetInfo player1 = getUserFromRedis(request.getPlayer1Id());
            UserBetInfo player2 = findMatchingPlayer(player1);

            if (player1 != null && player2 != null) {
                // 게임 룸 생성
                GameRoom gameRoom = createGameRoom(player1, player2);
                // 매칭된 사용자 정보를 Redis에서 삭제
                removeFromRedis(player1.getKey());
                removeFromRedis(player2.getKey());
                // WebSocket을 통해 매칭 결과 전송
                messagingTemplate.convertAndSendToUser(player1.getNickname(), "/topic/matchResult", gameRoom);
                messagingTemplate.convertAndSendToUser(player2.getNickname(), "/topic/matchResult", gameRoom);
                return new MatchResult(player1, player2, gameRoom.getRoomName());
            } else {
                return new MatchResult(null, null, null); // 매칭 실패
            }
        }

        private UserBetInfo getUserFromRedis(String userId) {
            String userJson = redisTemplate.opsForValue().get(userId);
            if (userJson != null) {
                try {
                    return objectMapper.readValue(userJson, UserBetInfo.class);
                } catch (JsonProcessingException e) {
                    // JSON 파싱 오류 처리
                    e.printStackTrace();
                }
            }
            return null;
        }

        private void removeFromRedis(String key) {
            redisTemplate.delete(key);
        }

        // 나머지 게임 룸 생성 및 매칭 로직을 구현하는 메서드들 추가
    }
    private UserBetInfo findMatchingPlayer(UserBetInfo player1) throws JsonProcessingException {
        // Redis에서 매칭 조건에 맞는 사용자 검색
        String matchingCriteria = "betAmount == " + player1.getBetAmount() + " && level == " + player1.getLevel();
        List<UserBetInfo> matchedPlayers = new ArrayList<>();

        Set<String> allUserKeys = redisTemplate.keys("user:*");
        for (String userKey : allUserKeys) {
            String userJson = redisTemplate.opsForValue().get(userKey);
            UserBetInfo user = objectMapper.readValue(userJson, UserBetInfo.class);
            if (evaluateMatchingCriteria(user, matchingCriteria) && !user.getKey().equals(player1.getKey())) {
                matchedPlayers.add(user);
            }
        }

        // 매칭된 플레이어 중 무작위로 하나 선택
        if (!matchedPlayers.isEmpty()) {
            int randomIndex = new Random().nextInt(matchedPlayers.size());
            return matchedPlayers.get(randomIndex);
        }

        return null; // 매칭된 플레이어가 없을 경우 null 반환
    }

    private GameRoom createGameRoom(UserBetInfo player1, UserBetInfo player2) {
        // 게임 룸 이름 생성 (예: "room123")
        String roomName = "room" + UUID.randomUUID().toString();

        // 게임 룸 생성 및 플레이어 할당
        GameRoom gameRoom = new GameRoom(roomName, player1, player2);

        // 게임 룸 정보를 Redis에 저장
        try {
            String gameRoomJson = objectMapper.writeValueAsString(gameRoom);
            redisTemplate.opsForValue().set(gameRoom.getRoomName(), gameRoomJson);
        } catch (JsonProcessingException e) {
            // JSON 변환 중 오류 발생 시 예외 처리
            e.printStackTrace();
            return null; // 실패한 경우 null 반환
        }

        return gameRoom;
    }


    // UserBetInfo 클래스와 MatchResult, MatchRequest 클래스 정의

    static class UserBetInfo {
        private String key; // Redis에 저장된 데이터의 키
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

        // Getter/Setter 메서드 추가

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

    // MatchResult 클래스: 매칭 결과를 담는 클래스
    public class MatchResult {
        private UserBetInfo player1;
        private UserBetInfo player2;
        private String roomName;

        public MatchResult(UserBetInfo player1, UserBetInfo player2, String roomName) {
            this.player1 = player1;
            this.player2 = player2;
            this.roomName = roomName;
        }

        public UserBetInfo getPlayer1() {
            return player1;
        }

        public void setPlayer1(UserBetInfo player1) {
            this.player1 = player1;
        }

        public UserBetInfo getPlayer2() {
            return player2;
        }

        public void setPlayer2(UserBetInfo player2) {
            this.player2 = player2;
        }

        public String getRoomName() {
            return roomName;
        }

        public void setRoomName(String roomName) {
            this.roomName = roomName;
        }
    }

    // MatchRequest 클래스: 매칭 요청을 담는 클래스
    public class MatchRequest {
        private String player1Id;

        public String getPlayer1Id() {
            return player1Id;
        }

        public void setPlayer1Id(String player1Id) {
            this.player1Id = player1Id;
        }
    }

    // GameRoom 클래스: 게임 룸 정보를 담는 클래스
    public class GameRoom {
        private String roomName;
        private UserBetInfo player1;
        private UserBetInfo player2;

        public GameRoom(String roomName, UserBetInfo player1, UserBetInfo player2) {
            this.roomName = roomName;
            this.player1 = player1;
            this.player2 = player2;
        }

        public String getRoomName() {
            return roomName;
        }

        public void setRoomName(String roomName) {
            this.roomName = roomName;
        }

        public UserBetInfo getPlayer1() {
            return player1;
        }

        public void setPlayer1(UserBetInfo player1) {
            this.player1 = player1;
        }

        public UserBetInfo getPlayer2() {
            return player2;
        }

        public void setPlayer2(UserBetInfo player2) {
            this.player2 = player2;
        }
    }

}
