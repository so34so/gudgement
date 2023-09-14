package com.example.gudgement.shop.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import com.example.gudgement.member.db.entity.Member;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="inven_id")
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item itemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id")
    private Member memberId;

    @Column
    @ColumnDefault("false")
    private boolean equipped;

    @Builder Inventory(Item itemId , Member memberId){
        this.itemId = itemId;
        this.memberId = memberId;
    }

    public Inventory equip(){
        this.equipped = true;
        return this;
    }

    public Inventory unequip(){
        this.equipped = false;
        return this;
    }

}
