package com.example.gudgement.shop.service;

import com.example.gudgement.member.entity.Member;
import com.example.gudgement.shop.dto.EquippedDto;
import com.example.gudgement.shop.dto.InventoryDto;

import java.util.List;

public interface InventoryService {

    List<EquippedDto> findMemberitems(Member member);


    InventoryDto equipItem(Long invenId);

    List<EquippedDto> findMemberTypeitems(String type, Member member);
    
    void useItem(Long invenId);
}
