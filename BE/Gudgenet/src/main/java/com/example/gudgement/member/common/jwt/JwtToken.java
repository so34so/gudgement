package com.example.gudgement.member.common.jwt;

import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
@Builder
public class JwtToken {
    private String accessToken;
    private String refreshToken;
    private Date refreshTokenExpirationTime;
}
