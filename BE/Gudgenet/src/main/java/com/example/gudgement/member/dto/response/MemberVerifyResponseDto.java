package com.example.gudgement.member.dto.response;

import com.example.gudgement.member.entity.Role;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberVerifyResponseDto {
    private Long id;
    private boolean isValid;
}
