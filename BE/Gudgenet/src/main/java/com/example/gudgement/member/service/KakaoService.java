package com.example.gudgement.member.service;

import com.example.gudgement.member.common.jwt.JwtProvider;
import com.example.gudgement.member.common.jwt.JwtToken;
import com.example.gudgement.member.db.auth.KakaoProfile;
import com.example.gudgement.member.db.auth.OAuthToken;
import com.example.gudgement.member.db.dto.response.OAuthSignInResponse;
import com.example.gudgement.member.db.entity.Member;
import com.example.gudgement.member.db.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class KakaoService implements OauthService{

    private final WebClient webClient;
    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;

    @Value("${spring.oauth2.client.registration.kakao.authorization-grant-type}")
    private String GRANT_TYPE;

    @Value("${spring.oauth2.client.registration.kakao.client-id}")
    private String CLIENT_ID;

    @Value("${spring.oauth2.client.registration.kakao.redirect-uri}")
    private String REDIRECT_URI;

    @Value("${spring.oauth2.client.registration.kakao.client-secret}")
    private String CLIENT_SECRET;

    @Value("${spring.oauth2.client.registration.kakao.token-uri}")
    private String TOKEN_URI;

    @Value("${spring.oauth2.client.registration.kakao.user-info-uri}")
    private String USER_INFO_URI;

    @Override
    @Transactional
    public OAuthSignInResponse redirect(String code) {
        OAuthToken oAuthToken = getToken(code);
        KakaoProfile kakaoProfile = getMemberInfo(oAuthToken.getAccessToken());

        Long id = kakaoProfile.getId();
        String nickname = kakaoProfile.getKakao_account().getProfile().getNickname();
        Optional<Member> member = memberRepository.findByMemberId(id);

        String email;
        if (member.isPresent()) {
            email = member.get().getEmail();
        } else {
            email = "Gudgement";
        }

        JwtToken jwtToken = jwtProvider.createToken(id, email);

        OAuthSignInResponse oAuthSignInResponse = OAuthSignInResponse.builder()
                .id(id)
                .nickname(nickname)
                .email(email)
                .accessToken(jwtToken.getAccessToken())
                .refreshToken(jwtToken.getRefreshToken())
                .refreshTokenExpiration(jwtToken.getRefreshTokenExpirationTime())
                .build();

        // 회원 존재 여부에 따라 다르게 저장
        Member saveMember;
        if (!memberRepository.existsByMemberId(kakaoProfile.getId())) {
            saveMember = oAuthSignInResponse.toMemberEntity();
        } else {
            saveMember = memberRepository.findByMemberId(id).orElseThrow(
                    () -> new IllegalArgumentException("회원이 존재하지 않습니다."));
            saveMember.updateRefreshToken(jwtToken.getRefreshToken());
        }

        memberRepository.save(saveMember);

        return oAuthSignInResponse;
    }

    @Override
    public KakaoProfile getMemberInfo(String accessToken) {
        KakaoProfile profile = webClient.mutate()
                .baseUrl(USER_INFO_URI)
                .build()
                .get()
                .uri("/v2/user/me")
                .headers(h -> h.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(KakaoProfile.class)
                .block();

//        try {
//            profile = objectMapper.readValue(resourceProfileResponse.getBody(), KakaoProfile.class);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
        System.out.println(profile.getConnected_at());
        System.out.println(profile.getKakao_account().getEmail());
        System.out.println(profile.getId());
        System.out.println(profile.getProperties().getNickname());
//
        return profile;
    }

    @Override
    public OAuthToken getRefreshToken(String refreshToken) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "refresh_token");
        params.add("client_id", CLIENT_ID);
        params.add("refresh_token", refreshToken);
        params.add("client_secret", CLIENT_SECRET);

        return webClient.mutate()
                .baseUrl(TOKEN_URI)
                .build()
                .post()
                .uri("/oauth/token")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData(params))
                .retrieve()
                .bodyToMono(OAuthToken.class)
                .block();

    }

    @Override
    public OAuthToken getToken(String code) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", GRANT_TYPE);
        params.add("redirect_uri", REDIRECT_URI);
        params.add("client_id", CLIENT_ID);
        params.add("code", code);
//        params.add("client_secret", CLIENT_SECRET);

        WebClient wc = WebClient.create(TOKEN_URI);

        log.info("토큰을 요청하는 중...");
        // POST 방식으로 key-value 데이터 요청
        OAuthToken oauthTokenRes = wc.post()
                .uri(TOKEN_URI)
                .body(BodyInserters.fromFormData(params))
                .header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
                .retrieve()
                .bodyToMono(OAuthToken.class).block();

        System.out.println(oauthTokenRes.getTokenType());
        System.out.println(oauthTokenRes.getAccessToken());
        log.info("토큰 발급 완료!");

        return oauthTokenRes;
    }
}
