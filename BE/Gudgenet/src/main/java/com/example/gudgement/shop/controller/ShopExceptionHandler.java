package com.example.gudgement.shop.controller;

import com.example.gudgement.exception.AlreadyPurchasedException;
import com.example.gudgement.exception.ErrorResponse;
import com.example.gudgement.exception.InsufficientPointsException;
import com.example.gudgement.exception.NotFoundItemException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ShopExceptionHandler {

    @ExceptionHandler(value = InsufficientPointsException.class)
    public ResponseEntity<ErrorResponse> handleInsufficientPoints(InsufficientPointsException e) {
        log.error("[handleInsufficientPoints] {} : {}", e.getErrorCode().getErrorCode(), e.getErrorCode().getMessage());
        return ErrorResponse.error(e);
    }

    @ExceptionHandler(value = NotFoundItemException.class)
    public ResponseEntity<ErrorResponse> handleNotFoundItem(NotFoundItemException e) {
        log.error("[handleNotFoundItem] {} : {}", e.getErrorCode().getErrorCode(), e.getErrorCode().getMessage());
        return ErrorResponse.error(e);
    }

    @ExceptionHandler(value = AlreadyPurchasedException.class)
    public ResponseEntity<ErrorResponse> handleAlreadyPurchased(AlreadyPurchasedException e) {
        log.error("[handleAlreadyPurchased] {} : {}", e.getErrorCode().getErrorCode(), e.getErrorCode().getMessage());
        return ErrorResponse.error(e);
    }
}
