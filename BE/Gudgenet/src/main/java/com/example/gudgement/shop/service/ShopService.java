package com.example.gudgement.shop.service;

import com.example.gudgement.member.db.entity.Member;
import com.example.gudgement.shop.dto.ItemDto;
import com.example.gudgement.shop.entity.Item;

import java.util.List;

public interface ShopService {

    List<ItemDto> getAll(Long memberId);
    List<ItemDto> getTypeItems(String type, Long memberId);

    void buyItem(String itemName, Long memberId);

    void unlockItem(String itemName, Long memberId);

    List<ItemDto> getEquippedItems(Long memberId);
}
