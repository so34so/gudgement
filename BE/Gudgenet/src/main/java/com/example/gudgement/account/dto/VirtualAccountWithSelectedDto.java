package com.example.gudgement.account.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VirtualAccountWithSelectedDto {
    private long virtualAccountId;
    private String bankName;
    private String accountName;
    private String accountNumber;
    private String accountHolder;
    private String email;
    private long balance;

    // 새로운 필드 추가.
    boolean isSelected;

// 생성자 등 필요한 메서드들...
}