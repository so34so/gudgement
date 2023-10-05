package com.example.gudgement.member.controller;

import com.example.gudgement.exception.BaseErrorException;
import com.example.gudgement.exception.ErrorCode;
import com.example.gudgement.member.common.jwt.JwtProvider;
import com.example.gudgement.member.dto.AccessTokenDto;
import com.example.gudgement.member.dto.request.EmailDto;
import com.example.gudgement.member.dto.request.LoginDto;
import com.example.gudgement.member.dto.response.MemberResponseDto;
import com.example.gudgement.member.entity.Member;
import com.example.gudgement.member.repository.MemberRepository;
import com.example.gudgement.member.service.MailService;
import com.example.gudgement.member.service.MemberService;
import io.jsonwebtoken.ExpiredJwtException;
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
    public ResponseEntity<AccessTokenDto> tokenRefresh(HttpServletRequest httpServletRequest,
                                                       @RequestBody LoginDto loginDto) {

        String authorizationHeader = httpServletRequest.getHeader("Authorization");
        String refreshToken = null;
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            refreshToken = authorizationHeader.substring(7);
            log.info("refreshToken : {}", refreshToken);
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
    public ResponseEntity<Boolean> validNickname(@RequestParam(name = "nickname") String nickname){
        return ResponseEntity.ok(memberService.validNickname(nickname));
    }

    @PostMapping("/update/nickname")
    @Operation(summary = "닉네임 등록", description = "닉네임을 변경합니다.")
    public void updateNickname(@RequestParam(name = "id") Long id, @RequestParam(name = "nickname") String nickname) {

        memberService.updateNickname(id, nickname);
        memberService.initializeProgressAndInventory(id);
    }

    @PostMapping("update/email")
    @Operation(summary = "이메일 등록", description = "인증한 이메일을 등록합니다.")
    public void updateEmail(@RequestBody EmailDto emailDto) {

        memberService.updateEmail(emailDto.getId(), emailDto.getEmail());
    }

    @GetMapping("/loadMyInfo")
    @Operation(summary = "유저 정보", description = "로그인 되어있는 유저의 정보를 확인합니다. \n 토큰 앞에 항상 'Bearer '를 붙여주세요!")
    public ResponseEntity<MemberResponseDto> loadInfo(HttpServletRequest httpServletRequest) {
        Member member = getMember(httpServletRequest);
        return ResponseEntity.ok(memberService.loadInfo(member.getMemberId()));
    }

    private Member getMember(HttpServletRequest httpServletRequest) {
        String header = httpServletRequest.getHeader("Authorization");
        String bearer = header.substring(7);

        Long memberId;
        try {
            memberId = (Long) jwtProvider.getClaims(bearer).get("id");
        } catch (ExpiredJwtException e) {
            throw new BaseErrorException(ErrorCode.ACCESS_TOKEN_EXPIRATION);
        }

        Member member = memberRepository.findByMemberId(memberId).orElseThrow(() -> {
            throw new BaseErrorException(ErrorCode.NOT_FOUND_MEMBER);
        });
        return member;
    }

    @PutMapping("/update/grade")
    @Operation(summary = "유저 등급 결정", description = "이전 달 소비 내역기준으로 산정 \n" +
            "[100 이하] : Gold\n            " + "100~200 Silver\n            " + "300이상 Bronze")
    private void updateGrade(HttpServletRequest httpServletRequest) {
        memberService.updateGrade(getMember(httpServletRequest));
    }

    @PostMapping("/pedometer")
    @Operation(summary = "만보걷기 완료", description = "member의 tiggle값에 300을 더합니다.")
    public ResponseEntity<String> pedometerClear(@RequestParam(name = "memberId") Long id) {
        memberService.addTiggle(id);
        memberService.addProgress(id);
        return ResponseEntity.ok("만보걷기 완료");
    }

    @DeleteMapping("/delete/{email}")
    @Operation(summary = "멤버 탈퇴", description = "해당 이메일을 가지고 있는 회원을 탈퇴시킵니다.")
    public void deleteMember(@PathVariable(name = "email") String email) {
        memberService.deleteMember(email);
    }
}
