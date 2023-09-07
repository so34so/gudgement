package com.example.gudgement.shop.dto;

import com.example.gudgement.shop.entity.Shop;
import com.example.gudgement.shop.entity.Inventory;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class InventoryDto {
    private long id;
    private Shop itemId;

    @Builder
    public InventoryDto(Long id, Shop itemId){
        this.id = id;
        this.itemId = itemId;
    }

    public static InventoryDto toInven(Inventory inventory){
        return InventoryDto.builder()
                .id(inventory.getId())
                .itemId(inventory.getItemId())
                .build();
    }
}
