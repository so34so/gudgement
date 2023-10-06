package com.example.gudgement.exception;

import lombok.Builder;
import lombok.Getter;

@Getter
public class NotFoundItemException extends RuntimeException {

    private ErrorCode errorCode;

    @Builder
    public NotFoundItemException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}