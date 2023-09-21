package com.example.gudgement.game.service;

import com.example.gudgement.match.dto.MatchDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService{

    private final SimpMessagingTemplate messagingTemplate;

    public String startNewGame(MatchDto matchDto) {
        // Generate a unique room ID. In a real application, you would probably want to use something more robust.
        String roomId = UUID.randomUUID().toString();

        // Send a message to the matched users with the room ID.
        messagingTemplate.convertAndSendToUser(matchDto.getNickName(), "/queue/game-start", roomId);

        return roomId;
    }

}
