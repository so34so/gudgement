package com.example.gudgement.member.service;

import com.example.gudgement.member.auth.KakaoProfile;
import com.example.gudgement.member.auth.OAuthToken;
import com.example.gudgement.member.dto.response.OAuthSignInResponse;

public interface OauthService {
    OAuthSignInResponse redirect(String code);
    OAuthToken getToken(String code);
    KakaoProfile getMemberInfo(String accessToken);
    OAuthToken getRefreshToken(String refreshToken);
}
