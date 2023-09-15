package com.example.gudgement.shop.controller;

import com.example.gudgement.member.db.entity.Member;
import com.example.gudgement.member.db.repository.MemberRepository;
import com.example.gudgement.member.exception.UserNotFoundException;
import com.example.gudgement.shop.dto.InventoryDto;
import com.example.gudgement.shop.dto.ItemListDto;
import com.example.gudgement.shop.repository.InventoryRepository;
import com.example.gudgement.shop.service.InventoryService;
import com.example.gudgement.shop.service.InventoryServiceImpl;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Inventory", description = "인벤토리 기능 컨트롤러입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/inventory")
public class InventoryController {

    private final InventoryService inventoryService;
    private final InventoryRepository inventoryRepository;
    private final MemberRepository memberRepository;

    //보유 아이템 조회
    @GetMapping("/{memberId}")
    public ResponseEntity<List<InventoryDto>> getItems(@PathVariable Long memberId){
        // 멤버 아이디로 멤버 조회
        Member member = memberRepository.findByMemberId(memberId);
        if (member == null) {
            throw new UserNotFoundException("유저를 찾을 수 없습니다.");
        }

        List<InventoryDto> itemList = inventoryService.getAllinventory(member);

        return ResponseEntity.ok(itemList);
    }

    //아이템장착
/*    @PatchMapping("/equipped")
    public ResponseEntity<Void> equipItem(@RequestBody InventoryDto inventoryDto) {
        inventoryServiceImpl.equipItem(inventoryDto);
        return ResponseEntity.ok().build();
    }*/

    @PutMapping("/{itemId}")
    public ResponseEntity<InventoryDto> equip(@PathVariable Long itemId) {
        return ResponseEntity.ok(inventoryService.equipItem(itemId));

    }




}
