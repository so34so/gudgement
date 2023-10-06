//package com.example.gudgement.member.common.config;
//
//import com.example.gudgement.member.common.filter.JwtAccessAuthFilter;
//import com.example.gudgement.member.common.filter.JwtRefreshAuthFilter;
//import com.example.gudgement.member.common.jwt.JwtProvider;
//import org.springframework.boot.web.servlet.FilterRegistrationBean;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.filter.OncePerRequestFilter;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//
//    @Bean
//    public FilterRegistrationBean JwtAccessAuthorizationFilter(JwtProvider jwtProvider) {
//        FilterRegistrationBean<OncePerRequestFilter> filterFilterRegistrationBean = new FilterRegistrationBean<>();
//        filterFilterRegistrationBean.setFilter(new JwtAccessAuthFilter(jwtProvider));
//        filterFilterRegistrationBean.setOrder(1);
//        filterFilterRegistrationBean.addUrlPatterns("/api/**");
//
//        return filterFilterRegistrationBean;
//    }
//
//    @Bean
//    public FilterRegistrationBean JwtRefreshAuthorizationFilter(JwtProvider jwtProvider) {
//        FilterRegistrationBean<OncePerRequestFilter> filterFilterRegistrationBean = new FilterRegistrationBean<>();
//        filterFilterRegistrationBean.setFilter(new JwtRefreshAuthFilter(jwtProvider));
//        filterFilterRegistrationBean.setOrder(2);
//        filterFilterRegistrationBean.addUrlPatterns("/api/member/token/refresh");
//
//        return filterFilterRegistrationBean;
//    }
//}
