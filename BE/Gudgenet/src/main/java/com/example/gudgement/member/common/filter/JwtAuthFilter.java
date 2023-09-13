//package com.example.gudgement.member.common.filter;
//
//import com.example.gudgement.member.common.jwt.Authentication;
//import com.example.gudgement.member.common.jwt.JwtProvider;
//import com.example.gudgement.member.service.MemberService;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//@Slf4j
//@Component
//@RequiredArgsConstructor
//public class JwtAuthFilter extends OncePerRequestFilter {
//    private final JwtProvider jwtProvider;
//    private final ObjectMapper objectMapper;
//    private final MemberService memberService;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        Object attribute = request.getAttribute(MemberVerifyFilter.AUTHENTICATE_USER);
//
//        if (attribute instanceof Authentication) {
//            Authentication authentication = (Authentication) attribute;
//            String authenticateMemberJson = objectMapper.writeValueAsString(authentication);
//            System.out.println(authenticateMemberJson);
//        }
//    }
//}
