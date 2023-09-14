package com.example.gudgement.member.service;

import com.example.gudgement.member.db.auth.KakaoProfile;
import com.example.gudgement.member.db.auth.OAuthToken;

public interface OauthService {
    OAuthToken receiveToken(String code);
    KakaoProfile kakaoMemberInfo(String code);
}
