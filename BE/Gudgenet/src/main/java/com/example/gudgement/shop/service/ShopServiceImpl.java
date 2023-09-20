package com.example.gudgement.shop.service;

import com.example.gudgement.member.entity.Member;
import com.example.gudgement.member.repository.MemberRepository;
import com.example.gudgement.member.exception.BaseErrorException;
import com.example.gudgement.member.exception.ErrorCode;
import com.example.gudgement.progress.service.ProgressService;
import com.example.gudgement.shop.dto.InventoryDto;
import com.example.gudgement.shop.dto.ItemDto;
import com.example.gudgement.shop.entity.Status;
import com.example.gudgement.shop.entity.Inventory;
import com.example.gudgement.shop.entity.Item;
import com.example.gudgement.shop.entity.Price;
import com.example.gudgement.shop.exception.AlreadyPurchasedException;
import com.example.gudgement.shop.exception.InsufficientPointsException;
import com.example.gudgement.shop.exception.NotFoundItemException;
import com.example.gudgement.shop.repository.InventoryRepository;
import com.example.gudgement.shop.repository.ItemRepository;
import com.example.gudgement.shop.repository.StatusRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShopServiceImpl implements ShopService{

    private final String IMAGE_PATH = "https://d15h0ofj6la3lc.cloudfront.net/";

    private final ProgressService progressService;

    private final ItemRepository itemRepository;
    private final InventoryRepository inventoryRepository;
    private final MemberRepository memberRepository;
    private final StatusRepository statusRepository;



    public List<ItemDto> getAll(Long memberId) {
        Member member = memberRepository.findByMemberId(memberId).orElseThrow(() ->
                new BaseErrorException(ErrorCode.MEMBER_NOT_FOUND_EXCEPTION)
                );

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
        Member member = memberRepository.findByMemberId(memberId).orElseThrow(() ->
                new BaseErrorException(ErrorCode.MEMBER_NOT_FOUND_EXCEPTION)
                );

        return itemsTypeLists(itemRepository.findAllByType(type), type, member);
    }

    private List<ItemDto> itemsTypeLists(List<Item> items, String type, Member memberId) {
        List<ItemDto> itemDTOS = new ArrayList<>();
        List<Inventory> userItems = inventoryRepository.findAllByMemberId(memberId);
        List<InventoryDto> userItemDtos = userItems.stream()
                .map(InventoryDto::invenDto)
                .collect(Collectors.toList());
        long typeId = 1;
        for (Item item : items) {

            String imageData = IMAGE_PATH + type +"/"+ item.getImage();

            boolean isSold = false;

            if(!"consumable".equals(type)){
                isSold = userItemDtos.stream().anyMatch(userItem -> userItem.getItemId().equals(item.getItemId()));
            }

            boolean isEquipped = userItemDtos.stream().anyMatch(inventory -> inventory.getItemId().equals(item.getItemId()) && inventory.isEquipped());

            // Status entity의 itemId와 Item 비교하여 일치하는 경우 hidden 값을 true로 설정
            boolean isHidden = statusRepository.existsByItemId(item.getItemId());

                ItemDto.ItemDtoBuilder builder = ItemDto.builder()
                        .id(item.getItemId())
                        .itemName(item.getItemName())
                        .itemContent(item.getItemContent())
                        .itemEffect(item.getItemEffect())
                        .image(imageData)
                        .typeId(typeId++)
                        .isSold(isSold)
                        .isEquipped(isEquipped)
                        .isHidden(isHidden);

            if ("decor".equals(type)) {
                String subtype = item.getSubtype();
                builder.subType(subtype);
            }

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
        }
        return itemDTOS;
    }

    public void buyItem(Long itemId, Long memberId) {
        Member member = memberRepository.findByMemberId(memberId).orElseThrow(() ->
                new BaseErrorException(ErrorCode.MEMBER_NOT_FOUND_EXCEPTION)
        );


        Item item = itemRepository.findByItemId(itemId)
                .orElseThrow(() -> new NotFoundItemException("해당 아이템이 없습니다."));


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
        inventoryRepository.save(Inventory.builder().itemId(item).memberId(member).quantity(1).build());
    }

    public void unlockItem(Long itemId, Long memberId) {
        Member member = memberRepository.findByMemberId(memberId).orElseThrow(() ->
                new BaseErrorException(ErrorCode.MEMBER_NOT_FOUND_EXCEPTION)
        );

        Item item = itemRepository.findByItemId(itemId)
                .orElseThrow(() -> new NotFoundItemException("해당 아이템이 없습니다."));

        // 이미 해금한 아이템인지 확인
        if (inventoryRepository.countByMemberIdAndItemId(member, item) != 0) {
            throw new AlreadyPurchasedException("이미 해금한 아이템입니다.");
        }

        // 아이템 추가
        inventoryRepository.save(Inventory.builder().itemId(item).memberId(member).build());
    }

    public void buyConsumableItem(Long itemId, Long memberId, int quantity) {
        Member member = memberRepository.findByMemberId(memberId).orElseThrow(() ->
                new BaseErrorException(ErrorCode.MEMBER_NOT_FOUND_EXCEPTION)
        );


        Item item = itemRepository.findByItemId(itemId)
                .orElseThrow(() -> new NotFoundItemException("해당 아이템이 없습니다."));

        // 포인트가 부족한지 확인
        if (((Price) item).getPrice() * quantity > member.getTiggle()) {
            throw new InsufficientPointsException("티끌이 부족합니다.");
        }

        // 티끌 차감
        member.useTiggle(((Price) item).getPrice() * quantity);

        // Find the inventory item for this user and this consumable.
        Inventory inventory = inventoryRepository.findByMemberIdAndItemId(member, item)
                .orElseGet(() -> {
                    // If the inventory does not exist yet, create a new one.
                    Inventory newInventory = Inventory.builder()
                            .itemId(item)
                            .memberId(member)
                            .quantity(quantity)
                            .build();

                    return inventoryRepository.save(newInventory);
                });

        // If the inventory already exists, increase its quantity.
        inventory.increaseQuantity(quantity);

        inventoryRepository.save(inventory);
    }



}
