package com.example.gudgement.game.service;

import com.example.gudgement.match.dto.MatchDto;

public interface GameService {

    String createGameRoom();

    void acceptGame(String roomNumber, String username);

    void rejectGame(String roomNumber, String username);

    void addUserToRoom(String roomNumber, String username);

}
