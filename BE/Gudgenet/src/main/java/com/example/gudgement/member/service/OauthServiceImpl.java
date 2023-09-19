package com.example.gudgement.member.service;

import com.example.gudgement.member.common.jwt.JwtProvider;
import com.example.gudgement.member.common.jwt.JwtToken;
import com.example.gudgement.member.db.auth.OAuthToken;
import com.example.gudgement.member.db.dto.AccessTokenDto;
import com.example.gudgement.member.db.dto.response.OAuthSignInResponse;
import com.example.gudgement.member.db.repository.MemberRepository;
import com.example.gudgement.member.exception.BaseErrorException;
import com.example.gudgement.member.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OauthServiceImpl {
    private final KakaoService kakaoService;
    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;

    @Transactional
    public OAuthSignInResponse redirect(String code) {
        return kakaoService.redirect(code);
    }


    // Access만 줄건지, 걍 다 줄건지...?
    public AccessTokenDto refreshToken(String refreshToken) {
        Long memberId = (Long) jwtProvider.getClaims(refreshToken).get("id");
        String memberEmail = (String) jwtProvider.getClaims(refreshToken).get("email");

        // 해당 유저가 존재하는지 확인
        if (!memberRepository.existsByMemberIdAndEmail(memberId, memberEmail)) {
            throw new BaseErrorException(ErrorCode.NOT_EXISTS_MEMBER);
        }

        OAuthToken oAuthToken = kakaoService.getRefreshToken(refreshToken);
        JwtToken token = jwtProvider.createToken(memberId, memberEmail);

        return AccessTokenDto.builder()
                .accessToken(token.getAccessToken())
                .build();
    }
}
