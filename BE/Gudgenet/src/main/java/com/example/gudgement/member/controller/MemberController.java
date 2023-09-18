package com.example.gudgement.member.controller;

import com.example.gudgement.member.common.jwt.JwtProvider;
import com.example.gudgement.member.db.dto.AccessTokenDto;
import com.example.gudgement.member.db.dto.RefreshTokenDto;
import com.example.gudgement.member.db.dto.request.LoginDto;
import com.example.gudgement.member.db.dto.request.MemberCreateDto;
import com.example.gudgement.member.db.dto.response.MemberResponseDto;
import com.example.gudgement.member.service.MailService;
import com.example.gudgement.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.CustomLog;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@Tag(name = "Member", description = "유저 기능 컨트롤러입니다.")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {
    private final MemberService memberService;
    private final MailService mailService;
    private final JwtProvider jwtProvider;

    @PostMapping("/token/refresh")
    @Operation(summary = "토큰 재발급", description = "토큰을 재발급합니다.")
    public ResponseEntity<AccessTokenDto> tokenRefresh(@RequestBody RefreshTokenDto refreshTokenDto) {
        AccessTokenDto accessTokendto = jwtProvider.tokenRefresh(refreshTokenDto.getRefreshToken());
        return ResponseEntity.ok(accessTokendto);
    }

    @PostMapping("email/send")
    @Operation(summary = "인증 메일 요청", description = "기재하는 이메일로 인증을 요청합니다.")
    public String mailSend(@RequestBody String email) throws Exception {
        String approveNumber = mailService.randomNumber();
        mailService.sendEmail(email, approveNumber);

        return approveNumber;
    }
}
