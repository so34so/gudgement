package com.example.gudgement.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class Rate {
    private int payment;
    private double rate;
    private Long balance;

    @Builder
    public Rate(int payment, double rate, Long balance) {
        this.payment = payment;
        this.rate = rate;
        this.balance = balance;
    }
}
