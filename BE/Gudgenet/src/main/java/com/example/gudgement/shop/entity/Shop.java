package com.example.gudgement.shop.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Shop {
    @Id
    @GeneratedValue
    @Column(name="item_id")
    private long id;

    @Column(nullable=false)
    private String itemName;

    @Column(nullable=false)
    private String itemContent;

    private String itemEffect;

    @Column(nullable=false)
    private int amount;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private int progress;

    @Column(nullable = false)
    private String progressAchieve;

    @Builder
    public Shop(long id, String itemName, String itemContent, String itemEffect, int amount, String category, int progress, String progressAchieve){
        this.id = id;
        this.itemName = itemName;
        this.itemContent = itemContent;
        this.itemEffect = itemEffect;
        this.amount = amount;
        this.category = category;
        this.progress = progress;
        this.progressAchieve = progressAchieve;
    }




}
