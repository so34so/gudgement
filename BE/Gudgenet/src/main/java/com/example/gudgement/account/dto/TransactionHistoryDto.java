package com.example.gudgement.account.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class TransactionHistoryDto {

    @Schema(hidden = true)
    private long historyId;

    private long  virtualAccountId;
    //입출금 타입 0:입금 1:출금
    private int type;
    private long amount;
    private String depositSource;
    private String withdrawalDestination;
    private LocalDateTime transactionDate;

    @Builder
    public TransactionHistoryDto(long historyId, long virtualAccountId, int type, long amount, String depositSource, String withdrawalDestination, LocalDateTime transactionDate){
        this.historyId = historyId;
        this.virtualAccountId = virtualAccountId;
        this.type = type;
        this.amount = amount;
        this.depositSource = depositSource;
        this.withdrawalDestination = withdrawalDestination;
        this.transactionDate = transactionDate;
    }
}
