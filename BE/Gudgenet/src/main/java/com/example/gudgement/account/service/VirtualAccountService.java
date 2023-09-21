package com.example.gudgement.account.service;

import com.example.gudgement.account.dto.VirtualAccountDto;
import java.util.List;

public interface VirtualAccountService {
    VirtualAccountDto create(VirtualAccountDto virtualAccountDto);
    List<VirtualAccountDto> getAll(); // 모든 가상 계좌 목록 조회
    VirtualAccountDto getById(Long id); // 특정 가상 계좌 조회
    void delete(Long id);
}
