package com.example.gudgement.shop.repository;
import com.example.gudgement.member.entity.Member;
import com.example.gudgement.shop.entity.Inventory;
import com.example.gudgement.shop.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface InventoryRepository extends JpaRepository<Inventory,Long> {
    int countByMemberIdAndItemId(Member memberId, Item itemId);

    List<Inventory> findAllByMemberId(Member memberId);

    List<Inventory> findAllByMemberIdAndEquipped(Member memberId, boolean b);

    Optional<Inventory> findByItemId_TypeAndEquipped(String type, boolean b);

/*    Optional<Inventory> findByItemId(Item inventoryId);*/

    Optional<Inventory> findByMemberIdAndItemId(Member member, Item item);

    Optional<Inventory> findByInvenId(Long invenId);

    List<Inventory> findByMemberIdAndEquipped(Long memberId, boolean b);

/*    Inventory findByMemberIdAndShopTypeAndEquipped(Long memberId, String type, boolean equipped);

    List<InventoryDto> findItemsByMemberId(Long memberId);*/
}
