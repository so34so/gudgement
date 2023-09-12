package com.example.gudgement.shop.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@Getter
@NoArgsConstructor
@Entity
public class Price extends Item{

    private int price;

    @Builder
    public Price(String itemName, String itemContent, String itemEffect, String image, String type, int price) {
        super(itemName, itemContent, itemEffect, image, type);
        this.price = price;
    }
}
