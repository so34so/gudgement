package com.example.gudgement.fcm.exception;

import com.example.gudgement.member.exception.ErrorCode;
import lombok.Builder;
import lombok.Getter;

@Getter
public class FcmErrorException extends Exception {

    private ErrorCode errorCode;

    @Builder
    public FcmErrorException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
