package com.example.gudgement.member.db.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PasswordChangeDto {
    private String email;
    private String password;
    private String newPassword;
}
