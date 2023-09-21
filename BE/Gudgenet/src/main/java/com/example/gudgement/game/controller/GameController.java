package com.example.gudgement.game.controller;

import com.example.gudgement.game.service.GameService;
import com.example.gudgement.match.dto.MatchDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @PostMapping("/start")
    public ResponseEntity<?> startGame(@RequestBody MatchDto matchDto) {
        String roomId = gameService.startNewGame(matchDto);
        return ResponseEntity.ok(roomId);
    }

}
