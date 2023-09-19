package com.example.gudgement.shop.controller;

import com.example.gudgement.shop.dto.ItemDto;
import com.example.gudgement.shop.service.ShopService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Shop", description = "상점 기능 컨트롤러입니다.")
@RestController
@RequestMapping("/shop")
@RequiredArgsConstructor
public class ShopController {

    private final ShopService shopService;

    //전체 아이템 목록 조회
    @GetMapping
    public ResponseEntity<List<ItemDto>> getAll(@RequestParam Long memberId) {
        List<ItemDto> itemList = shopService.getAll(memberId);
        return  ResponseEntity.ok(itemList);
    }

    //카테고리 별 아이템 목록 조회
    @GetMapping("/{type}")
    public ResponseEntity<List<ItemDto>> getItems(@PathVariable String type, @RequestParam Long memberId){
        List<ItemDto> itemList = shopService.getTypeItems(type,memberId);
        return ResponseEntity.ok(itemList);
    }

    //아이템 구매
    @PostMapping("/buy")
    public ResponseEntity<Void> buyItem(@RequestBody String itemName, @RequestBody Long memberId){
        shopService.buyItem(itemName,memberId);
        return ResponseEntity.ok().build();
    }

    //아이템 해금
    @PostMapping("/unlock")
    public ResponseEntity<Void> unlockItem(@RequestBody String itemName, @RequestBody Long memberId){
        shopService.unlockItem(itemName,memberId);
        return ResponseEntity.ok().build();
    }


}
