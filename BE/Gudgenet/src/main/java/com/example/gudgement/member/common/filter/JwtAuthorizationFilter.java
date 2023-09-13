package com.example.gudgement.member.common.filter;

import com.example.gudgement.member.common.jwt.Authentication;
import com.example.gudgement.member.common.jwt.JwtProvider;
import com.example.gudgement.member.entity.Role;
import com.example.gudgement.member.exception.AuthorizationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.util.PatternMatchUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final String[] notAuthUris = {"/", "/api/member/login", "/api/auth/refresh", "/api/member/create",
            "/swagger-ui/index.html", "/swagger-ui/swagger-initializer.js", "/v3/api-docs/swagger-config", "/v3/api-docs"};
    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        log.info("JwtAuthorizationFilter : 권한 인증 중입니다.");
        log.info(httpServletRequest.getRequestURI());
        if (authListCheck(httpServletRequest.getRequestURI())) {
            log.info("인증 완료. 허가된 접근입니다.");
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }

        if (!isContainToken(httpServletRequest)) {
            httpServletResponse.sendError(HttpStatus.UNAUTHORIZED.value(), "인증 오류");
            return;
        }

        try{
            String token = getToken(httpServletRequest);
            Authentication authentication = getAuthenticateMember(token);
            verifyAuthorization(httpServletRequest.getRequestURI(), authentication);
            log.info("값 : {}", authentication.getEmail());
            filterChain.doFilter(httpServletRequest, httpServletResponse);
        } catch (JsonParseException e){
            log.error("JsonParseException");
            httpServletResponse.sendError(HttpStatus.BAD_REQUEST.value());
        } catch (MalformedJwtException | UnsupportedJwtException e){
            log.error("JwtException");
            httpServletResponse.sendError(HttpStatus.UNAUTHORIZED.value(), "인증 오류");
        } catch (ExpiredJwtException e){
            log.error("JwtTokenExpired");
            httpServletResponse.sendError(HttpStatus.FORBIDDEN.value(), "토큰이 만료 되었습니다");
        } catch (AuthorizationException e){
            log.error("AuthorizationException");
            httpServletResponse.sendError(HttpStatus.UNAUTHORIZED.value(), "권한이 없습니다");
        }
    }

    private boolean authListCheck(String uri) {
        return PatternMatchUtils.simpleMatch(notAuthUris, uri);
    }

    private boolean isContainToken(HttpServletRequest httpServletRequest) {
        String authorization = httpServletRequest.getHeader("Authorization");
        return authorization != null && authorization.startsWith("Bearer ");
    }

    private String getToken(HttpServletRequest request){
        String authorization = request.getHeader("Authorization");
        return authorization.substring(7);
    }
    private Authentication getAuthenticateMember(String token) throws JsonProcessingException {
        Claims claims = jwtProvider.getClaims(token);
        String authenticationJson = claims.get(MemberVerifyFilter.AUTHENTICATE_USER, String.class);
        return objectMapper.readValue(authenticationJson, Authentication.class);
    }

    private void verifyAuthorization(String uri, Authentication authentication){
        if(PatternMatchUtils.simpleMatch("*/admin*",uri) && !authentication.getRole().equals(Role.ROLE_ADMIN)){
            throw new AuthorizationException();
        }
    }
}
