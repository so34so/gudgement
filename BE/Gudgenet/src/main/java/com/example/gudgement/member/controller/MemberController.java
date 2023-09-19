package com.example.gudgement.member.controller;

import com.example.gudgement.member.common.jwt.JwtProvider;
import com.example.gudgement.member.dto.AccessTokenDto;
import com.example.gudgement.member.dto.request.EmailDto;
import com.example.gudgement.member.dto.response.MemberResponseDto;
import com.example.gudgement.member.entity.Member;
import com.example.gudgement.member.repository.MemberRepository;
import com.example.gudgement.member.exception.BaseErrorException;
import com.example.gudgement.member.exception.ErrorCode;
import com.example.gudgement.member.service.MailService;
import com.example.gudgement.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Tag(name = "Member", description = "유저 기능 컨트롤러입니다.")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final MailService mailService;
    private final JwtProvider jwtProvider;

    @PostMapping("/token/refresh")
    @Operation(summary = "토큰 재발급", description = "토큰을 재발급합니다. \n 토큰 앞에 항상 'Bearer '를 붙여주세요!")
    public ResponseEntity<AccessTokenDto> tokenRefresh(HttpServletRequest httpServletRequest) {
        String authorizationHeader = httpServletRequest.getHeader("Authorization");
        String refreshToken = null;
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            refreshToken = authorizationHeader.substring(7);
        }

        return ResponseEntity.ok(jwtProvider.tokenRefresh(refreshToken));
    }

    @PostMapping("/email/send")
    @Operation(summary = "인증 메일 요청", description = "기재하는 이메일로 인증을 요청합니다.")
    public ResponseEntity<String> mailSend(@RequestBody EmailDto emailDto) throws Exception {
        String approveNumber = mailService.randomNumber();
        mailService.sendEmail(emailDto.getEmail(), approveNumber);

        return ResponseEntity.ok(approveNumber);
    }

    @PostMapping("/valid/nickname")
    @Operation(summary = "닉네임 중복 확인", description = "중복된 닉네임인지 확인합니다.")
    public ResponseEntity<Boolean> validNickname(@RequestParam String nickname){
        return ResponseEntity.ok(memberService.validNickname(nickname));
    }

    @GetMapping("/loadMyInfo")
    @Operation(summary = "유저 정보", description = "로그인 되어있는 유저의 정보를 확인합니다. \n 토큰 앞에 항상 'Bearer '를 붙여주세요!")
    public ResponseEntity<MemberResponseDto> loadInfo(HttpServletRequest httpServletRequest) {
        System.out.println(httpServletRequest.getHeader("Authorization"));
        Member member = getMember(httpServletRequest);
        System.out.println(member.getEmail());
        return ResponseEntity.ok(memberService.loadInfo(member.getEmail()));
    }

    private Member getMember(HttpServletRequest httpServletRequest) {
        String header = httpServletRequest.getHeader("Authorization");
        String bearer = header.substring(7);
        Long memberId = (Long) jwtProvider.getClaims(bearer).get("id");

        Member member = memberRepository.findByMemberId(memberId).orElseThrow(() -> {
            return new BaseErrorException(ErrorCode.MEMBER_NOT_FOUND_EXCEPTION);
        });
        return member;
    }
}
