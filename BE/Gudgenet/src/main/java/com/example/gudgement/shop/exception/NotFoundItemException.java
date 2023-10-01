package com.example.gudgement.shop.exception;

import com.example.gudgement.member.exception.ErrorCode;
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