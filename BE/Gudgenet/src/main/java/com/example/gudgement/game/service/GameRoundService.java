package com.example.gudgement.game.service;

import com.example.gudgement.game.dto.GameRequestDto;
import com.example.gudgement.game.dto.GameRoundDto;

public interface GameRoundService {

    GameRoundDto getGameStatus(GameRequestDto gameRequestDto);
}
