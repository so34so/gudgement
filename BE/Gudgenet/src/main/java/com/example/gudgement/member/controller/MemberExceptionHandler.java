package com.example.gudgement.member.controller;


import com.example.gudgement.exception.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class MemberExceptionHandler {

    @ExceptionHandler(value = BaseErrorException.class)
    public ResponseEntity<ErrorResponse> baseException(BaseErrorException e) {
        log.error("[baseException] {} : {}", e.getErrorCode().getErrorCode(), e.getErrorCode().getMessage());
        return ErrorResponse.error(e);
    }

    @ExceptionHandler(value = EmailLogicException.class)
    public ResponseEntity<ErrorResponse> emailException(EmailLogicException e) {
        log.error("[emailException] {} : {}", e.getErrorCode().getErrorCode(), e.getErrorCode().getMessage());
        return ErrorResponse.error(e);
    }

    @ExceptionHandler(value = AuthorizationException.class)
    public ResponseEntity<ErrorResponse> AuthorizationException(AuthorizationException e) {
        log.error("[emailException] {} : {}", e.getErrorCode().getErrorCode(), e.getErrorCode().getMessage());
        return ErrorResponse.error(e);
    }

    @ExceptionHandler(value = AccountException.class)
    public ResponseEntity<ErrorResponse> AccountException(AccountException e) {
        log.error("[emailException] {} : {}", e.getErrorCode().getErrorCode(), e.getErrorCode().getMessage());
        return ErrorResponse.error(e);
    }
}

