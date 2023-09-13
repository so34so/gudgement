package com.example.gudgement.member.db.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RefreshTokenDto {
    private String email;
    private String refreshToken;
}
