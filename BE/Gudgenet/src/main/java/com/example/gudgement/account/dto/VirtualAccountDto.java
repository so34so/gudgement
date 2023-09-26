package com.example.gudgement.account.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class VirtualAccountDto {

    @Schema(hidden = true)
    private long virtualAccountId;

    private String bankName;
    private String accountName;
    private String accountNumber;
    private String accountHolder;
    private String email;
    private long balance;

    @Builder
    public VirtualAccountDto(long virtualAccountId, String bankName, String accountName,
                             String accountNumber, String accountHolder,
                             String email, long balance) {
        this.virtualAccountId = virtualAccountId;
        this.bankName = bankName;
        this.accountName = accountName;
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.email = email;
        this.balance = balance;
    }
}
