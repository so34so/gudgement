package com.example.gudgement.shop.dto;

import com.example.gudgement.shop.entity.Item;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Base64;

@Getter
@Setter
@NoArgsConstructor
public class ItemDto implements Serializable {
    private Long id;
    private String itemName;
    private String itemContent;
    private String itemEffect;
    private String image;
    private Long price;
    private boolean isUnlocked;
    private boolean isSold;

    @Builder
    public ItemDto(Long id, String itemName, String itemContent, String itemEffect, byte[] image, Long price, boolean isUnlocked, boolean isSold) {
        this.id = id;
        this.itemName = itemName;
        this.itemContent = itemContent;
        this.itemEffect = itemEffect;
        this.image = Base64.getEncoder().encodeToString(image);
        this.price = price;
        this.isUnlocked = isUnlocked;
        this.isSold = isSold;
    }

}
