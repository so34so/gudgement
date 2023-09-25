package com.example.gudgement.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GameRequestDto {

    private String roomNumber;
    private String userName;

    @Builder
    public GameRequestDto(String roomNumber, String userName) {
        this.roomNumber = roomNumber;
        this.userName = userName;
    }
}
