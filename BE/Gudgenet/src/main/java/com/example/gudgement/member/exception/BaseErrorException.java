package com.example.gudgement.member.exception;

import lombok.Getter;

@Getter
public class BaseErrorException extends RuntimeException {

    private ErrorCode errorCode;

    public BaseErrorException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
