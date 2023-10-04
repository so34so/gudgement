package com.example.gudgement.exception;

import lombok.Builder;
import lombok.Getter;

@Getter
public class AlreadyPurchasedException extends RuntimeException {
    private ErrorCode errorCode;

    @Builder
    public AlreadyPurchasedException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
