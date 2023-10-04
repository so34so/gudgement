package com.example.gudgement.exception;

import lombok.Builder;
import lombok.Getter;

@Getter
public class InsufficientPointsException extends RuntimeException {
    private ErrorCode errorCode;

    @Builder
    public InsufficientPointsException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
