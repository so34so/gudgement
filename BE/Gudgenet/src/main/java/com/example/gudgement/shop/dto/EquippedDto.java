package com.example.gudgement.shop.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class EquippedDto implements Serializable {
    private Long id;
    private String itemName;
    private String itemContent;
    private String itemEffect;
    private String image;
    private boolean isEquipped;

    @Builder
    public EquippedDto(Long id, String itemName, String itemContent, String itemEffect, String image, boolean isEquipped) {
        this.id = id;
        this.itemName = itemName;
        this.itemContent = itemContent;
        this.itemEffect = itemEffect;
        this.image = image;
        this.isEquipped = isEquipped;
    }

}
