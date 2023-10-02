package com.example.gudgement.game.service;

import com.example.gudgement.game.dto.*;

import java.util.Map;

public interface GameRoundService {

    GameRoundDto getGameStatus(GameRequestDto gameRequestDto);

    void playRound(BettingDto bettingDto);
}
