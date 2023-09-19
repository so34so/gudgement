package com.example.gudgement.member.db.dto.response;

import com.example.gudgement.member.db.entity.Role;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberVerifyResponseDto {
    private Long id;
    private boolean isValid;
    private Role role;
}
