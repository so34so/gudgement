package com.example.gudgement.member.service;

import com.example.gudgement.member.dto.request.LoginDto;
import com.example.gudgement.member.dto.request.MemberCreateDto;
import com.example.gudgement.member.dto.response.MemberResponseDto;
import com.example.gudgement.member.dto.response.MemberVerifyResponseDto;

public interface MemberService {
    MemberResponseDto memberCreate(MemberCreateDto memberCreateDto);
    MemberVerifyResponseDto verifyMember(LoginDto loginDto);
    MemberResponseDto loadInfo(String email);
    void updateRefreshToken(String email, String refreshToken);
    void updateEmail(Long id, String email);
    void updateNickname(Long id, String nickname);
    boolean validNickname(String nickname);

}
