package com.example.gudgement.game.controller;

import com.example.gudgement.game.dto.*;
import com.example.gudgement.game.service.GameRoundService;
import com.example.gudgement.game.service.GameService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;
    private final GameRoundService gameRoundService;


    @MessageMapping("/game/accept")
    public void acceptGame(@RequestBody GameRequestDto gameRequestDto) {
        String roomNumber = gameRequestDto.getRoomNumber();
        String username = gameRequestDto.getNickName();

        // Update the game acceptance status for the user.
        gameService.acceptGame(roomNumber, username);
    }

    @MessageMapping("/game/reject")
    public void rejectGame(@RequestBody GameRequestDto gameRequestDto) {
        gameService.rejectGame(gameRequestDto.getRoomNumber(), gameRequestDto.getNickName());
    }

    @Operation(summary = "게임 수락(같은이름의 stomp도 있음)")
    @PostMapping("/accept")
    public ResponseEntity<Void> acceptGamePost(@RequestBody GameRequestDto gameRequestDto) {
        gameService.acceptGame(gameRequestDto.getRoomNumber(), gameRequestDto.getNickName());
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "게임 거절(같은이름의 stomp도 있음)")
    @PostMapping("/reject")
    public ResponseEntity<Void> rejectGamePost(@RequestBody GameRequestDto gameRequestDto) {
        gameService.rejectGame(gameRequestDto.getRoomNumber(), gameRequestDto.getNickName());
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "라운드시작")
    @PostMapping("/gameroundinfo")
    public ResponseEntity<GameRoundDto> getGameRoundInfo(@RequestBody GameRequestDto requestDto) {
        GameRoundDto gameRoundInfo = gameRoundService.getGameStatus(requestDto);
        return ResponseEntity.ok(gameRoundInfo);
    }

    @Operation(summary = "카드 게임 배팅")
    @PostMapping("/playRound")
    public void playRound(@RequestBody BettingDto bettingDto){
        gameRoundService.playRound(bettingDto);
    }

    @Operation(summary = "최종 게임 결과 저장")
    @PostMapping("/end")
    public ResponseEntity<Void> endGame(@RequestBody GameResultDto gameResultDto) {
        gameService.endGame(gameResultDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
