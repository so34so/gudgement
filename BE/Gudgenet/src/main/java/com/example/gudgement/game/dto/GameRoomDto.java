package com.example.gudgement.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class GameRoomDto {

    private Long roomId;
    private String roomNumber;
    private List<GameUserDto> users;

    @Builder
    public GameRoomDto(Long roomId, String roomNumber, List<GameUserDto> users) {
        this.roomId = roomId;
        this.roomNumber = roomNumber;
        this.users = users;
    }
}
