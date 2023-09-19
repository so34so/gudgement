package com.example.gudgement.member.service;

import com.example.gudgement.member.db.auth.KakaoProfile;
import com.example.gudgement.member.db.auth.OAuthToken;
import com.example.gudgement.member.db.dto.response.OAuthSignInResponse;

public interface OauthService {
    OAuthSignInResponse redirect(String code);
    OAuthToken getToken(String code);
    KakaoProfile getMemberInfo(String accessToken);
    OAuthToken getRefreshToken(String refreshToken);
}
