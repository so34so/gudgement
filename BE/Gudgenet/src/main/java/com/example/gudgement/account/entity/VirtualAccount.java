package com.example.gudgement.account.entity;

import com.example.gudgement.member.entity.Member;
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
    private String accountName;

    @Column(nullable=false)
    private String accountNumber;

    @Column(nullable=false)
    private String accountHolder;

    @Column(nullable = false, length = 50)
    private String email;

    @Column(nullable=false)
    private long balance;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;
    @Builder
    public VirtualAccount(String bankName, String accountName, String accountNumber, String accountHolder, String email, long balance){
        this.bankName = bankName;
        this.accountName = accountName;
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.email = email;
        this.balance = balance;
    }

}
