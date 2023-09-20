package com.example.gudgement.account.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class VirtualAccountDto {
    private long virtualAccountId;
    private String bankName;
    private String accountNumber;
    private String accountHolder;
    private long balance;

    @Builder
    public VirtualAccountDto(long virtualAccountId, String bankName,
                             String accountNumber, String accountHolder,
                             long balance) {
        this.virtualAccountId = virtualAccountId;
        this.bankName = bankName;
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = balance;
    }
}
