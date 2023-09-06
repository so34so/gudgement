package com.example.gudgement.shop.dto;

import com.example.gudgement.shop.entity.Shop;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ShopDto {
    private Long id;
    private String itemName;
    private String itemContent;
    private String itemEffect;
    private int amount;
    private String category;
    private int progress;
    private String progressAchieve;

    @Builder
    public ShopDto(Long id, String itemName, String itemContent, String itemEffect, int amount, String category, int progress, String progressAchieve){
        this.id = id;
        this.itemName = itemName;
        this.itemContent = itemContent;
        this.itemEffect = itemEffect;
        this.amount = amount;
        this.category = category;
        this.progress = progress;
        this.progressAchieve = progressAchieve;
    }

    public static ShopDto toDto(Shop shop){
        return ShopDto.builder()
                .id(shop.getId())
                .itemName(shop.getItemName())
                .itemContent(shop.getItemContent())
                .itemEffect(shop.getItemEffect())
                .amount(shop.getAmount())
                .category(shop.getCategory())
                .progress(shop.getProgress())
                .progressAchieve(shop.getProgressAchieve())
                .build();
    }
}
