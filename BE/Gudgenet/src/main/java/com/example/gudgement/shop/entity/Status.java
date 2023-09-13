package com.example.gudgement.shop.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;

@Getter
@NoArgsConstructor
@SuperBuilder
@Entity
public class Status extends Item{


    private String statusName;
    private String statusContent;
    private int status;



    public Status(String itemName, String itemContent,
                  String itemEffect, String image,
                  String type, String statusName,
                  String statusContent, int status) {
        super(itemName,itemContent,itemEffect,image,type);
        this.statusName=statusName;
        this.statusContent=statusContent;
        this.status=status;
    }

}
