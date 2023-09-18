package com.example.gudgement.shop.service;

import com.example.gudgement.member.db.entity.Member;
import com.example.gudgement.shop.dto.ItemDto;
import com.example.gudgement.shop.entity.Item;

import java.util.List;

public interface ShopService {

    List<ItemDto> getAll(Long memberId);
    List<ItemDto> getTypeItems(String type, Long memberId);

    void buyItem(Long itemId, Long memberId);

    void unlockItem(Long itemId, Long memberId);

    void buyConsumableItem(Long itemId, Long memberId, int quantity);

    //List<ItemDto> getEquippedItems(Long memberId);
}
