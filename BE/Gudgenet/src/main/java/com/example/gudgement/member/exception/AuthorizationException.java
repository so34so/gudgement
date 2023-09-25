package com.example.gudgement.member.exception;

import lombok.Getter;

@Getter
public class AuthorizationException extends RuntimeException{

    private ErrorCode errorCode;

    public AuthorizationException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
