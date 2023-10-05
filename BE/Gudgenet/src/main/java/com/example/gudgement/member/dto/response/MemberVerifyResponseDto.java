package com.example.gudgement.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberVerifyResponseDto {
    private Long id;
    private String email;
    private boolean isValid;
}
