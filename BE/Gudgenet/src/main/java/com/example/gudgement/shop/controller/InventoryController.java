package com.example.gudgement.shop.controller;

import com.example.gudgement.shop.dto.InventoryDto;
import com.example.gudgement.shop.dto.ItemListDto;
import com.example.gudgement.shop.repository.InventoryRepository;
import com.example.gudgement.shop.service.InventoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/inventory")
public class InventoryController {

    private final InventoryService inventoryService;
    private final InventoryRepository inventoryRepository;

    @Operation(summary = "보유 아이템 목록 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "아이템 목록 조회 성공")
    })
    @GetMapping("/{memberId}")
    public ResponseEntity<List<InventoryDto>> getItems(@PathVariable Long memberId){
        // 멤버 아이디로 멤버 조회
        Member member = memberService.findMemberById(memberId);
        if (member == null) {
            throw new UserNotFoundException("유저를 찾을 수 없습니다.");
        }

        List<InventoryDto> itemList = inventoryService.findMemberitems(member);

        return ResponseEntity.ok(itemList);
    }

    @Operation(summary = "아이템 장착")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "아이템 장착 성공"),
            @ApiResponse(responseCode = "404", description = "유저를 찾을 수 없습니다.")
    })
    @PatchMapping("/equipped")
    public ResponseEntity<Void> equipItem(@RequestBody ItemListDto equippedItemListDto) {
        inventoryService.equipItem(equippedItemListDto);
        return ResponseEntity.ok().build();
    }




}
