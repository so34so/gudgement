package com.example.gudgement.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class Rate {
    private long totalAmount;
    private Double rate;
    private long balance;

    @Builder
    public Rate(long totalAmount, Double rate, long balance) {
        this.totalAmount = totalAmount;
        this.rate = rate;
        this.balance = balance;
    }
}
