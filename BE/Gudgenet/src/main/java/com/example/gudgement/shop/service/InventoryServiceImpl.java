package com.example.gudgement.shop.service;

import com.example.gudgement.member.db.entity.Member;
import com.example.gudgement.member.db.repository.MemberRepository;
import com.example.gudgement.member.exception.UserNotFoundException;
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

    private final InventoryRepository inventoryRepository;
    private final MemberRepository memberRepository;

    /*public List<ItemDto> getAllinventory(Long memberId) {
        Member member = memberRepository.findByMemberId(memberId);
        if (member == null) {
            throw new UserNotFoundException("유저를 찾을 수 없습니다.");
        }

        return itemsAllItemLists(itemRepository.findAll(), member);
    }

    private List<ItemDto> itemsAllItemLists(List<Item> items, Member memberId) {
        List<ItemDto> itemDTOS = new ArrayList<>();
        List<Inventory> userItems = inventoryRepository.findAllByMemberId(memberId);

        List<InventoryDto> userItemDtos = userItems.stream()
                .map(InventoryDto::invenDto)
                .collect(Collectors.toList());

        for (Item item : items) {
            *//*            try {*//*
            // 이미지를 byte[]로 변환
*//*                Path imageFilePath = Paths.get(IMAGE_PATH, item.getType(), item.getImage());
                Resource resource = new ClassPathResource(imageFilePath.toString());

                byte[] imageData = null;
                if (resource != null) {
                    imageData = resource.getInputStream().readAllBytes();
                }*//*
            String imageData = IMAGE_PATH + item.getType() +"/"+ item.getImage();

            boolean isSold = userItemDtos.stream().anyMatch(inventory -> inventory.getItemId().equals(item.getItemId()));
            boolean isEquipped = userItemDtos.stream().anyMatch(inventory -> inventory.getItemId().equals(item.getItemId()) && inventory.isEquipped());

            ItemDto.ItemDtoBuilder builder = ItemDto.builder()
                    .id(item.getItemId())
                    .itemName(item.getItemName())
                    .itemContent(item.getItemContent())
                    .itemEffect(item.getItemEffect())
                    .image(imageData)
                    .isSold(isSold)
                    .isEquipped(isEquipped);

            if (item instanceof Price) {
                builder.price(((Price) item).getPrice());
            } else if (item instanceof Status) {
                String statusName = ((Status) item).getStatusName();
                int statusValue = ((Status) item).getStatus();

                // member progress에서 statusName 동일하고 statusValue 수가 같거나 높은지 확인
                boolean isUnlocked = progressService.checkUnlockStatus(memberId, statusName, statusValue);

                builder.isUnlocked(isUnlocked);
            }

            itemDTOS.add(builder.build());
*//*            } catch (IOException e) {
                e.printStackTrace();
            }*//*
        }
        return itemDTOS;
    }*/

    public List<InventoryDto> findMemberitems(Member member) {
        // 멤버 아이디를 사용하여 해당 멤버의 아이템 목록을 조회
        List<Inventory> inventoryList = inventoryRepository.findAllByMemberId(member);



        // Inventory 엔티티를 InventoryDto로 변환
/*        List<InventoryDto> inventoryDtoList = inventoryList.stream()
                .map(InventoryDto::invenDto)
                .collect(Collectors.toList());*/
        List<InventoryDto> inventoryDtoList = inventoryList.stream()
                .filter(inventory -> inventory.getItemId().getItemId().equals(item.getId()))
                .map(InventoryDto::invenDto)
                .collect(Collectors.toList());

        return inventoryDtoList;

    }

    public InventoryDto  equipItem(Long inventoryId) {
        Inventory selectedInventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new NotFoundItemException("해당 아이템이 없습니다."));

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

  /*  public void equipItem(InventoryDto inventoryDto) {
        Member member = memberRepository.findByMemberId(inventoryDto.getMemberId());
        if (member == null) {
            throw new UserNotFoundException("유저를 찾을 수 없습니다.");
        }

        List<Inventory> userItems = inventoryRepository.findAllByMemberId(member);

        List<InventoryDto> userItemDtos = userItems.stream()
                .map(InventoryDto::invenDto)
                .collect(Collectors.toList());

        List<Long> equippedItemList = equippedItemListDto.getItems()
                .stream()
                .map(ItemDto::getId)
                .collect(Collectors.toList());

        List<Inventory> changeUserItems = new ArrayList<>();

        userItems.forEach(userItem -> {
            boolean isEquipped = userItem.isEquipped();
            boolean shouldEquip = equippedItemList.contains(userItem.getItemId().getItemId());

            if (isEquipped != shouldEquip) {
                if (shouldEquip) {
                    userItem.equip();
                } else {
                    userItem.unequip();
                }
                changeUserItems.add(userItem);
            }
        });

        if (!changeUserItems.isEmpty()) {
            inventoryRepository.saveAll(changeUserItems);
        }

    }*/


}
