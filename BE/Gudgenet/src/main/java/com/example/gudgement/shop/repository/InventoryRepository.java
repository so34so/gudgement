package com.example.gudgement.shop.repository;
import com.example.gudgement.shop.entity.Shop;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface InventoryRepository extends JpaRepository<Shop,Long> {
    List<Shop> findAll();

}
