package com.example.gudgement.shop.service;

import com.example.gudgement.shop.dto.ItemDto;
import com.example.gudgement.shop.entity.Inventory;
import com.example.gudgement.shop.entity.Item;
import com.example.gudgement.shop.repository.InventoryRepository;
import com.example.gudgement.shop.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.lang.reflect.Member;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShopService {

    private final String IMAGE_PATH = "static/item_images/";

    private final ItemRepository itemRepository;
    private final InventoryRepository inventoryRepository;



    public List<ItemDto> getAll() {
        Member memberId = memberService.getLoginUser();
        if (memberId == null) {
            throw new UserNotFoundException("유저를 찾을 수 없습니다.");
        }

        return itemsAllItemLists(itemRepository.findAll(), memberId);
    }

    public List<ItemDto> itemsAllItemLists(List<Item> items, Member memberId) {
        List<ItemDto> itemDTOS = new ArrayList<>();
        List<Inventory> userItems = inventoryRepository.findAllByMember(memberId).orElse(new ArrayList<>());
        for (Item item : items) {
            try {
                // 이미지를 byte[]로 변환
                Path imageFilePath = Paths.get(IMAGE_PATH ).resolve(item.getImage());
                Resource resource = new ClassPathResource(imageFilePath.toString());

                byte[] imageData = null;
                if (resource != null) {
                    imageData = resource.getInputStream().readAllBytes();
                }

                boolean isSold = userItems.stream().anyMatch(userItem -> userItem.getItemId().equals(item.getId()));

                itemDTOS.add(ItemDto.builder()
                        .id(item.getId())
                        .price(item.getPrice())
                        .image(imageData)
                        .isSold(isSold)
                        .build());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return itemDTOS;
    }

    public List<ItemDto> getTypeItems(String type) {
        Member memberId = memberService.getLoginUser();
        if (memberId == null) {
            throw new UserNotFoundException("유저를 찾을 수 없습니다.");
        }

        return itemsTypeLists(itemRepository.findAllByType(type), type, memberId);
    }

    private List<ItemDto> itemsTypeLists(List<Item> items, String type, Member memberId) {
        List<ItemDto> itemDTOS = new ArrayList<>();
        List<Inventory> userItems = inventoryRepository.findAllByMember(memberId).orElse(new ArrayList<>());
        for (Item item : items) {
            try {
                // 이미지를 byte[]로 변환
                Path imageFilePath = Paths.get(IMAGE_PATH + type).resolve(item.getImage());
                Resource resource = new ClassPathResource(imageFilePath.toString());

                byte[] imageData = null;
                if (resource != null) {
                    imageData = resource.getInputStream().readAllBytes();
                }

                boolean isSold = userItems.stream().anyMatch(userItem -> userItem.getItemId().equals(item.getId()));

                itemDTOS.add(ItemDto.builder()
                        .id(item.getId())
                        .price(item.getPrice())
                        .image(imageData)
                        .isSold(isSold)
                        .build());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return itemDTOS;
    }

    public void buyItem(String itemName) {
        Member memberId = memberService.getLoginUser();
        if (memberId == null) {
            throw new UserNotFoundException("유저를 찾을 수 없습니다.");
        }

        Item item = itemRepository.findByName(itemName);

        // 이미 구매한 아이템인지 확인
        if (inventoryRepository.countByMemberAndItem(memberId, item) != 0) {
            throw new AlreadyPurchasedException("이미 구매한 아이템입니다.");
        }

        // 포인트가 부족한지 확인
        if (item.getPrice() > memberId.getTiggle()) {
            throw new InsufficientPointsException("포인트가 부족합니다.");
        }

        // 포인트 차감
        memberid.usePoint(item.getPrice());

        // 아이템 추가
        inventoryRepository.save(Inventory.builder().itemId(item).memberId(memberId).build());
    }

}
