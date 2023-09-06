package com.example.gudgement.shop.service;

import com.example.gudgement.shop.dto.ShopDto;
import com.example.gudgement.shop.repository.ShopRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShopService {
    private final ShopRepository shopRepository;
    @Transactional(readOnly = true)
    public List<ShopDto> getAll(){
        return shopRepository.findAll().stream()
                .map(ShopDto::toDto)
                .collect(Collectors.toList());
    }
}
