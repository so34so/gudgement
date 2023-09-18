package com.example.gudgement.member.db.dto.request;

import com.example.gudgement.member.db.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberCreateDto {
    private String email;
    private String password;
    private int gender;
    private int age;
    private String nickname;

    public Member toEntity() {
        return Member.builder()
                .email(email)
                .password(password)
                .gender(gender)
                .age(age)
                .nickname(nickname)
                .build();
    }
}
