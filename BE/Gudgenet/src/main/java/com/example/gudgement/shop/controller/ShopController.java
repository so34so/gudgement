package com.example.gudgement.shop.controller;

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
/*    @GetMapping
    public ResponseEntity<List<ItemDto>> getAll(@RequestParam Long memberId) {
        List<ItemDto> itemList = shopServiceImpl.getAll(memberId);
        return  ResponseEntity.ok(itemList);
    }*/

    @GetMapping
    public ResponseEntity<Map<String, List<ItemDto>>> getAll( @RequestParam Long memberId){
        // 장착한 아이템 가져오기
        List<ItemDto> equippedItems = shopServiceImpl.getEquippedItems(memberId);

        // 상점의 아이템 가져오기
        List<ItemDto> itemList = shopServiceImpl.getAll(memberId);

        // 두 리스트를 Map에 담기
        Map<String, List<ItemDto>> itemsMap = new HashMap<>();
        itemsMap.put("equipped", equippedItems);
        itemsMap.put("shop", itemList);

        return ResponseEntity.ok(itemsMap);
    }

    //카테고리 별 아이템 목록 조회
/*    @GetMapping("/{type}")
    public ResponseEntity<List<ItemDto>> getItems(@PathVariable String type, @RequestParam Long memberId){
        List<ItemDto> itemList = shopServiceImpl.getTypeItems(type,memberId);
        return ResponseEntity.ok(itemList);
    }*/

    @GetMapping("/{type}")
    public ResponseEntity<Map<String, List<ItemDto>>> getItems(@PathVariable String type, @RequestParam Long memberId){
        // 장착한 아이템 가져오기
        List<ItemDto> equippedItems = shopServiceImpl.getEquippedItems(memberId);

        // 상점의 아이템 가져오기
        List<ItemDto> shopItems = shopServiceImpl.getTypeItems(type, memberId);

        // 두 리스트를 Map에 담기
        Map<String, List<ItemDto>> itemsMap = new HashMap<>();
        itemsMap.put("equipped", equippedItems);
        itemsMap.put("shop", shopItems);

        return ResponseEntity.ok(itemsMap);
    }


    //아이템 구매
    @PostMapping("/buy")
    public ResponseEntity<Void> buyItem(@RequestBody String itemName, @RequestBody Long memberId){
        shopServiceImpl.buyItem(itemName,memberId);
        return ResponseEntity.ok().build();
    }

    //아이템 해금
    @PostMapping("/unlock")
    public ResponseEntity<Void> unlockItem(@RequestBody String itemName, @RequestBody Long memberId){
        shopServiceImpl.unlockItem(itemName,memberId);
        return ResponseEntity.ok().build();
    }


}
