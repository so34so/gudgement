//package com.example.gudgement.member.service;
//
//import com.example.gudgement.member.db.auth.KakaoProfile;
//import com.example.gudgement.member.db.auth.OAuthToken;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.Objects;
//
//@Slf4j
//@Service
//@RequiredArgsConstructor
//public class OauthService1  {
//
//    private final ObjectMapper objectMapper;
//
//    private final static RestTemplate rt = new RestTemplate();
//
//    public KakaoProfile kakaoMemberInfo(String code) {
//        OAuthToken oAuthToken = receiveToken(code);
//
//        HttpHeaders headersForRequestProfile = new HttpHeaders();
//        headersForRequestProfile.add("Authorization", "Bearer " + Objects.requireNonNull(oAuthToken).getAccessToken());
//        headersForRequestProfile.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
//
//        HttpEntity<MultiValueMap<String, String>> kakaoResourceProfileRequest = new HttpEntity<>(headersForRequestProfile);
//
//        // Http 요청하기 - POST 방식으로 - 그리고 response 변수의 응답을 받음.
//        ResponseEntity<String> resourceProfileResponse = rt.exchange(
//                "https://kapi.kakao.com/v2/user/me",
//                HttpMethod.POST,
//                kakaoResourceProfileRequest,
//                String.class
//        );
//
//        KakaoProfile profile = null;
//
//        try {
//            profile = objectMapper.readValue(resourceProfileResponse.getBody(), KakaoProfile.class);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//
//        return profile;
//    }
//
//    public OAuthToken receiveToken(String code) {
//        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
//        params.add("grant_type", "authorization_code");
//        params.add("client_id", "4cd45261b839373b375e0766220b3428");
//        params.add("redirect_uri", "http:/login/auth/kakao/callback");
//        params.add("code", code);
//        params.add("client", "IxXm1l2rPYcLXojdZmL9MXr8bmTkEmPQ");
//
//        // HttpHeader 생성
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.add("Content-type",
//                "application/x-www-form-urlencoded;charset=utf-8");
//
//        HttpEntity<MultiValueMap<String, String>> tokenRequest = new HttpEntity<>(params, httpHeaders);
//
//        log.info("토큰을 요청하는 중...");
//        // POST 방식으로 key-value 데이터 요청
//        ResponseEntity<String> accessTokenRes = rt.exchange(
//                "http://kauth.kakao.com/oauth/token",
//                HttpMethod.POST,
//                tokenRequest,
//                String.class
//        );
//        System.out.println(accessTokenRes.getBody());
//        log.info("토큰 발급 완료!");
//
//
//        // JSON 응답을 객체로
//        OAuthToken oauthToken = null;
//        try {
//            oauthToken = objectMapper.readValue(accessTokenRes.getBody(), OAuthToken.class);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//
//        return oauthToken;
//    }
//}
