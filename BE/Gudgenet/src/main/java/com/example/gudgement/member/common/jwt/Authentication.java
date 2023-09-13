package com.example.gudgement.member.common.jwt;

import com.example.gudgement.member.db.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Authentication {
    private String email;
    private Role role;
}
