package com.example.gudgement.game.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class GameUserInfoDto {
    private String nickname;
    private int level;
    private Long tiggle;
    private EquippedItemsDto equippedItems;
    private List<CardInfoDto> cards;

    @Builder
    public GameUserInfoDto(String nickname, int level, Long tiggle, EquippedItemsDto equippedItems, List<CardInfoDto> cards){
        this.nickname = nickname;
        this.level = level;
        this.tiggle = tiggle;
        this.equippedItems = equippedItems;
        this.cards = cards;  // Assign the given list of cards to the 'cards' field.
    }

}