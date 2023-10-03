package com.example.gudgement.shop.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import com.example.gudgement.member.entity.Member;

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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "item_id")
    private Item itemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id")
    private Member member;

    // quantity field for consumable items.
    @Column(nullable = true)
    private Integer quantity;

    @Column
    @ColumnDefault("false")
    private boolean equipped;

    @Builder
    Inventory(Item itemId , Member member, Integer quantity){
        this.itemId = itemId;
        this.member = member;
        this.quantity = quantity == null ? 1 : quantity; // If quantity is not provided (null), set it to 1 by default.
    }

    @Override
    public String toString() {
        return "Inventory{" +
                "invenId=" + invenId +
                ", itemId=" + itemId +
                // member 필드 대신 memberId 필드 사용
                ", memberId=" + (member != null ? member.getMemberId() : null) +
                ", quantity=" + quantity +
                ", equipped=" + equipped +
                '}';
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
