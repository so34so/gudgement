package com.example.gudgement.shop.service;

import com.example.gudgement.shop.dto.InventoryDto;
import com.example.gudgement.shop.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class InventoryService {

/*    private final InventoryRepository inventoryRepository;

    @Transactional(readOnly = true)
    public List<InventoryDto> findInventoryItemsByMember(Member memberId){
        return inventoryRepository.findByMemberId(memberId);
    }*/

}
