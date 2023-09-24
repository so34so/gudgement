package com.example.gudgement.game.controller;

import com.example.gudgement.game.dto.GameStartResponseDto;
import com.example.gudgement.game.service.GameService;
import com.example.gudgement.match.dto.MatchDto;
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

/*    @PostMapping("/startGame")
    public ResponseEntity<GameStartResponseDto> startGame() {
        String roomNumber = gameService.createGameRoom();
        return ResponseEntity.ok().body(new GameStartResponseDto(roomNumber));
    }*/

    @PostMapping("/game/{roomNumber}/accept")
    public ResponseEntity<Void> acceptGame(@PathVariable String roomNumber, @RequestBody String username) {
        gameService.addUserToRoom(roomNumber, username);

        // Update the game acceptance status for the user.
        gameService.acceptGame(roomNumber, username);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/game/{roomNumber}/reject")
    public ResponseEntity<Void> rejectGame(@PathVariable String roomNumber, @RequestBody String username) {
        gameService.rejectGame(roomNumber, username);
        return ResponseEntity.ok().build();
    }

    @MessageMapping("/stomp/{roomNumber}")
    public void handleGameStart(@DestinationVariable String roomNumber) {
        // 여기서 roomNumber는 URL 경로 변수입니다.
        // 이 메서드는 /stomp/123 등의 경로로 오는 STOMP 메시지를 처리합니다.
    }
}
