package com.example.gudgement.member.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

/*
*   에러 종류별 구분
* */

@Getter
public enum ErrorCode {
    NOT_EXISTS_MEMBER(HttpStatus.BAD_REQUEST, "GM-001", "존재하지 않는 회웝입니다."),
    UNABLE_TO_SEND_EMAIL(HttpStatus.BAD_REQUEST, "M-001", "이메일 송신 에러입니다."),
    MEMBER_NOT_FOUND_EXCEPTION(HttpStatus.NOT_FOUND, "404", "존재하지 않는 회원입니다.");

    private HttpStatus httpStatus;
    private String errorCode;
    private String message;

    ErrorCode(HttpStatus httpStatus, String errorCode, String message) {
        this.httpStatus = httpStatus;
        this.errorCode = errorCode;
        this.message = message;
    }
}
