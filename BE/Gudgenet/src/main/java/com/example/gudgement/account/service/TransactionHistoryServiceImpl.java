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
                // 입력받은 시간을 저장합니다.
                .transactionDate(transactionHistoryDto.getTransactionDate())
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

    @Override
    public List<TransactionHistoryDto> getAll() {
        List<TransactionHistory> transactions = this.transactionRepository.findAll();

        return transactions.stream()
                .map(transaction -> TransactionHistoryDto.builder()
                        .historyId(transaction.getHistoryId())
                        .virtualAccountId(transaction.getVirtualAccountId().getVirtualAccountId())
                        .type(transaction.getType())
                        .amount(transaction.getAmount())
                        .depositSource(transaction.getDepositSource())
                        .withdrawalDestination(transaction.getWithdrawalDestination())
                        .transactionDate(transaction.getTransactionDate()).build())
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        TransactionHistory entity = this.transactionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 거래 내역이 존재하지 않습니다. ID: " + id));
        this.transactionRepository.delete(entity);
    }

}
