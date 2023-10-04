package com.example.gudgement.shop.repository;
import com.example.gudgement.member.entity.Member;
import com.example.gudgement.shop.entity.Inventory;
import com.example.gudgement.shop.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface InventoryRepository extends JpaRepository<Inventory,Long> {
    int countByMemberAndItemId(Member memberId, Item itemId);

    List<Inventory> findAllByMember(Member member);

    Optional<Inventory> findByMember_MemberIdAndItemId_TypeAndEquipped(Long memberId, String type, boolean b);


    Optional<Inventory> findByMemberAndItemId(Member member, Item item);

    Optional<Inventory> findByInvenId(Long invenId);

    List<Inventory> findByMemberAndEquipped(Member member, boolean b);

    @Query("SELECT i FROM Inventory i JOIN i.itemId item WHERE i.member = :member AND i.equipped = true AND item.type = 'character'")
    Optional<Inventory> findEquippedCharacterItemByMember(Member member);
    
    List<Inventory> findByMemberAndItemId_TypeAndEquipped(Member member, String consumable, boolean b);
}
