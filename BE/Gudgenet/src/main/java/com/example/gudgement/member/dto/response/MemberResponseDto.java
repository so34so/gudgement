package com.example.gudgement.member.dto.response;

import com.example.gudgement.member.dto.Rate;
import com.example.gudgement.member.entity.Grade;
import com.example.gudgement.shop.entity.Item;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class MemberResponseDto {
    private Long memberId;
    private String email;
    private String nickname;
    private List<Item> setItems;
    private Long tiggle;
    private Long exp;
    private int level;
    private int pedometer;
    private Long monthOverconsumption;
    private Rate rate;
    private Grade grade;

    @Builder
    public MemberResponseDto (Long memberId, String email, String nickname,
                              Long tiggle, Long exp, List<Item> setItems,
                              int level, int pedometer, Long monthOverconsumption,
                              Rate rate, Grade grade) {

        this.memberId = memberId;
        this.email = email;
        this.nickname = nickname;
        this.setItems = setItems;
        this.tiggle = tiggle;
        this.exp = exp;
        this.level = level;
        this.pedometer = pedometer;
        this.monthOverconsumption = monthOverconsumption;
        this.rate = rate;
        this.grade = grade;
    }
}
