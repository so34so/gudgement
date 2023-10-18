package com.example.gudgement.game.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CardInfoDto {
    private String name;
    private Long amount;
    private int order;

    @Builder
    public CardInfoDto(String name, Long amount, int order){
        this.name = name;
        this.amount = amount;
        this.order = order;
    }

}
