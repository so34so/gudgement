package com.example.gudgement.account.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class VirtualAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long virtualAccountId;

    @Column(nullable=false)
    private String bankName;

    @Column(nullable=false)
    private String accountNumber;

    @Column(nullable=false)
    private String accountHolder;

    @Column(nullable=false)
    private long balance;


    @Builder
    public VirtualAccount(String bankName, String accountNumber, String accountHolder, long balance){
        this.bankName = bankName;
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = balance;
    }

}
