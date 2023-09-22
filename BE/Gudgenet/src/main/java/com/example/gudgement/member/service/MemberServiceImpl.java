package com.example.gudgement.member.service;

import com.example.gudgement.member.dto.request.LoginDto;
import com.example.gudgement.member.dto.request.MemberCreateDto;
import com.example.gudgement.member.dto.response.MemberResponseDto;
import com.example.gudgement.member.dto.response.MemberVerifyResponseDto;
import com.example.gudgement.member.entity.Member;
import com.example.gudgement.member.exception.EmailLogicException;
import com.example.gudgement.member.repository.MemberRepository;
import com.example.gudgement.member.exception.BaseErrorException;
import com.example.gudgement.member.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.NonUniqueResultException;
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
                .emailApprove(member.isEmailApprove())
                .nicknameApprove(member.isNicknameApprove())
                .tiggle(member.getTiggle())
                .exp(member.getExp())
                .level(member.getLevel())
                .pedometer(member.getPedometer())
                .build();
    }

    @Override
    @Transactional
    public MemberVerifyResponseDto verifyMember(LoginDto loginDto) {
        Member member = memberRepository.findByMemberId(loginDto.getId()).orElseThrow();

        if (member == null) {
            return MemberVerifyResponseDto.builder()
                    .isValid(false)
                    .build();
        }
        return MemberVerifyResponseDto.builder()
                .id(member.getMemberId())
                .isValid(true)
                .build();
    }

    @Override
    public MemberResponseDto loadInfo(Long id) {
        Member member = memberRepository.findByMemberId(id).orElseThrow(() -> {
            throw new BaseErrorException(ErrorCode.NOT_FOUND_MEMBER);
        });

        log.info("이메일 체크 ===================================");
        if (member.getEmail().equals("Gudgement") && !member.isEmailApprove()) {
            throw new EmailLogicException(ErrorCode.NOT_AUTHORIZATION_EMAIL);
            }
        log.info("인증된 이메일 =================================");

        return MemberResponseDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .emailApprove(member.isEmailApprove())
                .nicknameApprove(member.isNicknameApprove())
                .tiggle(member.getTiggle())
                .level(member.getLevel())
                .exp(member.getExp())
                .pedometer(member.getPedometer())
                .build();
    }

    @Override
    @Transactional
    public void updateRefreshToken(String email, String refreshToken) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() ->
             new BaseErrorException(ErrorCode.NOT_FOUND_MEMBER)
        );
        member.updateRefreshToken(refreshToken);
    }

    @Override
    @Transactional
    public void updateEmail(Long id, String email) {
        Member member = memberRepository.findByMemberId(id).orElseThrow(() ->
                new BaseErrorException(ErrorCode.NOT_FOUND_MEMBER));

        member.updateEmail(email);
    }

    @Override
    @Transactional
    public void updateNickname(Long id, String nickname) {
        Member member = memberRepository.findByMemberId(id).orElseThrow(() ->
                new BaseErrorException(ErrorCode.NOT_FOUND_MEMBER));

        member.updateNickname(nickname);
    }

    @Override
    public boolean validNickname(String nickname) {
        return !memberRepository.existsByNickname(nickname);
    }
}
