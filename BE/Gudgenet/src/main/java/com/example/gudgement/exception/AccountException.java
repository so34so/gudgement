package com.example.gudgement.exception;

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
