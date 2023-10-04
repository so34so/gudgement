package com.example.gudgement.shop.service;

import com.example.gudgement.member.entity.Member;
import com.example.gudgement.shop.dto.EquippedDto;
import com.example.gudgement.shop.dto.InventoryDto;
import com.example.gudgement.shop.entity.Inventory;
import com.example.gudgement.shop.exception.ItemErrorCode;
import com.example.gudgement.shop.exception.NotFoundItemException;
import com.example.gudgement.shop.repository.InventoryRepository;
import com.example.gudgement.shop.repository.ItemRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class InventoryServiceImpl implements InventoryService{

    private final String IMAGE_PATH = "https://d15h0ofj6la3lc.cloudfront.net/";

    private final InventoryRepository inventoryRepository;
    private final ItemRepository itemRepository;

    public List<EquippedDto> findMemberitems(Member member) {
        List<Inventory> inventoryList = inventoryRepository.findAllByMember(member);

        List<EquippedDto> equippedList = inventoryList.stream()
                .map(inventory -> {
                    EquippedDto.EquippedDtoBuilder builder = EquippedDto.builder()
                            .invenId(inventory.getInvenId())
                            .itemId(inventory.getItemId().getItemId())
                            .itemName(inventory.getItemId().getItemName())
                            .itemContent(inventory.getItemId().getItemContent())
                            .itemEffect(inventory.getItemId().getItemEffect())
                            .image(IMAGE_PATH + inventory.getItemId().getType() + "/" + inventory.getItemId().getImage())
                            .isEquipped(inventory.isEquipped());

                    // If the item is a consumable, add its quantity.
                    if ("consumable".equals(inventory.getItemId().getType())) {
                        builder.quantity(inventory.getQuantity());
                    }

                    return builder.build();
                })
                .collect(Collectors.toList());

        return equippedList;
    }

    public List<EquippedDto> findMemberTypeitems(String type, Member member) {
        List<Inventory> inventoryList = inventoryRepository.findAllByMember(member);
        AtomicLong typeId = new AtomicLong(1);
        List<EquippedDto> equippedList = inventoryList.stream()
                .filter(inventory -> type.equals(inventory.getItemId().getType()))
                .map(inventory -> {
                    EquippedDto.EquippedDtoBuilder builder = EquippedDto.builder()
                            .invenId(inventory.getInvenId())
                            .itemId(inventory.getItemId().getItemId())
                            .itemName(inventory.getItemId().getItemName())
                            .itemContent(inventory.getItemId().getItemContent())
                            .itemEffect(inventory.getItemId().getItemEffect())
                            .type(inventory.getItemId().getType())
                            .subType(inventory.getItemId().getSubtype())
                            .image(IMAGE_PATH + inventory.getItemId().getType() + "/" + inventory.getItemId().getImage())
                            .isEquipped(inventory.isEquipped());

                    // If the item is a consumable, add its quantity.
                    if ("consumable".equals(type)) {
                        builder.quantity(inventory.getQuantity());
                    }

                    return builder.build();
                })
                .collect(Collectors.toList());

        return equippedList;
    }


    public InventoryDto equipItem(Long invenId) {
        // 그런 다음에 인벤토리를 조회합니다.
        Inventory selectedInventory = inventoryRepository.findByInvenId(invenId)
                .orElseThrow(() -> new NotFoundItemException(ItemErrorCode.NOT_FOUND_ITEM));

        // Find an already equipped item of the same type and unequip it.
        Optional<Inventory> equippedInventoryOpt =
                inventoryRepository.findByMember_MemberIdAndItemId_TypeAndEquipped(selectedInventory.getMember().getMemberId(), selectedInventory.getItemId().getType(), true);


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
