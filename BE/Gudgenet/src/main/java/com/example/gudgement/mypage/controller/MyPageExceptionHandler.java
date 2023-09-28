package com.example.gudgement.mypage.controller;


import com.example.gudgement.member.exception.AuthorizationException;
import com.example.gudgement.member.exception.BaseErrorException;
import com.example.gudgement.member.exception.EmailLogicException;
import com.example.gudgement.member.exception.ErrorResponse;
import com.example.gudgement.mypage.exception.AccountException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class MyPageExceptionHandler {

    @ExceptionHandler(value = BaseErrorException.class)
    public ResponseEntity<ErrorResponse> baseException(BaseErrorException e) {
        log.error("[baseException] {} : {}", e.getErrorCode().getErrorCode(), e.getErrorCode().getMessage());
        return ErrorResponse.error(e);
    }

    @ExceptionHandler(value = AccountException.class)
    public ResponseEntity<ErrorResponse> AccountException(AccountException e) {
        log.error("[emailException] {} : {}", e.getErrorCode().getErrorCode(), e.getErrorCode().getMessage());
        return ErrorResponse.error(e);
    }

    @ExceptionHandler(value = AuthorizationException.class)
    public ResponseEntity<ErrorResponse> AuthorizationException(AuthorizationException e) {
        log.error("[emailException] {} : {}", e.getErrorCode().getErrorCode(), e.getErrorCode().getMessage());
        return ErrorResponse.error(e);
    }
}

