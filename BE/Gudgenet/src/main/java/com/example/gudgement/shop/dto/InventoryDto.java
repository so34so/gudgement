package com.example.gudgement.shop.dto;

import com.example.gudgement.shop.entity.Inventory;
import com.example.gudgement.shop.entity.Item;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class InventoryDto {
    private Long invenId;
    private Item itemId;
    private Member memberId;
    private boolean equipped;

    @Builder
    public InventoryDto(Long invenId, Item itemId, Member memberId, boolean equipped) {
        this.invenId = invenId;
        this.itemId = itemId;
        this.memberId = memberId;
        this.equipped = equipped;
    }

    public static InventoryDto invenDto(Inventory inventory){
        return InventoryDto.builder()
                .invenId(inventory.getId())
                .itemId(inventory.getItemId())
                .memberId(inventory.getMemberId())
                .equipped(inventory.isEquipped())
                .build();
    }
}
