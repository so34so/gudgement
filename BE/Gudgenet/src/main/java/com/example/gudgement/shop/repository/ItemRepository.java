package com.example.gudgement.shop.repository;
import com.example.gudgement.shop.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ItemRepository extends JpaRepository<Item,Long> {
    List<Item> findAll();
    List<Item> findAllByType(String type);

    Item findByName(String itemName);
}
