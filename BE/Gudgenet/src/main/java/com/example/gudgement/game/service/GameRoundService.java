package com.example.gudgement.game.service;

import com.example.gudgement.game.dto.BettingDto;
import com.example.gudgement.game.dto.GameRequestDto;
import com.example.gudgement.game.dto.GameRoundDto;

public interface GameRoundService {

    GameRoundDto getGameStatustest(GameRequestDto gameRequestDto);
    void getGameStatus(GameRequestDto gameRequestDto);

    void playRound(BettingDto bettingDto);

    void giveUpRound(BettingDto bettingDto);
    
    void startRound(GameRequestDto requestDto);

    void processBets(BettingDto bettingDto);
}
