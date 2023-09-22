package com.example.gudgement.member.common.filter;

import com.example.gudgement.member.common.jwt.JwtProvider;
import com.example.gudgement.member.dto.response.MemberVerifyResponseDto;
import com.example.gudgement.member.entity.Member;
import com.example.gudgement.member.exception.BaseErrorException;
import com.example.gudgement.member.exception.ErrorCode;
import com.example.gudgement.member.repository.MemberRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtRefreshAuthFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("Filter : JWTFilter");

        MemberVerifyResponseDto attribute = (MemberVerifyResponseDto) request.getAttribute(MemberVerifyFilter.AUTHENTICATE_USER);
        String refreshToken = jwtProvider.getHeaderToken(request, "Authorization");

        String requestURI = request.getRequestURI();

        if (refreshToken != null && refreshToken.startsWith("Bearer ")) {
            refreshToken = refreshToken.substring(7);
        } else {
            throw new BaseErrorException(ErrorCode.NOT_AUTHORIZATION_TOKEN);
        }

        // refreshToken 값이 있음
        if (refreshToken != null) {
            // 유효성 검사
            if (jwtProvider.validationToken(refreshToken)) {
                log.info("RefreshToken 유효함. : {}", refreshToken);
                filterChain.doFilter(request, response);

            // refreshToken 만료
            } else {
                log.info("AccessToken 만료. : {}", refreshToken);
                jwtExceptionHandler(response, "Access");
            }
            filterChain.doFilter(request, response);

        } else {
            jwtExceptionHandler(response, "null");
        }

        // 토큰 유효성 검증
        if (jwtProvider.validationToken(refreshToken)) {
            log.info("RefreshToken 유효함. : {}", refreshToken);
            // 토큰 ID와 실제 요청 ID 검증
            Claims claims = jwtProvider.getClaims(refreshToken);
            if (attribute.getId() != (Long) claims.get("id")) {
                throw new BaseErrorException(ErrorCode.NOT_SAME_TOKEN_AND_MEMBER);
            }
            log.info("요청 ID 일치함. : {}", claims.get("id"));

            Member member = memberRepository.findByMemberId((Long) claims.get("id")).orElseThrow(
                    () -> new BaseErrorException(ErrorCode.NOT_FOUND_MEMBER)
            );

            // 요청 RefreshToken ID와 DB RefreshToken의 동일성 검증
            if (jwtProvider.verifyRefreshToken(refreshToken, member)) {
                jwtProvider.tokenRefresh(refreshToken);
            }
            log.info("요청 RefreshToken 일치함. : {}", refreshToken);
            filterChain.doFilter(request, response);
        }
    }

    public void jwtExceptionHandler(HttpServletResponse response, String Token){
        response.setStatus(400);
        response.setContentType("application/json");

        if (Token.equals("Access")) {
            try{
                String json = new ObjectMapper().writeValueAsString(new BaseErrorException(ErrorCode.ACCESS_TOKEN_EXPIRATION));
                response.getWriter().write(json);
            } catch (Exception e){
                log.error(e.getMessage());
            }
        } else if (Token.equals("Refresh")) {
            try{
                String json = new ObjectMapper().writeValueAsString(new BaseErrorException(ErrorCode.REFRESH_TOKEN_EXPIRATION));
                response.getWriter().write(json);
            } catch (Exception e){
                log.error(e.getMessage());
            }
        } else {
            try {
                String json = new ObjectMapper().writeValueAsString(new BaseErrorException(ErrorCode.NOT_EXIST_TOKEN));
                response.getWriter().write(json);
            } catch (Exception e){
                log.error(e.getMessage());
            }
        }

    }
}
