package com.example.gudgement.member.service;

import com.example.gudgement.member.dto.Rate;
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
        Member member = memberRepository.findByMemberId(loginDto.getId()).orElseThrow(() -> {
                    throw new BaseErrorException(ErrorCode.NOT_FOUND_MEMBER);
                });

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

        Rate memberRate = memberRating(member);

        log.info("이메일 체크 ===================================");
        if (member.getEmail().equals("Gudgement") && !member.isEmailApprove()) {
            throw new EmailLogicException(ErrorCode.NOT_AUTHORIZATION_EMAIL);
            }
        log.info("인증된 이메일 =================================");

        log.info("닉네임 설정 판별 ==============================");
        if (!member.isNicknameApprove()) {
            throw new BaseErrorException(ErrorCode.NOT_REGISTRATION_NICKNAME);
        }
        log.info("닉네임 설정 확인 ==============================");

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
                .rate(memberRate)
                .build();
    }

    // 잔액 갱신 중요
    // 개인 소비 금액에 따른 레이팅 판별 기능
    @Override
    public Rate memberRating(Member member) {
/*      미구현
        int total = 0;
        Long pay_count = accountRepository.findByAccountId(member.getAccount).stream()
                .map(account -> if (account.payType.equal("출금") total += account.payment;)
                .count;

        log.info("싱글플레이 유무 점검 중...")
        if (member.getGameRooms().getSinglePlay()) {
            double payRate = total / member.targetPayment;
            System.out.println(payRate);

            return Rate.builder()
                .payment(total)
                .rate(payRate)
                .build();
        }
 */
        
        return Rate.builder().build();
    }

    @Override
    @Transactional
    public void updateRefreshToken(String email, String refreshToken) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() ->
             new BaseErrorException(ErrorCode.NOT_FOUND_MEMBER)
        );
        member.updateRefreshToken(refreshToken);
        memberRepository.save(member);
    }

    @Override
    @Transactional
    public void updateEmail(Long id, String email) {
        Member member = memberRepository.findByMemberId(id).orElseThrow(() ->
                new BaseErrorException(ErrorCode.NOT_FOUND_MEMBER));

        member.updateEmail(email);
        memberRepository.save(member);

    }

    @Override
    @Transactional
    public void updateNickname(Long id, String nickname) {
        Member member = memberRepository.findByMemberId(id).orElseThrow(() ->{
                throw new BaseErrorException(ErrorCode.NOT_FOUND_MEMBER);
        });

        member.updateNickname(nickname);
        memberRepository.save(member);
    }

    @Override
    public boolean validNickname(String nickname) {
        return !memberRepository.existsByNickname(nickname);
    }


}
