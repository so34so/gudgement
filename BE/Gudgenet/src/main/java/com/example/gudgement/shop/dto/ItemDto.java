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
    private int price;
    private boolean isUnlocked;
    private boolean isSold;

    @Builder
    public itemDto(Long id, String itemName, String itemContent, String itemEffect, byte[] image, int price, boolean isUnlocked, boolean isSold){
        this.id = id;
        this.itemName = itemName;
        this.itemContent = itemContent;
        this.itemEffect = itemEffect;
        this.image = Base64.getEncoder().encodeToString(image);
        this.price = price;
        this.isUnlocked = isUnlocked;
        this.isSold = isSold;
    }

/*    public static ItemDto toDto(Item item) {

        return ItemDto.builder()
                .id(item.getId())
                .itemName(item.getItemName())
                .itemContent(item.getItemContent())
                .itemEffect(item.getItemEffect())
                .image(item.getImage())
                .price(item.getPrice())
                .build();
    }*/

}
