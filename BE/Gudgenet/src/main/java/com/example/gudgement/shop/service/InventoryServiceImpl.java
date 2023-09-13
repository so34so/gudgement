package com.example.gudgement.shop.service;

import com.example.gudgement.member.db.entity.Member;
import com.example.gudgement.member.db.repository.MemberRepository;
import com.example.gudgement.member.exception.UserNotFoundException;
import com.example.gudgement.shop.dto.InventoryDto;
import com.example.gudgement.shop.dto.ItemDto;
import com.example.gudgement.shop.dto.ItemListDto;
import com.example.gudgement.shop.entity.Inventory;
import com.example.gudgement.shop.repository.InventoryRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class InventoryServiceImpl implements InventoryService{

    private final InventoryRepository inventoryRepository;
    private final MemberRepository memberRepository;

    public List<InventoryDto> findMemberitems(Member member) {
        // 멤버 아이디를 사용하여 해당 멤버의 아이템 목록을 조회
        List<Inventory> inventoryList = inventoryRepository.findAllByMemberId(member);

        // Inventory 엔티티를 InventoryDto로 변환
        List<InventoryDto> inventoryDtoList = inventoryList.stream()
                .map(InventoryDto::invenDto)
                .collect(Collectors.toList());

        return inventoryDtoList;
    }

    public void equipItem(ItemListDto equippedItemListDto, Long memberId) {
        Member member = memberRepository.findByMemberId(memberId);
        if (member == null) {
            throw new UserNotFoundException("유저를 찾을 수 없습니다.");
        }

        List<Inventory> userItems = inventoryRepository.findAllByMemberId(member);
        if (userItems == null) {
            userItems = new ArrayList<>();
        }

        List<Long> equippedItemList = equippedItemListDto.getItems()
                .stream()
                .map(ItemDto::getId)
                .collect(Collectors.toList());

        List<Inventory> changeUserItems = new ArrayList<>();

        userItems.forEach(userItem -> {
            boolean isEquipped = userItem.isEquipped();
            boolean shouldEquip = equippedItemList.contains(userItem.getItemId().getId());

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

    }


}
