package com.example.gudgement.shop.service;

import com.example.gudgement.member.db.entity.Member;
import com.example.gudgement.member.db.repository.MemberRepository;
import com.example.gudgement.member.exception.UserNotFoundException;
import com.example.gudgement.progress.service.ProgressService;
import com.example.gudgement.progress.service.ProgressServiceImpl;
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
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
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
        if (userItems == null) {
            userItems = new ArrayList<>();
        }
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

                ItemDto.ItemDtoBuilder builder = ItemDto.builder()
                        .id(item.getId())
                        .image(imageData)
                        .isSold(isSold);

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
            } catch (IOException e) {
                e.printStackTrace();
            }
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
        if (userItems == null) {
            userItems = new ArrayList<>();
        }
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

                ItemDto.ItemDtoBuilder builder = ItemDto.builder()
                        .id(item.getId())
                        .image(imageData)
                        .isSold(isSold);

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
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return itemDTOS;
    }

    public void buyItem(String itemName, Long memberId) {
        Member member = memberRepository.findByMemberId(memberId);
        if (member == null) {
            throw new UserNotFoundException("유저를 찾을 수 없습니다.");
        }

        Item item = itemRepository.findByItemName(itemName);

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

    public void unlockItem(String itemName, Long memberId) {
        Member member = memberRepository.findByMemberId(memberId);
        if (member == null) {
            throw new UserNotFoundException("유저를 찾을 수 없습니다.");
        }

        Item item = itemRepository.findByItemName(itemName);

        // 이미 해금한 아이템인지 확인
        if (inventoryRepository.countByMemberIdAndItemId(member, item) != 0) {
            throw new AlreadyPurchasedException("이미 해금한 아이템입니다.");
        }

        // 아이템 추가
        inventoryRepository.save(Inventory.builder().itemId(item).memberId(member).build());
    }

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

    private List<ItemDto> userItemsToItemListDTOs(List<ItemDto> items) {
        List<ItemDto> itemDTOS = new ArrayList<>();
        for (Inventory inventory : items) {
            try {
                // 이미지를 byte[]로 변환
                Path imageFilePath = Paths.get(IMAGE_PATH + inventory.getItemId().getType()).resolve(inventory.getItemId().getImage());
                Resource resource = new ClassPathResource(imageFilePath.toString());

                byte[] imageData = null;
                if(resource != null) {
                    imageData = resource.getInputStream().readAllBytes();
                }
                itemDTOS.add(ItemDto.builder()
                        .itemName(inventory.getItemId().getItemName())
                        .image(imageData)
                        .isSold(true)
                        .build());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return itemDTOS;
    }
}
