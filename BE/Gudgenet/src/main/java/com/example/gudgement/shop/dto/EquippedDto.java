package com.example.gudgement.shop.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class EquippedDto implements Serializable {
    private Long invenId;
    private Long itemId;
    private String itemName;
    private String itemContent;
    private String itemEffect;
    private String image;
    private boolean isEquipped;
    private Long typeId;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer quantity;

    @Builder
    public EquippedDto(Long invenId, Long itemId, String itemName, String itemContent, String itemEffect, String image, boolean isEquipped,Long typeId,Integer quantity) {
        this.invenId = invenId;
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemContent = itemContent;
        this.itemEffect = itemEffect;
        this.image = image;
        this.isEquipped = isEquipped;
        this.typeId = typeId;
        this.quantity = quantity;
    }

}
