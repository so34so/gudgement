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
    private CardInfoDto cardInfo;
    @Builder
    public RoundResultDto(String nickName, boolean isResult,int rounds, String roomNumber, CardInfoDto cardInfo){
        this.nickName = nickName;
        this.isResult = isResult;
        this.rounds = rounds;
        this.roomNumber = roomNumber;
        this.cardInfo = cardInfo;
    }
}
