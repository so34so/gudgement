package com.example.gudgement.shop.exception;

import lombok.Builder;
import lombok.Getter;

@Getter
public class InsufficientPointsException extends RuntimeException {
    private ItemErrorCode errorCode;

    @Builder
    public InsufficientPointsException(ItemErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
