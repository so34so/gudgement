package com.example.gudgement.shop.controller;

import com.example.gudgement.member.db.entity.Member;
import com.example.gudgement.member.db.repository.MemberRepository;
import com.example.gudgement.member.exception.UserNotFoundException;
import com.example.gudgement.shop.dto.EquippedDto;
import com.example.gudgement.shop.dto.InventoryDto;
import com.example.gudgement.shop.dto.ItemListDto;
import com.example.gudgement.shop.repository.InventoryRepository;
import com.example.gudgement.shop.service.InventoryService;
import com.example.gudgement.shop.service.InventoryServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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
    private final MemberRepository memberRepository;

    //보유 아이템 조회
    @Operation(summary = "보유 아이템 전체 조회")
    @GetMapping
    public ResponseEntity<List<EquippedDto>> getItems(@RequestParam Long memberId){
        // 멤버 아이디로 멤버 조회
        Member member = memberRepository.findByMemberId(memberId);
        if (member == null) {
            throw new UserNotFoundException("유저를 찾을 수 없습니다.");
        }

        List<EquippedDto> itemList = inventoryService.findMemberitems(member);

        return ResponseEntity.ok(itemList);
    }

    @Operation(summary = "보유 아이템 타입별 조회")
    @Parameter(description = "type", example = "character, decor, title, consumable")
    @GetMapping("/type")
    public ResponseEntity<List<EquippedDto>> getTypeItems(@RequestParam String type, @RequestParam Long memberId){
        // 멤버 아이디로 멤버 조회
        Member member = memberRepository.findByMemberId(memberId);
        if (member == null) {
            throw new UserNotFoundException("유저를 찾을 수 없습니다.");
        }

        List<EquippedDto> itemList = inventoryService.findMemberTypeitems(type, member);

        return ResponseEntity.ok(itemList);
    }

    @Operation(summary = "아이템 장착")
    @PutMapping
    public ResponseEntity<InventoryDto> equip(@RequestParam Long invenId) {
        inventoryService.equipItem(invenId);
        return ResponseEntity.ok().build();
    }




}
