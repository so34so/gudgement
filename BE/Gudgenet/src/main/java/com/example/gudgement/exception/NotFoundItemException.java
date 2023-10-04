package com.example.gudgement.exception;

import lombok.Builder;
import lombok.Getter;

@Getter
public class NotFoundItemException extends RuntimeException {

    private ItemErrorCode errorCode;

    @Builder
    public NotFoundItemException(ItemErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}