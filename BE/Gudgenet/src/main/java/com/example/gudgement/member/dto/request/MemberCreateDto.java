package com.example.gudgement.member.dto.request;

import com.example.gudgement.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberCreateDto {
    private String email;
    private int gender;
    private int age;
    private String nickname;

    public Member toEntity() {
        return Member.builder()
                .email(email)
                .gender(gender)
                .age(age)
                .nickname(nickname)
                .build();
    }
}
