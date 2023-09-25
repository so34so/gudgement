package com.example.gudgement.stomp.repository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Slf4j
@AllArgsConstructor
@Repository
public class StompRepository {

    private final RedisTemplate<String, Long> redisTemplate;
    private final String UserSeq_KEY = "SessionId_UserSeq"; // sessionId로 userSeq 확인 키
    private final String SessionId_KEY = "UserSeq_SessionId"; // userSeq로 sessionId 확인 키
    private final String RoomCode_KEY = "UserSeq_RoomCode"; // userSeq로 roomCode 확인 키

    public void setUserSeqForSessionId(String sessionId, Long userSeq) {
        redisTemplate.opsForHash().put(UserSeq_KEY, sessionId, userSeq);
        log.info("UserSeq : " + getUserSeqBySessionId(sessionId));
        redisTemplate.opsForHash().put(SessionId_KEY, userSeq, sessionId);
        log.info("SessionId : " +getSessionIdByUserSeq(userSeq));

    }

    /**
     *  중복 접속 확인
     */
    public boolean checkForDuplicateUser(Long userSeq) {
        return redisTemplate.opsForHash().hasKey(SessionId_KEY, userSeq);
    }

    /**
     * 사용자가 unsubscribe 후, disconnect : false,
     * 사용자가 바로 disconnect : true
     */
    public boolean checkExistRoom(Long userSeq) {
        if (userSeq == null) {
            return false;
        }
        return redisTemplate.opsForHash().hasKey(RoomCode_KEY, userSeq);
    }

    public void setRoomCodeForUserSeq(Long userSeq, String roomCode) {
        log.info("setRoomCodeForUserSeq 시작");
        redisTemplate.opsForHash().put(RoomCode_KEY, userSeq, roomCode);
        log.info("roomCode : " +getRoomCodeByUserSeq(userSeq));
    }

    public void removeRoomCodeForUserSeq(Long userSeq) {
        redisTemplate.opsForHash().delete(RoomCode_KEY, userSeq);
        log.info("roomCode 삭제 여부 : " + checkExistRoom(userSeq));
    }

    public void removeUserSeqForSessionId(String sessionId) {
        if (sessionId == null) {
            log.info("sessionId가 존재하지 않습니다.");
            return;
        }
        redisTemplate.opsForHash().delete(UserSeq_KEY, sessionId);
    }

    public void removeSessionIdForUserSeq(Long userSeq) {
        if (userSeq == null) {
            log.info("userSeq가 존재하지 않습니다.");
            return;
        }
        redisTemplate.opsForHash().delete(SessionId_KEY, userSeq);
    }

    public String getSessionIdByUserSeq(Long userSeq) {
        log.info(userSeq+"");
        log.info(redisTemplate.opsForHash().get(SessionId_KEY, userSeq).toString());
        return redisTemplate.opsForHash().get(SessionId_KEY, userSeq).toString();
    }

    public Long getUserSeqBySessionId(String sessionId) {
        Object tmp = redisTemplate.opsForHash().get(UserSeq_KEY, sessionId);
        return tmp == null ? null : Long.parseLong(tmp.toString());
    }

    public String getRoomCodeByUserSeq(Long userSeq) {
        if(userSeq == null) {
            return null;
        }
        return redisTemplate.opsForHash().get(RoomCode_KEY, userSeq).toString();
    }


}
