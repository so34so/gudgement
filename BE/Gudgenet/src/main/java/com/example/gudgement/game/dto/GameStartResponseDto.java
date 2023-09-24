package com.example.gudgement.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GameStartResponseDto {

    private String roomNumber;

    @Builder
    public GameStartResponseDto(String roomNumber) {
        this.roomNumber = roomNumber;
    }
}
