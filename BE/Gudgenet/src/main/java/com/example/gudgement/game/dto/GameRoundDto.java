package com.example.gudgement.game.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class GameRoundDto {
    private List<UserTiggleDto> userTiggles;
    private CardInfoDto card;
    private int rounds;

    @Builder
    public GameRoundDto(List<UserTiggleDto> userTiggles, CardInfoDto card, int rounds){
        this.userTiggles = userTiggles;
        this.card = card;
        this.rounds = rounds;
    }
}
