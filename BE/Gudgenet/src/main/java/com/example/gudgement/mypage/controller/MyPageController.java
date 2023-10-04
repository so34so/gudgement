package com.example.gudgement.mypage.controller;

import com.example.gudgement.member.common.jwt.JwtProvider;
import com.example.gudgement.member.dto.AccessTokenDto;
import com.example.gudgement.member.entity.Member;
import com.example.gudgement.member.exception.BaseErrorException;
import com.example.gudgement.member.exception.ErrorCode;
import com.example.gudgement.member.repository.MemberRepository;
import com.example.gudgement.mypage.dto.ChartDataDto;
import com.example.gudgement.mypage.service.MyPageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

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
    public ResponseEntity<ChartDataDto> todayChartData(HttpServletRequest httpServletRequest,
                                                       @RequestHeader("Authorization") String jwt) {
        Member member = getMember(httpServletRequest);
        return ResponseEntity.ok(myPageService.todayWeekChartData(member.getMemberId()));
    }

    @PostMapping("/{date}")
    @Operation(summary = "특정 일자 주간 소비내역 차트", description = "형식 : 2023-09-22 으로 넣어주세요")
    public ResponseEntity<ChartDataDto> toDateChartData(@PathVariable(name = "date") String date,
                                                        HttpServletRequest httpServletRequest,
                                                        @RequestHeader("Authorization") String jwt) {
        Member member = getMember(httpServletRequest);

        return ResponseEntity.ok(myPageService.toDateWeekChartData(member.getMemberId(), date));
    }

    @PutMapping("/update/{monthOverConsumption}")
    @Operation(summary = "월 과소비 기준 설정", description = "Path에 추가해서 post하시면 됩니다.")
    public void updateMonthOverConsumption(@PathVariable("monthOverConsumption") Long monthOverConsumption,
                                           HttpServletRequest httpServletRequest,
                                           @RequestHeader("Authorization") String jwt) {

        Member member = getMember(httpServletRequest);
        myPageService.updateOverConsumption(member, monthOverConsumption);
    }

    private Member getMember(HttpServletRequest httpServletRequest) {
        String header = httpServletRequest.getHeader("Authorization");
        log.info("날아온 토큰 : " + header);
        String bearer = header.substring(7);
        log.info("Bearer 제거 : " + bearer);
        
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
}
