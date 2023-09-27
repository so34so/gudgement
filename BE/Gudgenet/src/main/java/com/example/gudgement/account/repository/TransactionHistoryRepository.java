package com.example.gudgement.account.repository;

import com.example.gudgement.account.entity.TransactionHistory;
import com.example.gudgement.account.entity.VirtualAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TransactionHistoryRepository extends JpaRepository<TransactionHistory, Long> {
    List<TransactionHistory> findByVirtualAccountIdAndTransactionDateBetweenAndType(VirtualAccount virtualAccount,
                                                                            LocalDateTime startTime,
                                                                            LocalDateTime endTime,
                                                                            int type);



}
