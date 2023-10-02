package com.example.gudgement.game.exception;

import com.example.gudgement.member.exception.ErrorCode;
import lombok.Builder;
import lombok.Getter;

@Getter
public class BaseErrorException extends RuntimeException {

    private GameErrorCode errorCode;

    @Builder
    public BaseErrorException(GameErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
