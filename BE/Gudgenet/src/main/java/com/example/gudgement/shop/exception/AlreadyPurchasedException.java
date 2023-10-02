package com.example.gudgement.shop.exception;

import lombok.Builder;
import lombok.Getter;

@Getter
public class AlreadyPurchasedException extends RuntimeException {
    private ItemErrorCode errorCode;

    @Builder
    public AlreadyPurchasedException(ItemErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
