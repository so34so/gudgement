package com.example.gudgement.shop.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Inventory {

    @Id
    @GeneratedValue
    @Column(name="get_id")
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Shop itemId;

    /*@OneToMany
    @JoinColumn(name="member_id")
    private Member memberId*/

    @Builder Inventory(long id, Shop itemId){
        this.id = id;
        this.itemId = itemId;
    }

}
