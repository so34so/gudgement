package com.example.gudgement.mypage.controller;

import com.example.gudgement.member.common.jwt.JwtProvider;
import com.example.gudgement.member.dto.AccessTokenDto;
import com.example.gudgement.member.entity.Member;
import com.example.gudgement.member.exception.BaseErrorException;
import com.example.gudgement.member.exception.ErrorCode;
import com.example.gudgement.member.repository.MemberRepository;
import com.example.gudgement.mypage.dto.ChartDataDto;
import com.example.gudgement.mypage.repository.ChartRepository;
import com.example.gudgement.mypage.service.MyPageService;
import com.google.auth.oauth2.AccessToken;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "마이페이지", description = "마이페이지와 관련된 것들 제공")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mypage")
public class MyPageController {
    private final MyPageService myPageService;
    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;

    @PostMapping("")
    @Operation(summary = "오늘 일자 이번주 소비내역 차트", description = "오늘이 포함되어있는 이번 주 차트")
    public ResponseEntity<ChartDataDto> todayChartData(@RequestBody AccessTokenDto accessTokenDto) {
        Member member = getMember(accessTokenDto);

        return ResponseEntity.ok(myPageService.todayWeekChartData(member.getMemberId()));
    }

    private Member getMember(AccessTokenDto accessToken) {
//        String header = httpServletRequest.getHeader("Authorization");
        String bearer = accessToken.getAccessToken();
        Long memberId = (Long) jwtProvider.getClaims(bearer).get("id");

        Member member = memberRepository.findByMemberId(memberId).orElseThrow(() -> {
            throw new BaseErrorException(ErrorCode.NOT_FOUND_MEMBER);
        });
        return member;
    }
}
