package com.example.gudgement.game.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class RoundResultDto {
    private String nickName;
    private boolean isResult;
    private int rounds;
    private String roomNumber;

    @Builder
    public RoundResultDto(String nickName, boolean isResult,int rounds, String roomNumber){
        this.nickName = nickName;
        this.isResult = isResult;
        this.rounds = rounds;
        this.roomNumber =roomNumber;
    }
}
