package com.example.gudgement.game.service;

import com.example.gudgement.game.dto.GameResultDto;

public interface GameService {

    String createGameRoom();

    void acceptGame(String roomNumber, String username);

    void rejectGame(String roomNumber, String username);

    void endGame(GameResultDto gameResultDto);

}
