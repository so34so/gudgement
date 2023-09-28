package com.example.gudgement.game.controller;

import com.example.gudgement.game.dto.GameRequestDto;
import com.example.gudgement.game.dto.GameResultDto;
import com.example.gudgement.game.service.GameRoundService;
import com.example.gudgement.game.service.GameService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;
    private final GameRoundService gameRoundService;

    @Operation(summary = "게임 수락")
    @MessageMapping("/game/accept")
    public void acceptGame(@RequestBody GameRequestDto gameRequestDto) {
        String roomNumber = gameRequestDto.getRoomNumber();
        String username = gameRequestDto.getUserName();

        // Update the game acceptance status for the user.
        gameService.acceptGame(roomNumber, username);
    }

    @MessageMapping("/game/reject")
    public void rejectGame(@RequestBody GameRequestDto gameRequestDto) {
        gameService.rejectGame(gameRequestDto.getRoomNumber(), gameRequestDto.getUserName());
    }

    @Operation(summary = "게임 수락")
    @PostMapping("/accept")
    public ResponseEntity<Void> acceptGamePost(@RequestBody GameRequestDto gameRequestDto) {
        gameService.acceptGame(gameRequestDto.getRoomNumber(), gameRequestDto.getUserName());
        return ResponseEntity.ok().build();
    }
    @Operation(summary = "게임 거절")
    @PostMapping("/reject")
    public ResponseEntity<Void> rejectGamePost(@RequestBody GameRequestDto gameRequestDto) {
        gameService.rejectGame(gameRequestDto.getRoomNumber(), gameRequestDto.getUserName());
        return ResponseEntity.ok().build();
    }

    @MessageMapping("/stomp/{roomNumber}")
    public void handleGameStart(@DestinationVariable String roomNumber) {
        // 여기서 roomNumber는 URL 경로 변수입니다.
        // 이 메서드는 /stomp/123 등의 경로로 오는 STOMP 메시지를 처리합니다.
    }

    @Operation(summary = "라운드시작(미구현)")
    @PostMapping("/startRound")
    public ResponseEntity<Void> startRound(@RequestBody GameRequestDto gameRequestDto) {
        String roomNumber = gameRequestDto.getRoomNumber();
        String username = gameRequestDto.getUserName();

        // Update the game acceptance status for the user.
        gameRoundService.startRound(roomNumber, username);

        return ResponseEntity.ok().build();
    }

    @Operation(summary = "게임 결과 보내기(미구현)")
    @PostMapping("/end")
    public ResponseEntity<Void> endGame(@RequestBody GameResultDto gameResultDto) {
        gameService.endGame(gameResultDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
