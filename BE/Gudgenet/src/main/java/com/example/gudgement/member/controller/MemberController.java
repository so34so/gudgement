package com.example.gudgement.member.controller;

import com.example.gudgement.member.common.jwt.JwtProvider;
import com.example.gudgement.member.db.dto.AccessTokenDto;
import com.example.gudgement.member.db.dto.RefreshTokenDto;
import com.example.gudgement.member.db.dto.request.LoginDto;
import com.example.gudgement.member.db.dto.request.MemberCreateDto;
import com.example.gudgement.member.db.dto.response.MemberResponseDto;
import com.example.gudgement.member.service.MemberService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@Tag(name = "User", description = "유저 기능 컨트롤러입니다.")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {
    private final MemberService memberService;
    private final JwtProvider jwtProvider;

    @PostMapping("/create")
    public ResponseEntity<MemberResponseDto> createMember(@RequestBody @Valid MemberCreateDto memberCreateDto) {
        MemberResponseDto memberResponseDto = memberService.memberCreate(memberCreateDto);
        return ResponseEntity.ok()
                .body(memberResponseDto);
    }

    @PostMapping("/login")
    public ResponseEntity<AccessTokenDto> login(@RequestBody LoginDto loginDto, HttpServletResponse response) {
        MemberResponseDto memberResponseDto = memberService.login(loginDto);
        return null;
    }

    @PostMapping("/refresh/token")
    public ResponseEntity<AccessTokenDto> tokenRefresh(@RequestBody RefreshTokenDto refreshTokenDto) {
        AccessTokenDto accessTokendto = jwtProvider.tokenRefresh(refreshTokenDto.getRefreshToken());
        return ResponseEntity.ok(accessTokendto);
    }
}
