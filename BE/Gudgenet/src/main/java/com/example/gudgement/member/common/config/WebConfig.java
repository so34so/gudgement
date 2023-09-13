package com.example.gudgement.member.common.config;

import com.example.gudgement.member.common.filter.JwtAuthFilter;
import com.example.gudgement.member.common.filter.MemberVerifyFilter;
import com.example.gudgement.member.common.jwt.JwtProvider;
import com.example.gudgement.member.service.MemberService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.OncePerRequestFilter;

@Configuration
public class WebConfig {

    @Bean
    public FilterRegistrationBean memberVerifyFilter(ObjectMapper mapper, MemberService memberService) {
        FilterRegistrationBean<OncePerRequestFilter> filterFilterRegistrationBean = new FilterRegistrationBean<>();
        filterFilterRegistrationBean.setFilter(new MemberVerifyFilter(mapper, memberService));
        filterFilterRegistrationBean.setOrder(1);
        filterFilterRegistrationBean.addUrlPatterns("/api/member/login");
        return filterFilterRegistrationBean;
    }

    @Bean
    public FilterRegistrationBean JwtAuthFilter(JwtProvider jwtProvider, ObjectMapper mapper, MemberService memberService) {
        FilterRegistrationBean<OncePerRequestFilter> filterFilterRegistrationBean = new FilterRegistrationBean<>();
        filterFilterRegistrationBean.setFilter(new JwtAuthFilter(jwtProvider, mapper, memberService));
        filterFilterRegistrationBean.setOrder(2);
        filterFilterRegistrationBean.addUrlPatterns("/api/member/login");
        return filterFilterRegistrationBean;
    }
}
