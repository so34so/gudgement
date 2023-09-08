package com.example.gudgement.shop.repository;
import com.example.gudgement.shop.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface InventoryRepository extends JpaRepository<Inventory,Long> {
/*    List<Shop> findByMemberId(Member memberId);*/

}
