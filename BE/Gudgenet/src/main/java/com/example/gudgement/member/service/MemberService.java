package com.example.gudgement.member.service;

import com.example.gudgement.member.db.dto.request.LoginDto;
import com.example.gudgement.member.db.dto.request.MemberCreateDto;
import com.example.gudgement.member.db.dto.response.MemberResponseDto;
import com.example.gudgement.member.db.dto.response.MemberVerifyResponseDto;

public interface MemberService {
    MemberResponseDto memberCreate(MemberCreateDto memberCreateDto);
    MemberVerifyResponseDto verifyMember(LoginDto loginDto);
    MemberResponseDto loadInfo(String email);
    void updateRefreshToken(String email, String refreshToken);
}
