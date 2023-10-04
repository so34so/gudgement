package com.example.gudgement.game.controller;

import com.example.gudgement.game.dto.*;
import com.example.gudgement.game.service.GameRoundService;
import com.example.gudgement.game.service.GameService;
import com.example.gudgement.game.dto.MessageDto;
import com.example.gudgement.game.dto.SendMessageDto;
import com.example.gudgement.shop.service.InventoryService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/game")
public class GameController {

    private final GameService gameService;
    private final GameRoundService gameRoundService;
    private final InventoryService inventoryService;

    private final SimpMessagingTemplate messagingTemplate;
    private final RedisTemplate<String, String> redisTemplate;

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

    @Operation(summary = "카드 게임 포기")
    @PostMapping("/giveUpRound")
    public void giveUpRound(@RequestBody BettingDto bettingDto){
        gameRoundService.giveUpRound(bettingDto);
    }

    @Operation(summary = "최종 게임 결과 저장")
    @PostMapping("/end")
    public ResponseEntity<Void> endGame(@RequestBody GameResultDto gameResultDto) {
        gameService.endGame(gameResultDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "게임 채팅")
    @MessageMapping("/chat")
    public void chatAll(@RequestBody MessageDto messageDto){
        log.info(messageDto.getNickName()+"");

        SendMessageDto message = SendMessageDto.builder()
                .nickname(messageDto.getNickName())
                .message(messageDto.getMessage()).build();

        messagingTemplate.convertAndSend("/topic/game/" + messageDto.getRoomNumber() , message);
    }

    @Operation(summary = "게임 채팅(/app/chat 이라는 게임 채팅이 있음)")
    @PostMapping("/chat")
    public void chatAllTest(@RequestBody MessageDto messageDto){
        log.info(messageDto.getNickName()+"");

        SendMessageDto message = SendMessageDto.builder()
                .nickname(messageDto.getNickName())
                .message(messageDto.getMessage()).build();

        messagingTemplate.convertAndSend("/topic/game/" + messageDto.getRoomNumber() , message);
    }

    @Operation(summary = "소비아이템 사용")
    @PostMapping("/useItem")
    public void useItem(ItemUserDto request) {
        // Use the item in the database.
        inventoryService.useItem(request.getInvenId());

        redisTemplate.opsForHash().put(request.getRoomNumber(), request.getNickname() + ":item", "use");

//        messagingTemplate.convertAndSend("/topic/game/" + ItemUserDto.getRoomNumber() , "사용 완료");
    }
}