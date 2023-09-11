package com.example.gudgement.shop.repository;
import com.example.gudgement.shop.dto.InventoryDto;
import com.example.gudgement.shop.entity.Inventory;
import com.example.gudgement.shop.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface InventoryRepository extends JpaRepository<Inventory,Long> {
    int countByMemberAndItem(Member memberId, Item item);

    List<Inventory> findAllByMember(Member memberId);

    List<Inventory> findAllByMemberIdAndEquipped(Member memberId, boolean b);

    Inventory findByMemberMemberIdAndShopTypeAndEquipped(Long memberId, String type, boolean equipped);

    List<InventoryDto> findItemsByMember(Long memberId);
}
