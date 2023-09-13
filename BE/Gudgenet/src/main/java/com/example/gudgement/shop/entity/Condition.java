package com.example.gudgement.shop.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@Getter
@NoArgsConstructor
@Entity
public class Condition extends Item{


    private String conditionName;
    private String conditionContent;
    private int condition;

    @Builder
    public Condition(String itemName, String itemContent,
                         String itemEffect,String image,
                         String type,String conditionName,
                         String conditionContent,int condition) {
        super(itemName,itemContent,itemEffect,image,type);
        this.conditionName=conditionName;
        this.conditionContent=conditionContent;
        this.condition=condition;
    }
}
