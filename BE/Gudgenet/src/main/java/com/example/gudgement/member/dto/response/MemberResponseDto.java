package com.example.gudgement.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberResponseDto {
    private Long memberId;
    private String email;
    private String nickname;
//    private List<Item> setItems;
    private Long tiggle;
    private Long exp;
    private int level;

    @Builder
    public MemberResponseDto (Long memberId, String email, String nickname, Long tiggle, Long exp, int level) {
        this.memberId = memberId;
        this.email = email;
        this.nickname = nickname;
//        this.setItems = setItems;
        this.tiggle = tiggle;
        this.exp = exp;
        this.level = level;
    }


}
