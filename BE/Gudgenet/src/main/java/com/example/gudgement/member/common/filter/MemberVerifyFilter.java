package com.example.gudgement.member.common.filter;

import com.example.gudgement.member.common.jwt.Authentication;
import com.example.gudgement.member.db.dto.request.LoginDto;
import com.example.gudgement.member.db.dto.response.MemberVerifyResponseDto;
import com.example.gudgement.member.service.MemberService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private Logger logger = LoggerFactory.getLogger(MemberVerifyFilter.class);
    public static final String AUTHENTICATE_USER = "authenticateMember";
    private final ObjectMapper objectMapper;
    private final MemberService memberService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        logger.info("Filter : JwtAuthFilter");

        if((request.getMethod().equals("POST"))) {
            try {
                LoginDto loginDto = objectMapper.readValue(request.getReader(), LoginDto.class);
                MemberVerifyResponseDto memberVerifyResponseDto =  memberService.verifyMember(loginDto);
                if (memberVerifyResponseDto.isValid()) {
                    request.setAttribute(AUTHENTICATE_USER, new Authentication(loginDto.getEmail(), memberVerifyResponseDto.getRole()) {
                    });
                } else {
                    throw new IllegalArgumentException("유효하지 않은 회원입니다.");
                }
                filterChain.doFilter(request, response);
            } catch (Exception e) {
                logger.info("Fail Member Verify");
                response.sendError(HttpStatus.BAD_REQUEST.value(), "잘못된 요청입니다.");
                filterChain.doFilter(request, response);
            }
        }

    }
}
