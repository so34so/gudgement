package com.example.gudgement.exception;

import lombok.Getter;

@Getter
public class EmailLogicException extends RuntimeException {

    private ErrorCode errorCode;

    public EmailLogicException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
