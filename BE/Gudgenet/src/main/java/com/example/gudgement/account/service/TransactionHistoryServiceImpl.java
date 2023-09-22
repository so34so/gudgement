package com.example.gudgement.account.service;

import com.example.gudgement.account.dto.TransactionHistoryDto;
import com.example.gudgement.account.entity.TransactionHistory;
import com.example.gudgement.account.entity.VirtualAccount;
import com.example.gudgement.account.repository.TransactionHistoryRepository;
import com.example.gudgement.account.repository.VirtualAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;



@Service
@RequiredArgsConstructor
public class TransactionHistoryServiceImpl implements TransactionHistoryService{

    private final TransactionHistoryRepository transactionRepository;
    private final VirtualAccountRepository virtualAccountRepository;

    @Override
    public TransactionHistoryDto create(TransactionHistoryDto transactionHistoryDto) {
        VirtualAccount virtualAccountId = virtualAccountRepository.findById(transactionHistoryDto.getVirtualAccountId())
                .orElseThrow(() -> new IllegalArgumentException("가상 계좌가 존재하지 않습니다."));

        TransactionHistory history = TransactionHistory.builder()
                .virtualAccountId(virtualAccountId)
                .type(transactionHistoryDto.getType())
                .amount(transactionHistoryDto.getAmount())
                .depositSource(transactionHistoryDto.getDepositSource())
                .withdrawalDestination(transactionHistoryDto.getWithdrawalDestination())
                .transactionDate(LocalDateTime.now()) // 현재 시간을 저장합니다.
                .build();

        TransactionHistory savedHistory = transactionRepository.save(history);
        
        return TransactionHistoryDto.builder()
                .historyId(savedHistory.getHistoryId())
                .virtualAccountId(virtualAccountId.getVirtualAccountId())
                .type(savedHistory.getType())
                .amount(savedHistory.getAmount())
                .depositSource(savedHistory.getDepositSource())
                .withdrawalDestination(savedHistory.getWithdrawalDestination())
                .transactionDate(savedHistory.getTransactionDate()).build();
    }

//
//    @Override
//    public List<TransactionHistoryDto> getAll() {
//        List<TransactionHistory> transactions = this.transactionHistoryRepository.findAll();
//
//        return transactions.stream()
//                .map(transaction -> new TransactionHistoryDto(transaction.getId(),
//                        transaction.getVirtualAccountId().getId(),
//                        transaction.getType(),
//                        transaction.getAmount(),
//                        transaction.getDepositSource(),
//                        transaction.getTransactionDate()))
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public void delete(Long id) {
//        TransactionHistory entity = this.transactionHistoryRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("거래 내역이 존재하지 않습니다. ID: " + id));
//        this.transactionHistoryRepository.delete(entity);
//    }

}
