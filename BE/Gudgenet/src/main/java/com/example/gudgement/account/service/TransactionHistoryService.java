package com.example.gudgement.account.service;

import com.example.gudgement.account.dto.TransactionHistoryDto;

import java.util.List;

public interface TransactionHistoryService {

    TransactionHistoryDto create(TransactionHistoryDto transactionHistoryDto);
    List<TransactionHistoryDto> getAll(); // 모든 거래 내역 목록 조회
    void delete(Long id); // 특정 거래 내역 삭제
}
