package com.example.gudgement.shop.service;

import com.example.gudgement.member.db.entity.Member;
import com.example.gudgement.member.db.repository.MemberRepository;
import com.example.gudgement.member.exception.UserNotFoundException;
import com.example.gudgement.progress.service.ProgressService;
import com.example.gudgement.progress.service.ProgressServiceImpl;
import com.example.gudgement.shop.dto.InventoryDto;
import com.example.gudgement.shop.dto.ItemDto;
import com.example.gudgement.shop.entity.Status;
import com.example.gudgement.shop.entity.Inventory;
import com.example.gudgement.shop.entity.Item;
import com.example.gudgement.shop.entity.Price;
import com.example.gudgement.shop.exception.AlreadyPurchasedException;
import com.example.gudgement.shop.exception.InsufficientPointsException;
import com.example.gudgement.shop.repository.InventoryRepository;
import com.example.gudgement.shop.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShopServiceImpl implements ShopService{

    private final String IMAGE_PATH = "static/item_images/";

    private final ProgressService progressService;

    private final ItemRepository itemRepository;
    private final InventoryRepository inventoryRepository;
    private final MemberRepository memberRepository;



    public List<ItemDto> getAll(Long memberId) {
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
/*            try {*/
                // 이미지를 byte[]로 변환
/*                Path imageFilePath = Paths.get(IMAGE_PATH, item.getType(), item.getImage());
                Resource resource = new ClassPathResource(imageFilePath.toString());

                byte[] imageData = null;
                if (resource != null) {
                    imageData = resource.getInputStream().readAllBytes();
                }*/
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
/*            } catch (IOException e) {
                e.printStackTrace();
            }*/
        }
        return itemDTOS;
    }

    public List<ItemDto> getTypeItems(String type, Long memberId) {
        Member member = memberRepository.findByMemberId(memberId);
        if (member == null) {
            throw new UserNotFoundException("유저를 찾을 수 없습니다.");
        }

        return itemsTypeLists(itemRepository.findAllByType(type), type, member);
    }

    private List<ItemDto> itemsTypeLists(List<Item> items, String type, Member memberId) {
        List<ItemDto> itemDTOS = new ArrayList<>();
        List<Inventory> userItems = inventoryRepository.findAllByMemberId(memberId);
        List<InventoryDto> userItemDtos = userItems.stream()
                .map(InventoryDto::invenDto)
                .collect(Collectors.toList());
        for (Item item : items) {
/*            try {*/
                // 이미지를 byte[]로 변환
/*                Path imageFilePath = Paths.get(IMAGE_PATH + type).resolve(item.getImage());
                Resource resource = new ClassPathResource(imageFilePath.toString());

                byte[] imageData = null;
                if (resource != null) {
                    imageData = resource.getInputStream().readAllBytes();
                }*/
                String imageData = IMAGE_PATH + type +"/"+ item.getImage();


                boolean isSold = userItemDtos.stream().anyMatch(userItem -> userItem.getItemId().equals(item.getItemId()));
                boolean isEquipped = userItems.stream().anyMatch(inventory -> inventory.getItemId().equals(item.getItemId()) && inventory.isEquipped());

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
/*            } catch (IOException e) {
                e.printStackTrace();
            }*/
        }
        return itemDTOS;
    }

    public void buyItem(Long itemId, Long memberId) {
        Member member = memberRepository.findByMemberId(memberId);
        if (member == null) {
            throw new UserNotFoundException("유저를 찾을 수 없습니다.");
        }

        Item item = itemRepository.findByItemId(itemId);

        // 이미 구매한 아이템인지 확인
        if (inventoryRepository.countByMemberIdAndItemId(member, item) != 0) {
            throw new AlreadyPurchasedException("이미 구매한 아이템입니다.");
        }

        // 포인트가 부족한지 확인
        if (((Price) item).getPrice()> member.getTiggle()) {
            throw new InsufficientPointsException("티끌이 부족합니다.");
        }

        // 포인트 차감
        member.useTiggle(((Price) item).getPrice());

        // 아이템 추가
        inventoryRepository.save(Inventory.builder().itemId(item).memberId(member).build());
    }

    public void unlockItem(Long itemId, Long memberId) {
        Member member = memberRepository.findByMemberId(memberId);
        if (member == null) {
            throw new UserNotFoundException("유저를 찾을 수 없습니다.");
        }

        Item item = itemRepository.findByItemId(itemId);

        // 이미 해금한 아이템인지 확인
        if (inventoryRepository.countByMemberIdAndItemId(member, item) != 0) {
            throw new AlreadyPurchasedException("이미 해금한 아이템입니다.");
        }

        // 아이템 추가
        inventoryRepository.save(Inventory.builder().itemId(item).memberId(member).build());
    }

/*
    public List<ItemDto> getEquippedItems(Long memberId) {
        Member member = memberRepository.findByMemberId(memberId);
        if(member == null) {
            throw new UserNotFoundException("유저를 찾을 수 없습니다.");
        }

        List<Inventory> userEquippedItems = inventoryRepository.findAllByMemberIdAndEquipped(member, true);
        if (userEquippedItems == null) {
            userEquippedItems = new ArrayList<>();
        }

        return userItemsToItemListDTOs(userEquippedItems);
    }

    private List<ItemDto> userItemsToItemListDTOs(List<Inventory> items) {
        // Inventory Dto 리스트에서 아이템 ID 추출
        List<Long> itemIds = items.stream().map(inventory -> inventory.getItemId().getId()).collect(Collectors.toList());

        // 아이템 ID를 기반으로 Item 엔티티 조회
        List<Item> itemList = itemRepository.findAllById(itemIds);

        // Item 엔티티 리스트를 Map으로 변환 (Key: 아이템 ID, Value: Item 엔티티)
        Map<Long, Item> itemMap = itemList.stream().collect(Collectors.toMap(Item::getId, Function.identity()));

        List<ItemDto> itemDTOS = new ArrayList<>();
        for (Inventory inventory : items) {
            try {
                Item item = itemMap.get(inventory.getItemId());
                if (item == null) continue;

                // 이미지를 byte[]로 변환
                Path imageFilePath = Paths.get(IMAGE_PATH + inventory.getItemId()).resolve(item.getImage());
                Resource resource = new ClassPathResource(imageFilePath.toString());

                byte[] imageData = null;
                if(resource != null) {
                    imageData = resource.getInputStream().readAllBytes();
                }

                itemDTOS.add(ItemDto.builder()
                        .itemName(item.getItemName())
                        .image(imageData)
                        .isSold(true)
                        .build());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return itemDTOS;
    }
*/



}
