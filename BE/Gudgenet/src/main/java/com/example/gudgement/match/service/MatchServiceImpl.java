package com.example.gudgement.match.service;

import com.example.gudgement.match.common.config.JacksonConfig;
import com.example.gudgement.match.dto.MatchDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectInputStream;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class MatchServiceImpl implements MatchService {

    private final RedisTemplate<String, String> redisTemplate;

   /* @Override
    public void addUserToRoomAndTier(MatchDto matchDto) {
        String tiggleKey = String.valueOf(matchDto.getTiggle()); // 티어 키를 가져옵니다.
        String userId = String.valueOf(matchDto.getRoleUser()); // 사용자 아이디를 가져옵니다.
        double score = System.currentTimeMillis(); // 사용자의 점수를 설정하십시오. 여기에 사용자의 레벨 또는 다른 값이 들어가야 합니다.

        ZSetOperations<String, String> zSetOps = redisTemplate.opsForZSet();
        zSetOps.add(tiggleKey, userId, score); // 사용자를 티어 집합에 추가합니다.
    }

    @Override
    public Set<String> getUsersInRoomAndTier(MatchDto matchDto) {
        String tierKey = String.valueOf(matchDto.getTiggle());
        ZSetOperations<String, String> zSetOps = redisTemplate.opsForZSet();
        return zSetOps.range(tierKey, 0, -1);
    }

    @Override
    public long getUsersCountInRoomAndTier(String room, String tier) {
        String tierKey = room + ":" + tier;
        ZSetOperations<String, String> zSetOps = redisTemplate.opsForZSet();
        return zSetOps.zCard(tierKey);
    }
    @Override
    public void removeUserFromRoomAndTier(MatchDto matchDto) {
        String tierKey = String.valueOf(matchDto.getTiggle());
        String userId = String.valueOf(matchDto.getRoleUser());
        ZSetOperations<String, String> zSetOps = redisTemplate.opsForZSet();
        zSetOps.remove(tierKey, userId);
    }*/

    public void addUserToGroup(String room, String group, String user) {
        String key = "Room:" + room + ":" + group;
        redisTemplate.opsForSet().add(key, user);
    }

    public void removeUserFromGroup(String room, String group, String user) {
        String key = "Room:" + room + ":" + group;
        redisTemplate.opsForSet().remove(key, user);
    }
}