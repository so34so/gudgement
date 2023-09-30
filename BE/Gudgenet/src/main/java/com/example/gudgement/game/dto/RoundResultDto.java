package com.example.gudgement.game.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class RoundResultDto {
    private boolean isResult;
    private int rounds;
    private String roomNumber;

    @Builder
    public RoundResultDto(boolean isResult,int rounds, String roomNumber){
        this.isResult = isResult;
        this.rounds = rounds;
        this.roomNumber =roomNumber;
    }
}
