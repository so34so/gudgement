package com.example.gudgement.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberResponseDto {
    private Long memberId;
    private String email;
    private String nickname;
    private boolean emailApprove;
    private boolean nicknameApprove;
//    private List<Item> setItems;
    private Long tiggle;
    private Long exp;
    private int level;
    private int pedometer;

    @Builder
    public MemberResponseDto (Long memberId, String email, String nickname, boolean emailApprove,
                              boolean nicknameApprove, Long tiggle, Long exp, int level, int pedometer) {
        this.memberId = memberId;
        this.email = email;
        this.nickname = nickname;
        this.emailApprove = emailApprove;
        this.nicknameApprove = nicknameApprove;
//        this.setItems = setItems;
        this.tiggle = tiggle;
        this.exp = exp;
        this.level = level;
        this.pedometer = pedometer;
    }


}
