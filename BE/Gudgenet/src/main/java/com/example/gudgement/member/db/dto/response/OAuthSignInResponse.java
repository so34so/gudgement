package com.example.gudgement.member.db.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
public class OAuthSignInResponse {
    private String id;
    private String nickname;
    private String email;
    private String accessToken;
    private String refreshToken;
    private Date refreshTokenExpiration;

    @Builder
    public OAuthSignInResponse(String id, String nickname, String email, String accessToken, String refreshToken, Date refreshTokenExpiration) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.refreshTokenExpiration = refreshTokenExpiration;
    }

}
