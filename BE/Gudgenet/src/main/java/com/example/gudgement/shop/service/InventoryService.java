package com.example.gudgement.shop.service;

import com.example.gudgement.member.db.entity.Member;
import com.example.gudgement.shop.dto.InventoryDto;
import com.example.gudgement.shop.dto.ItemListDto;

import java.util.List;

public interface InventoryService {

    List<InventoryDto> findMemberitems(Member member);

    void equipItem(ItemListDto equippedItemListDto, Long memberId);

}
