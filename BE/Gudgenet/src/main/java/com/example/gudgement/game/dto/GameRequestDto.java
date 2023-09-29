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
    private String nickName;

    @Builder
    public GameRequestDto(String roomNumber, String nickName) {
        this.roomNumber = roomNumber;
        this.nickName = nickName;
    }
}
