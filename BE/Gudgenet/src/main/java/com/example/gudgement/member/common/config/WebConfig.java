package com.example.gudgement.member.common.config;

import com.example.gudgement.member.common.filter.JwtAccessAuthFilter;
import com.example.gudgement.member.common.filter.MemberVerifyFilter;
import com.example.gudgement.member.common.jwt.JwtProvider;
import com.example.gudgement.member.repository.MemberRepository;
import com.example.gudgement.member.service.MemberService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public FilterRegistrationBean memberVerifyFilter(ObjectMapper mapper, MemberService memberService) {
        FilterRegistrationBean<OncePerRequestFilter> filterFilterRegistrationBean = new FilterRegistrationBean<>();
        filterFilterRegistrationBean.setFilter(new MemberVerifyFilter(mapper, memberService));
        filterFilterRegistrationBean.setOrder(1);
        filterFilterRegistrationBean.addUrlPatterns("/dontUse");
        return filterFilterRegistrationBean;
    }

    @Bean
    public FilterRegistrationBean JwtAuthorizationFilter(JwtProvider jwtProvider) {
        FilterRegistrationBean<OncePerRequestFilter> filterFilterRegistrationBean = new FilterRegistrationBean<>();

        filterFilterRegistrationBean.setFilter(new JwtAccessAuthFilter(jwtProvider));
        filterFilterRegistrationBean.setOrder(2);
        filterFilterRegistrationBean.addUrlPatterns("/dontUse");

        return filterFilterRegistrationBean;
    }
}
