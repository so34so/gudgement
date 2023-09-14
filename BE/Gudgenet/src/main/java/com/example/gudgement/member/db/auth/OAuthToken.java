package com.example.gudgement.member.db.auth;

import lombok.Getter;

@Getter
public class OAuthToken {
    private String accessToken;
    private String tokenType;
    private String refreshToken;
    private int expiresIn;
    private String scope;
    private int refreshTokenExpiresIn;
}
