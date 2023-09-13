package com.example.gudgement.member.service;

import com.example.gudgement.member.common.PasswordEncoder;
import com.example.gudgement.member.db.dto.request.LoginDto;
import com.example.gudgement.member.db.dto.request.MemberCreateDto;
import com.example.gudgement.member.db.dto.response.MemberResponseDto;
import com.example.gudgement.member.db.dto.response.MemberVerifyResponseDto;
import com.example.gudgement.member.db.entity.Member;
import com.example.gudgement.member.db.repository.MemberRepository;
import com.example.gudgement.member.common.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public MemberResponseDto login(LoginDto loginDto) {
        return null;
    }

    @Override
    public void logout() {

    }

    @Override
    @Transactional
    public MemberResponseDto memberCreate(MemberCreateDto memberCreateDto) {
        Member member = memberRepository.saveAndFlush(Member.builder()
                .email(memberCreateDto.getEmail())
                .name(memberCreateDto.getName())
                .password(passwordEncoder.encrypt(memberCreateDto.getEmail(), memberCreateDto.getPassword()))
                .gender(memberCreateDto.getGender())
                .age(memberCreateDto.getAge())
                .nickname(memberCreateDto.getNickname())
                .build());

        return MemberResponseDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .tiggle(member.getTiggle())
                .exp(member.getExp())
                .level(member.getLevel())
                .build();
    }

    @Override
    @Transactional
    public MemberVerifyResponseDto verifyMember(LoginDto loginDto) {
        Member member = memberRepository.findByEmail(loginDto.getEmail()).orElseThrow();

        if (member == null) {
            return MemberVerifyResponseDto.builder()
                    .isValid(false)
                    .build();
        }

        return MemberVerifyResponseDto.builder()
                .isValid(true)
                .role(member.getRole())
                .build();
    }

    @Override
    public MemberResponseDto loadInfo(String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> {
            return new IllegalArgumentException("일치하는 정보가 없습니다.");
        });

        return MemberResponseDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .tiggle(member.getTiggle())
                .level(member.getLevel())
                .exp(member.getExp())
                .build();
    }

    @Override
    @Transactional
    public void updateRefreshToken(String email, String refreshToken) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> {
            return new IllegalArgumentException("회원이 존재하지 않습니다.");
        });
        member.updateRefreshToken(refreshToken);
    }
}
