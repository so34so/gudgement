package com.example.gudgement.shop.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="item_id")
    private long id;

    @Column(nullable=false)
    private String itemName;

    @Column(nullable=false)
    private String itemContent;

    @Column
    private String itemEffect;

    @Column
    private String image;

    @Column(nullable=false)
    private int price;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private int progress;

    @Column(nullable = false)
    private String progressAchieve;

    @Builder
    public Item(String itemName, String itemContent, String itemEffect, String image, int price, String type, int progress, String progressAchieve){
        this.itemName = itemName;
        this.itemContent = itemContent;
        this.itemEffect = itemEffect;
        this.image = image;
        this.price = price;
        this.type = type;
        this.progress = progress;
        this.progressAchieve = progressAchieve;
    }




}
