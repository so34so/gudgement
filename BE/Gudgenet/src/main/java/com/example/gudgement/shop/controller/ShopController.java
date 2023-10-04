package com.example.gudgement.shop.controller;

import com.example.gudgement.shop.dto.ItemDto;
import com.example.gudgement.shop.service.ShopService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Shop", description = "상점 기능 컨트롤러입니다.")
@RestController
@RequestMapping("/api/shop")
@RequiredArgsConstructor
public class ShopController {

    private final ShopService shopService;

    //전체 아이템 목록 조회
    @Operation(summary = "전체 아이템 조회")
    @GetMapping
    public ResponseEntity<List<ItemDto>> getAll(@RequestParam Long memberId){
        // 상점의 아이템 가져오기
        List<ItemDto> itemList = shopService.getAll(memberId);

        return ResponseEntity.ok(itemList);
    }


    //카테고리 별 아이템 목록 조회
    @Operation(summary = "타입별 전체 아이템 조회")
    @Parameter(description = "type", example = "character, decor, title, consumable")
    @GetMapping("/type")
    public ResponseEntity<List<ItemDto>> getItems(@RequestParam String type, @RequestParam Long memberId){
        // 상점의 아이템 가져오기
        List<ItemDto> shopItems = shopService.getTypeItems(type, memberId);

        return ResponseEntity.ok(shopItems);
    }

    //아이템 구매
    @Operation(summary = "아이템 구매 및 인벤토리로 저장")
    @PostMapping
    public ResponseEntity<Void> buyItem(@RequestParam Long itemId, @RequestParam Long memberId){
        shopService.buyItem(itemId,memberId);
        return ResponseEntity.ok().build();
    }

    //아이템 해금
    @Operation(summary = "해금 아이템 인벤토리로 저장")
    @PostMapping("/hidden")
    public ResponseEntity<Void> unlockItem(@RequestParam Long itemId, @RequestParam Long memberId) {
        shopService.unlockItem(itemId, memberId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "소비 아이템 구매 및 인벤토리로 저장")
    @PostMapping("/consumable")
    public ResponseEntity<Void> buyConsumableItem(@RequestParam Long itemId, @RequestParam Long memberId, @RequestParam int quantity){
        shopService.buyConsumableItem(itemId,memberId,quantity);
        return ResponseEntity.ok().build();
    }



}
