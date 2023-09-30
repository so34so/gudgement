package com.example.gudgement.game.service;

import com.example.gudgement.game.dto.BettingDto;
import com.example.gudgement.game.dto.GameRequestDto;
import com.example.gudgement.game.dto.GameResultDto;
import com.example.gudgement.game.dto.GameRoundDto;

public interface GameRoundService {

    GameRoundDto getGameStatus(GameRequestDto gameRequestDto);

//    GameResultDto playRound(BettingDto bettingDto);
}
