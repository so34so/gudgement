package com.example.gudgement.member.common.jwt;

import com.example.gudgement.exception.BaseErrorException;
import com.example.gudgement.exception.ErrorCode;
import com.example.gudgement.member.dto.AccessTokenDto;
import com.example.gudgement.member.entity.Member;
import com.example.gudgement.member.repository.MemberRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtProvider {

    private final MemberRepository memberRepository;

    // 시크릿 키, 나중에 yml에 넣고 가져오는 형식으로 할 예정
    private static final byte[] bytes = "no_asahck_no_asahck_no_asahck_no_asahck_no_asahck".getBytes();
    private Key key = Keys.hmacShaKeyFor(bytes);
    private final SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

    //
    private String AUTHORIZATION = "Authorization";

    // 토큰 생성, JWS
    public String createJwt(Long id, String email, Date expireDate) {
        HashMap<String, Object> claim = new HashMap<>();

        claim.put("id", id);
        claim.put("email", email);

        return Jwts.builder()
                .setSubject(email)
                .setClaims(claim)
                .setExpiration(expireDate)
                .setIssuedAt(new Date())
                .signWith(key, signatureAlgorithm)
                .compact();
    }

    // 복호화
    public Claims getClaims(String token) {
        return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
    }

    // 토큰 유효성 검증
    public boolean validationToken(String token) {
        try {
            log.info("token 만료 시간 : {}", getClaims(token).getExpiration());
            return !getClaims(token).getExpiration().before(new Date());
        } catch (ExpiredJwtException e) {
            log.error(e.getMessage());
            return false;
        }
    }

    // refreshToken은 보안상 문제 때문에 claims를 포함하지 않는다.
    public JwtToken createToken(Long id, String email) {
        String accessToken = createJwt(id, email, getExpireDateAccessToken());
        String refreshToken = createJwt(id, "Gudgement", getExpireDateRefreshToken());
        return JwtToken.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .refreshTokenExpirationTime(getExpireDateRefreshToken())
                .build();
    }

    // AccessToken
    public Date getExpireDateAccessToken() {
        long expireTimeMils = 1000 * 60 * 60L; // 1 hours
        return new Date(System.currentTimeMillis() + expireTimeMils);
    }

    // RefreshToken
    public Date getExpireDateRefreshToken() {
        long expireTimeMils = 1000 * 60 * 60 * 24 * 60L; // 60 days
        return new Date(System.currentTimeMillis() + expireTimeMils);
    }

    // RefreshToken 검증
    public boolean verifyRefreshToken(String token, Member member) {
        return member.getRefreshToken().equals(token);
    }

    // header에서 토큰 가져오기
    public String getHeaderToken(HttpServletRequest httpServletRequest, String type) {
        if (type.equals("Authorization")) {
            return httpServletRequest.getHeader(AUTHORIZATION);
        } throw new BaseErrorException(ErrorCode.NOT_AUTHORIZATION_TOKEN);
    }

    /*
    Access 토큰 재발급
    refreshToken을 유저에게
    */
    public AccessTokenDto tokenRefresh(String token) {
        log.info("token valid 확인 중...");
        if (!validationToken(token)) {
            throw new BaseErrorException(ErrorCode.REFRESH_TOKEN_EXPIRATION);
        }
        log.info("token valid!");

        Claims claims = getClaims(token);
        Member member = memberRepository.findByMemberId((Long)claims.get("id")).orElseThrow(() -> {
                throw new BaseErrorException(ErrorCode.NOT_FOUND_MEMBER);
            });

        JwtToken jwt = createToken(member.getMemberId(), member.getEmail());
//        memberService.updateRefreshToken(member.getEmail(), jwt.getRefreshToken());

        AccessTokenDto accessTokenDto = new AccessTokenDto(jwt.getAccessToken());

        log.info(accessTokenDto.getAccessToken());
        log.info("정상 리턴");
        return accessTokenDto;
    }

    public Member extractMember (HttpServletRequest httpServletRequest) {
        String header = httpServletRequest.getHeader("Authorization");
        String token = header.substring(7);
        Long memberId = (Long) getClaims(token).get("id");

        Member member = memberRepository.findByMemberId(memberId).orElseThrow(
                () -> new IllegalArgumentException("회원이 존재하지 않습니다."));

        return member;
    }
}
