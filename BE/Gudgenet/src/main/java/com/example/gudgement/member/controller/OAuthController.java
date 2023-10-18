package com.example.gudgement.member.controller;

import com.example.gudgement.member.dto.AccessTokenDto;
import com.example.gudgement.member.dto.RefreshTokenDto;
import com.example.gudgement.member.dto.response.OAuthSignInResponse;
import com.example.gudgement.member.service.OauthServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/")
@Tag(name = "Kakao", description = "카카오 로그인 기능입니다.")
public class OAuthController {

    private final OauthServiceImpl oauthService;

    @PostMapping("")
    @Operation(summary = "카카오 로그인", description = "카카오 로그인 or 회원가입")
    public ResponseEntity<OAuthSignInResponse> redirect(@RequestParam String code) {
        OAuthSignInResponse oAuthSignInResponse = oauthService.redirect(code);

        return ResponseEntity.ok(oAuthSignInResponse);
    }

    // AccessToken 생성, 근데 로그인 한번 하고나면 안써서 상관없음
    @PostMapping("/token")
    @Operation(summary = "토큰 발급", description = "카카오 토큰 재발급")
    public ResponseEntity<AccessTokenDto> refreshToken(@RequestBody RefreshTokenDto refreshTokenDto) {
        AccessTokenDto accessTokenDto = oauthService.refreshToken(refreshTokenDto.getRefreshToken());

        return ResponseEntity.ok(accessTokenDto);
    }
}
