package com.example.gudgement.game.dto;

import com.example.gudgement.shop.dto.ItemDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class EquippedItemsDto {
    private List<ItemDto> items;

    @Builder
    public EquippedItemsDto(List<ItemDto> items) {
        this.items = items;
    }
}
