package com.example.gudgement.game.dto;

import com.example.gudgement.shop.dto.EquippedDto;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class GameRoundDto {
    private List<UserTiggleDto> userTiggles;
    private CardInfoDto card;
    private int rounds;
    private List<EquippedDto> equippedItems;

    @Builder
    public GameRoundDto(List<UserTiggleDto> userTiggles, CardInfoDto card,
                        int rounds,List<EquippedDto> equippedItems){
        this.userTiggles = userTiggles;
        this.card=card;
        this.rounds=rounds;
        this.equippedItems = (equippedItems != null) ? equippedItems : new ArrayList<>();
    }
}

