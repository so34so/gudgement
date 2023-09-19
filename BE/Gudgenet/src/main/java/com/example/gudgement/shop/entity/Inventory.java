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
    private long invenId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item itemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id")
    private Member memberId;

    // quantity field for consumable items.
    @Column(nullable = true)
    private Integer quantity;

    @Column
    @ColumnDefault("false")
    private boolean equipped;

    @Builder
    Inventory(Item itemId , Member memberId, Integer quantity){
        this.itemId = itemId;
        this.memberId = memberId;
        this.quantity = quantity == null ? 1 : quantity; // If quantity is not provided (null), set it to 1 by default.
    }

    public Inventory equip(){
        this.equipped = true;
        return this;
    }

    public Inventory unequip(){
        this.equipped = false;
        return this;
    }

    public void increaseQuantity(int amount) {
        if (this.quantity != null) {
            this.quantity += amount;
        }
    }

    public void decreaseQuantity(int amount) {
        if (this.quantity != null && this.quantity < amount) {
            throw new IllegalArgumentException("Not enough items in inventory");
        }

        if (this.quantity != null) {
            this.quantity -= amount;
        }
    }
}
