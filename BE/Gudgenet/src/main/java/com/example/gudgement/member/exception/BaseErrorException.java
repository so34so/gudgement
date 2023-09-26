package com.example.gudgement.member.exception;

import lombok.Builder;
import lombok.Getter;

@Getter
public class BaseErrorException extends RuntimeException {

    private ErrorCode errorCode;

    @Builder
    public BaseErrorException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
