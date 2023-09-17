package com.example.gudgement.shop.service;

import com.example.gudgement.member.db.entity.Member;
import com.example.gudgement.member.db.repository.MemberRepository;
import com.example.gudgement.member.exception.UserNotFoundException;
import com.example.gudgement.shop.dto.EquippedDto;
import com.example.gudgement.shop.dto.InventoryDto;
import com.example.gudgement.shop.dto.ItemDto;
import com.example.gudgement.shop.dto.ItemListDto;
import com.example.gudgement.shop.entity.Inventory;
import com.example.gudgement.shop.entity.Item;
import com.example.gudgement.shop.entity.Price;
import com.example.gudgement.shop.entity.Status;
import com.example.gudgement.shop.exception.AlreadyPurchasedException;
import com.example.gudgement.shop.exception.NotFoundItemException;
import com.example.gudgement.shop.repository.InventoryRepository;
import com.example.gudgement.shop.repository.ItemRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class InventoryServiceImpl implements InventoryService{

    private final String IMAGE_PATH = "https://d15h0ofj6la3lc.cloudfront.net/";

    private final InventoryRepository inventoryRepository;
    private final ItemRepository itemRepository;

    public List<EquippedDto> findMemberitems(Member member) {
        List<Inventory> inventoryList = inventoryRepository.findAllByMemberId(member);

        List<EquippedDto> equippedList = inventoryList.stream()
                .map(inventory -> EquippedDto.builder()
                        .id(inventory.getId())
                        .itemId(inventory.getItemId().getItemId())
                        .itemName(inventory.getItemId().getItemName())
                        .itemContent(inventory.getItemId().getItemContent())
                        .itemEffect(inventory.getItemId().getItemEffect())
                        .image(IMAGE_PATH + inventory.getItemId().getType() + "/" + inventory.getItemId().getImage())
                        .isEquipped(inventory.isEquipped())
                        .build())
                .collect(Collectors.toList());

        return equippedList;
    }

    public InventoryDto  equipItem(Long inventoryId) {
        // 먼저 아이템을 조회합니다.
        Item item = itemRepository.findById(inventoryId)
                .orElseThrow(() -> new NotFoundItemException("해당 아이템이 없습니다."));

        // 그 다음에 인벤토리를 조회합니다.
        Inventory selectedInventory = inventoryRepository.findByItemId(item.getItemId())
                .orElseThrow(() -> new NotFoundItemException("해당 인벤토리가 없습니다."));

        // If the item is already equipped, throw an exception.
        if (selectedInventory.isEquipped()) {
            throw new AlreadyPurchasedException("이미 장착한 아이템입니다.");
        }

        // Find an already equipped item of the same type and unequip it.
        Optional<Inventory> equippedInventoryOpt =
                inventoryRepository.findByItemId_TypeAndEquipped(selectedInventory.getItemId().getType(), true);

        if (equippedInventoryOpt.isPresent()) {
            equippedInventoryOpt.get().unequip();
            // Save changes to the previously equipped item.
            inventoryRepository.save(equippedInventoryOpt.get());
        }

        // Equip the new item.
        selectedInventory.equip();

        // Save changes to the newly equipped item.
        return InventoryDto.invenDto(inventoryRepository.save(selectedInventory));
    }

}
