package com.example.gudgement.shop.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

/*
*   에러 종류별 구분
* */

@Getter
public enum ItemErrorCode {
    // 아이템
    NOT_FOUND_ITEM(HttpStatus.NOT_FOUND, "I-001", "존재하지 않는 아이템입니다."),
    ALREADY_ADD_ITEM(HttpStatus.CONFLICT, "I-002", "이미 보유한 아이템입니다."),
    INSUFFICIENT_POINTS(HttpStatus.BAD_REQUEST, "P-001", "티끌이 부족합니다.");

    private HttpStatus httpStatus;
    private String errorCode;
    private String message;

    ItemErrorCode(HttpStatus httpStatus, String errorCode, String message) {
        this.httpStatus = httpStatus;
        this.errorCode = errorCode;
        this.message = message;
    }
}
