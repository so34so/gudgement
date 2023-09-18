package com.example.gudgement.member.controller;

import com.example.gudgement.member.db.auth.OAuthToken;
import com.example.gudgement.member.db.dto.RefreshTokenDto;
import com.example.gudgement.member.db.dto.response.OAuthSignInResponse;
import com.example.gudgement.member.service.OauthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/oauth")
public class OAuthController {

    private final OauthService oauthService;

    @PostMapping("/kakao/callback")
    public ResponseEntity<OAuthSignInResponse> redirect(@RequestParam String code) {
        OAuthSignInResponse oAuthSignInResponse = oauthService.redirect(code);

        return ResponseEntity.ok(oAuthSignInResponse);
    }

    // AccessToken 생성
    @PostMapping("/token")
    public ResponseEntity<OAuthToken> refreshToken(@RequestBody RefreshTokenDto refreshTokenDto) {
        OAuthToken oAuthToken = oauthService.getRefreshToken(refreshTokenDto.getRefreshToken());

        return ResponseEntity.ok(oAuthToken);
    }
}
