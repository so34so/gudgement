package com.example.gudgement.account.service;

import com.example.gudgement.account.dto.VirtualAccountDto;
import java.util.List;

public interface VirtualAccountService {
    VirtualAccountDto create(VirtualAccountDto virtualAccountDto);
    List<VirtualAccountDto> getAll();
    VirtualAccountDto getById(Long id);
    void delete(Long id);
}
