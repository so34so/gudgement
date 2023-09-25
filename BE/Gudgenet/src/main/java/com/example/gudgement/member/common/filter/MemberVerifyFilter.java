package com.example.gudgement.member.common.filter;

import com.example.gudgement.member.dto.request.LoginDto;
import com.example.gudgement.member.dto.response.MemberVerifyResponseDto;
import com.example.gudgement.member.exception.BaseErrorException;
import com.example.gudgement.member.exception.ErrorCode;
import com.example.gudgement.member.service.MemberService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/*
* 회원 유효성 검증
* */

@Slf4j
@Component
@RequiredArgsConstructor
public class MemberVerifyFilter extends OncePerRequestFilter {
    // 두번 찍히면 getSimpleName;
    public static final String AUTHENTICATE_USER = "authenticateMember";
    private final ObjectMapper objectMapper;
    private final MemberService memberService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("Filter : MemberVerifyFilter");

        try {
            LoginDto loginDto = objectMapper.readValue(request.getReader(), LoginDto.class);
            MemberVerifyResponseDto memberVerifyResponseDto =  memberService.verifyMember(loginDto);
            if (memberVerifyResponseDto.isValid()) {
                request.setAttribute(AUTHENTICATE_USER, memberVerifyResponseDto);
            } else {
                throw new BaseErrorException(ErrorCode.NOT_EXISTS_MEMBER);
            }
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            log.info("Fail Member Verify");
            response.sendError(HttpStatus.BAD_REQUEST.value(), "잘못된 요청입니다.");
        }
    }
}
