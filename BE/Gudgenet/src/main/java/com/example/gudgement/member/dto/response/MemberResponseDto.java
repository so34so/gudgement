package com.example.gudgement.member.dto.response;

import com.example.gudgement.member.dto.Rate;
import com.example.gudgement.shop.entity.Item;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class MemberResponseDto {
    private Long memberId;
    private String email;
    private String nickname;
    private boolean emailApprove;
    private boolean nicknameApprove;
    private List<Item> setItems;
    private Long tiggle;
    private Long exp;
    private int level;
    private int pedometer;
    private Rate rate;

    @Builder
    public MemberResponseDto (Long memberId, String email, String nickname, boolean emailApprove,
                              boolean nicknameApprove, Long tiggle, Long exp, List<Item> setItems,
                              int level, int pedometer, Rate rate) {
        this.memberId = memberId;
        this.email = email;
        this.nickname = nickname;
        this.emailApprove = emailApprove;
        this.nicknameApprove = nicknameApprove;
        this.setItems = setItems;
        this.tiggle = tiggle;
        this.exp = exp;
        this.level = level;
        this.pedometer = pedometer;
        this.rate = rate;
    }


}
