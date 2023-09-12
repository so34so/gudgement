package com.example.gudgement.shop.controller;

import com.example.gudgement.shop.dto.ItemDto;
import com.example.gudgement.shop.entity.Item;
import com.example.gudgement.shop.service.ShopService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shop")
@RequiredArgsConstructor
public class ShopController {

    private final ShopService shopService;

    @Operation(summary = "전체 아이템 목록 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "아이템 목록 조회 성공")
    })
    @GetMapping
    public ResponseEntity<List<ItemDto>> getAll() {
        List<ItemDto> itemList = shopService.getAll();
        return  ResponseEntity.ok(itemList);
    }

    @Operation(summary = "카테고리 별 아이템 목록 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "카테고리 아이템 목록 조회 성공")
    })
    @GetMapping("/{type}")
    public ResponseEntity<List<ItemDto>> getItems(@PathVariable String type){
        List<ItemDto> itemList = shopService.getTypeItems(type);
        return ResponseEntity.ok(itemList);
    }

    @Operation(summary = "아이템 구매")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "아이템 구매 성공")
    })
    @PostMapping("/buy")
    public ResponseEntity<Void> buyItem(@RequestBody String itemName){
        shopService.buyItem(itemName);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/unlock")
    public ResponseEntity<Void> unlockItem(@RequestBody String itemName){
        shopService.unlockItem(itemName);
        return ResponseEntity.ok().build();
    }


}
