package com.example.gudgement.member.service;

import com.example.gudgement.member.db.dto.request.LoginDto;
import com.example.gudgement.member.db.dto.request.MemberCreateDto;
import com.example.gudgement.member.db.dto.response.MemberResponseDto;
import com.example.gudgement.member.db.dto.response.MemberVerifyResponseDto;
import com.example.gudgement.member.db.entity.Member;
import com.example.gudgement.member.db.repository.MemberRepository;
import com.example.gudgement.member.exception.BaseErrorException;
import com.example.gudgement.member.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public MemberResponseDto memberCreate(MemberCreateDto memberCreateDto) {
        Member member = memberRepository.saveAndFlush(Member.builder()
                .email(memberCreateDto.getEmail())
                .gender(memberCreateDto.getGender())
                .age(memberCreateDto.getAge())
                .nickname(memberCreateDto.getNickname())
                .build());

        return MemberResponseDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .approve(member.isApprove())
                .tiggle(member.getTiggle())
                .exp(member.getExp())
                .level(member.getLevel())
                .pedometer(member.getPedometer())
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
                .id(member.getMemberId())
                .isValid(true)
                .role(member.getRole())
                .build();
    }

    @Override
    public MemberResponseDto loadInfo(String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> {
            throw new BaseErrorException(ErrorCode.MEMBER_NOT_FOUND_EXCEPTION);
        });

        return MemberResponseDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .approve(member.isApprove())
                .tiggle(member.getTiggle())
                .level(member.getLevel())
                .exp(member.getExp())
                .pedometer(member.getPedometer())
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

    @Override
    public boolean validNickname(String nickname) {
        Optional<Member> member = memberRepository.findByNickname(nickname);
        if (!member.isPresent()) return true;
        return false;
    }
}
