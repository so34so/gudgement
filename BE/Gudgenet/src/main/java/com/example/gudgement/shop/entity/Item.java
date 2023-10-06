package com.example.gudgement.shop.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@SuperBuilder
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Column
    private String subtype;


    public Item(String itemName, String itemContent, String itemEffect, String image, String type, String subtype){
        this.itemName = itemName;
        this.itemContent = itemContent;
        this.itemEffect = itemEffect;
        this.image = image;
        this.type = type;
        this.subtype = subtype;
    }

}
