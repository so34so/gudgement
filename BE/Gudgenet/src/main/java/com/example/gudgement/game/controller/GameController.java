package com.example.gudgement.game.controller;

import com.example.gudgement.game.dto.GameRequestDto;
import com.example.gudgement.game.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @PostMapping("/accept")
    public ResponseEntity<Void> acceptGame(@RequestBody GameRequestDto gameRequestDto) {
        String roomNumber = gameRequestDto.getRoomNumber();
        String username = gameRequestDto.getUserName();

        gameService.addUserToRoom(roomNumber, username);

        // Update the game acceptance status for the user.
        gameService.acceptGame(roomNumber, username);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reject")
    public ResponseEntity<Void> rejectGame(@RequestBody GameRequestDto gameRequestDto) {
        gameService.rejectGame(gameRequestDto.getRoomNumber(), gameRequestDto.getUserName());
        return ResponseEntity.ok().build();
    }

    @MessageMapping("/stomp/{roomNumber}")
    public void handleGameStart(@DestinationVariable String roomNumber) {
        // 여기서 roomNumber는 URL 경로 변수입니다.
        // 이 메서드는 /stomp/123 등의 경로로 오는 STOMP 메시지를 처리합니다.
    }
}
