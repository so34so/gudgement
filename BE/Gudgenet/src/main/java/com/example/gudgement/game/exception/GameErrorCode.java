package com.example.gudgement.game.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

/*
*   에러 종류별 구분
* */

@Getter
public enum GameErrorCode {
    // 아이템
    NOT_FOUND_REDIS(HttpStatus.NOT_FOUND, "I-001", "Redis에 존재하지 않습니다."),
    NOT_FOUND_MYSQL(HttpStatus.NOT_FOUND, "I-001", "MySql에 존재하지 않습니다."),
    ALREADY_ADD_ITEM(HttpStatus.CONFLICT, "I-002", "이미 보유한 아이템입니다."),
    INSUFFICIENT_POINTS(HttpStatus.BAD_REQUEST, "P-001", "티끌이 부족합니다.");

    private HttpStatus httpStatus;
    private String errorCode;
    private String message;

    GameErrorCode(HttpStatus httpStatus, String errorCode, String message) {
        this.httpStatus = httpStatus;
        this.errorCode = errorCode;
        this.message = message;
    }
}
