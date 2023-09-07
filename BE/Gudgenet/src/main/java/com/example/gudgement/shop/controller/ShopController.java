package com.example.gudgement.shop.controller;

import com.example.gudgement.shop.dto.ShopDto;
import com.example.gudgement.shop.entity.Shop;
import com.example.gudgement.shop.service.ShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/shop")
@RequiredArgsConstructor
public class ShopController {

    private final ShopService shopService;

    @GetMapping("/shop")
    public ResponseEntity<List> getAll() {
        List<ShopDto> itemList = shopService.getAll();
        return new ResponseEntity<>(itemList, HttpStatus.OK);
    }

    @GetMapping("/item")
    public List<Shop> getItems(@RequestPart("category") String category) {
        return shopService.getItem(category);
    }


}
