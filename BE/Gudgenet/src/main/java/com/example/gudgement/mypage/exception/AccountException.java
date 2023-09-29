package com.example.gudgement.mypage.exception;

import com.example.gudgement.member.exception.ErrorCode;
import lombok.Builder;
import lombok.Getter;

@Getter
public class AccountException extends RuntimeException{

    private ErrorCode errorCode;

    @Builder
    public AccountException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
