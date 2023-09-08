package com.example.gudgement.shop.controller;

import com.example.gudgement.shop.dto.InventoryDto;
import com.example.gudgement.shop.service.InventoryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/inventory")
public class InventoryController {
/*    private final InventoryService inventoryService;

    @GetMapping("/inventory/{memberId}")
    public List<InventoryDto> getMemberInventory(@PathVariable Long memberId){
        Member member = new Member();
        return inventoryService.findInventoryItemsByMember(member);
    }*/
}
