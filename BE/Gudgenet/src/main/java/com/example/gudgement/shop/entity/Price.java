package com.example.gudgement.shop.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;

@Getter
@NoArgsConstructor
@SuperBuilder
@Entity
public class Price extends Item{

    private Long price;


    public Price(String itemName, String itemContent, String itemEffect, String image, String type, Long price) {
        super(itemName, itemContent, itemEffect, image, type);
        this.price = price;
    }
}
