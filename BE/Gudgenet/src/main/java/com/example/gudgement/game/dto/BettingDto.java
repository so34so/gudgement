package com.example.gudgement.game.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class BettingDto {
    private String nickName;
    private String otherName;
    private Long bettingAmount;
    private int rounds;
    private int cardOrder;
    private String roomNumber;

    @Builder
    public BettingDto(String nickName,String otherName, Long bettingAmount, int rounds, int cardOrder, String roomNomber){
        this.nickName = nickName;
        this.otherName = otherName;
        this.bettingAmount = bettingAmount;
        this.rounds = rounds;
        this.cardOrder = cardOrder;
        this.roomNumber = roomNomber;
    }

}
