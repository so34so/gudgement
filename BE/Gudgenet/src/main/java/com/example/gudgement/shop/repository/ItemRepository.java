package com.example.gudgement.shop.repository;
import com.example.gudgement.shop.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface ItemRepository extends JpaRepository<Item,Long> {
    List<Item> findAll();
    List<Item> findAllByType(String type);

/*    Optional<Item> findByTypeAndEquipped(String type, boolean equipped);

    Item findByItemName(String itemName);*/

    Optional<Item> findByItemId(Long itemId);

   /* List<Item> findAllById(List<Long> itemIds);*/
}
