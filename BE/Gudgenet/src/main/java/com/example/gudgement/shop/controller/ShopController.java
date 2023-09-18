package com.example.gudgement.shop.controller;

import com.example.gudgement.shop.dto.InventoryDto;
import com.example.gudgement.shop.dto.ItemDto;
import com.example.gudgement.shop.service.ShopServiceImpl;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Tag(name = "Shop", description = "상점 기능 컨트롤러입니다.")
@RestController
@RequestMapping("/shop")
@RequiredArgsConstructor
public class ShopController {

    private final ShopServiceImpl shopServiceImpl;

    //전체 아이템 목록 조회
    @GetMapping
    public ResponseEntity<List<ItemDto>> getAll(@RequestParam Long memberId){
        // 상점의 아이템 가져오기
        List<ItemDto> itemList = shopServiceImpl.getAll(memberId);

        return ResponseEntity.ok(itemList);
    }


    //카테고리 별 아이템 목록 조회
    @GetMapping("/type")
    public ResponseEntity<List<ItemDto>> getItems(@RequestParam String type, @RequestParam Long memberId){
        // 상점의 아이템 가져오기
        List<ItemDto> shopItems = shopServiceImpl.getTypeItems(type, memberId);

        return ResponseEntity.ok(shopItems);
    }

    //아이템 구매
    @PostMapping("/buy")
    public ResponseEntity<Void> buyItem(@RequestParam Long itemId, @RequestParam Long memberId){
        shopServiceImpl.buyItem(itemId,memberId);
        return ResponseEntity.ok().build();
    }

    //아이템 해금
    @PostMapping("/unlock")
    public ResponseEntity<Void> unlockItem(@RequestParam Long itemId, @RequestParam Long memberId) {
        shopServiceImpl.unlockItem(itemId, memberId);
        return ResponseEntity.ok().build();
    }




}
