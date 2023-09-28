package com.example.gudgement.game.dto;

import com.example.gudgement.shop.dto.EquippedDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class EquippedItemsDto {
    private List<EquippedDto> items;

    @Builder
    public EquippedItemsDto(List<EquippedDto> items) {
        this.items = items;
    }
}
