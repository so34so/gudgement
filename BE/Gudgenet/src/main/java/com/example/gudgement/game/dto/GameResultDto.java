package com.example.gudgement.game.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class GameResultDto {

    private String roomNumber;
    private String nickName;
    private boolean isResult;

    @Builder
    public GameResultDto(String roomNumber, String nickName, boolean isResult){
        this.roomNumber = roomNumber;
        this.nickName = nickName;
        this.isResult = isResult;
    }

}
