package com.example.gudgement.game.dto;

import com.example.gudgement.shop.entity.Item;
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
//    private List<CardHistory> cardHistories;

    @Builder
    public GameUserInfoDto(String nickname, int level, Long tiggle, EquippedItemsDto equippedItems){
        this.nickname = nickname;
        this.level = level;
        this.tiggle = tiggle;
        this.equippedItems = equippedItems;
    }

}