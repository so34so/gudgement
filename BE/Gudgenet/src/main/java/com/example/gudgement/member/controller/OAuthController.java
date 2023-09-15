package com.example.gudgement.member.controller;

import com.example.gudgement.member.db.auth.KakaoProfile;
import com.example.gudgement.member.service.OauthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OAuthController {

    private final OauthService oauthService;

    @GetMapping("/login/auth/kakao/callback/{code}")
    public ResponseEntity<KakaoProfile> receiveToken(@PathVariable String code) {
        KakaoProfile profile = oauthService.kakaoMemberInfo(code);

        return ResponseEntity.ok(profile);
    }

}
