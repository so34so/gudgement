package com.example.gudgement.account.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class TransactionHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long historyId;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="virtualAccountId", nullable=false)
    private VirtualAccount virtualAccountId;

    //입출금 타입 0:입금 1:출금
    @Column(nullable=false)
    private int type;

    @Column(nullable=false)
    private long amount;

    @Column(nullable=false)
    private String depositSource;

    @Column(nullable=false)
    private String withdrawalDestination;

    @Column(nullable=false)
    private LocalDateTime transactionDate;

    @Builder
    public TransactionHistory(VirtualAccount virtualAccountId, int type, long amount, String depositSource, String withdrawalDestination, LocalDateTime transactionDate){
        this.virtualAccountId = virtualAccountId;
        this.type = type;
        this.amount = amount;
        this.depositSource = depositSource;
        this.withdrawalDestination = withdrawalDestination;
        this.transactionDate = transactionDate;
    }
}
