package com.example.gudgement.shop.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.Base64;

@Getter
@NoArgsConstructor
@SuperBuilder
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="item_id")
    private long itemId;

    @Column(nullable=false)
    private String itemName;

    @Column(nullable=false)
    private String itemContent;

    @Column
    private String itemEffect;

    @Column
    private String image;

    @Column(nullable = false)
    private String type;


    public Item(String itemName, String itemContent, String itemEffect, String image, String type){
        this.itemName = itemName;
        this.itemContent = itemContent;
        this.itemEffect = itemEffect;
        this.image = image;
        this.type = type;

    }

}
