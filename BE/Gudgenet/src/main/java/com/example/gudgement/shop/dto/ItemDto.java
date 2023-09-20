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
    private String subType;
    private Long price;
    private Long typeId;
    private boolean isUnlocked;
    private boolean isSold;
    private boolean isEquipped;
    private boolean isHidden;

    @Builder
    public ItemDto(Long id, String itemName, String itemContent, String itemEffect, String image, String subType, Long price, Long typeId, boolean isUnlocked, boolean isSold, boolean isEquipped, boolean isHidden) {
        this.id = id;
        this.itemName = itemName;
        this.itemContent = itemContent;
        this.itemEffect = itemEffect;
        this.image = image;
        this.subType = subType;
        this.price = price;
        this.typeId = typeId;
        this.isUnlocked = isUnlocked;
        this.isSold = isSold;
        this.isEquipped = isEquipped;
        this.isHidden = isHidden;
    }

}
