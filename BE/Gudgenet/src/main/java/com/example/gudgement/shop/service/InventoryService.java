package com.example.gudgement.shop.service;

import com.example.gudgement.member.db.entity.Member;
import com.example.gudgement.shop.dto.EquippedDto;
import com.example.gudgement.shop.dto.InventoryDto;
import com.example.gudgement.shop.dto.ItemListDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface InventoryService {

    List<EquippedDto> findMemberitems(Member member);


    InventoryDto equipItem(Long invenId);

    List<EquippedDto> findMemberTypeitems(String type, Member member);
}
