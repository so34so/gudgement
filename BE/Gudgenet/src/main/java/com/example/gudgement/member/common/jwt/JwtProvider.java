package com.example.gudgement.member.common.jwt;

import com.example.gudgement.member.db.dto.AccessTokenDto;
import com.example.gudgement.member.db.entity.Member;
import com.example.gudgement.member.db.repository.MemberRepository;
import com.example.gudgement.member.service.MemberService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.NoSuchElementException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtProvider {

    private final MemberService memberService;
    private final MemberRepository memberRepository;

    // 시크릿 키, 나중에 yml에 넣고 가져오는 형식으로 할 예정
    private static final byte[] bytes = "no_asahck_no_asahck_no_asahck_no_asahck_no_asahck".getBytes();
    private final Key key = Keys.hmacShaKeyFor(bytes);
    private final SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

    // 토큰 생성, JWS
    public String createJwt(String email, Date expireDate) {
        return Jwts.builder()
                .setSubject(email)
                .setExpiration(expireDate)
                .setIssuedAt(new Date())
                .signWith(key, signatureAlgorithm)
                .compact();
    }

    public Claims getClaims(String token) {
        return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
    }

    // 토큰 유효성 검증
    public Boolean validationToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            log.error(e.getMessage());
            return false;
        }
    }

    // refreshToken은 보안상 문제 때문에 claims를 포함하지 않는다.
    public JwtToken createToken(String email) {
        String accessToken = createJwt(email, getExpireDateAccessToken());
        String refreshToken = createJwt(email, getExpireDateRefreshToken());

        return JwtToken.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenExpirationTime(new Date())
                .build();
    }

    // AccessToken
    public Date getExpireDateAccessToken() {
        long expireTimeMils = 1000 * 60 * 60L; // 1 hours
        return new Date(System.currentTimeMillis() + expireTimeMils);
    }

    public Date getExpireDateRefreshToken() {
        long expireTimeMils = 1000 * 60 * 60 * 24 * 60L; // 60 days
        return new Date(System.currentTimeMillis() + expireTimeMils);
    }

    // RefreshToken 검증
    public boolean verifyRefreshToken(String token, Member member) {
        return member.getRefreshToken().equals(token);
    }

    // 토큰 재발급
    public AccessTokenDto tokenRefresh(String token) {
        try {
            validationToken(token);
            Member member = memberRepository.findByRefreshToken(token).orElseThrow();
            Authentication authentication = new Authentication(member.getEmail(), member.getRole());
//            String authenticateMemberJson = objectMapper.writeValueAsString(authentication);

            JwtToken jwt = createToken(member.getEmail());
            memberService.updateRefreshToken(member.getEmail(), jwt.getRefreshToken());

//            Date expiration = claims.getExpiration();
//            return !expiration.before(new Date()); // 만료시간이 지났다면 false, 아니면 true;

            AccessTokenDto accessTokenDto = new AccessTokenDto(jwt.getAccessToken());

            return accessTokenDto;

        } catch (IllegalArgumentException | NoSuchElementException | JwtException e) {
                log.error(e.getMessage());
                return null;
        }
    }
}
