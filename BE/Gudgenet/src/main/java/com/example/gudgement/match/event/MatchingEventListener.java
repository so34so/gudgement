package com.example.gudgement.match.event;

import com.example.gudgement.game.service.GameService;
import com.example.gudgement.match.dto.MatchDto;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MatchingEventListener {

    private final SimpMessagingTemplate messagingTemplate;
    private final RedisTemplate<String, String> redisTemplate;
    private final GameService gameService;

    @EventListener
    public void handleMatchRequest(MatchRequestEvent event) {
        // Extract the matching request data from the event.
        MatchDto request = event.getMatchDto();

        // Perform your matching logic here...
        // For example:

        String tierKey = "Room:" + request.getTiggle() + ":" + request.getRoleUser();
        SetOperations<String, String> setOps = redisTemplate.opsForSet();

        if (setOps.size(tierKey) >= 2) {
            Set<String> members = setOps.members(tierKey);
            members.remove(request.getNickName());
            String otherUser = selectRandomUser(members);

            String roomNumber = gameService.createGameRoom(); // 새로운 게임 방 생성

            List<String> matchedUsers = Arrays.asList(request.getNickName(), otherUser);

            // Redis에 게임 방 정보와 유저들의 정보 저장
            redisTemplate.opsForSet().add(roomNumber, matchedUsers.toArray(new String[0]));

            messagingTemplate.convertAndSendToUser(request.getNickName(), "/queue/start", roomNumber);
            messagingTemplate.convertAndSendToUser(otherUser, "/queue/start", roomNumber);

            setOps.remove(tierKey, request.getNickName(), otherUser);
        }
    }

    private String selectRandomUser(Set<String> users) {
        int size = users.size();
        int item = new Random().nextInt(size);
        int i = 0;

        for(String user : users) {
            if (i == item)
                return user;
            i++;
        }

        return null; // This should never happen.
    }

}
