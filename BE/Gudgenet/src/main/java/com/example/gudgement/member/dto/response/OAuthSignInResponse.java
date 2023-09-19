package com.example.gudgement.member.dto.response;

import com.example.gudgement.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
public class OAuthSignInResponse {
    private Long id;
    private String nickname;
    private String email;
    private String accessToken;
    private String refreshToken;
    private Date refreshTokenExpiration;

    @Builder
    public OAuthSignInResponse(Long id, String nickname, String email, String accessToken, String refreshToken, Date refreshTokenExpiration) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.refreshTokenExpiration = refreshTokenExpiration;
    }

    public Member toMemberEntity() {
        String password = "asdw";
        return Member.builder()
                .id(id)
                .email(email)
                .nickname(nickname)
                .password(password)
                .build();
    }
}
