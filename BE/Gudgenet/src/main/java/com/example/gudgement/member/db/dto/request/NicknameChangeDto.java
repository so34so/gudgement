package com.example.gudgement.member.db.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class NicknameChangeDto {
    private Long memberId;
    private String nickname;
}
