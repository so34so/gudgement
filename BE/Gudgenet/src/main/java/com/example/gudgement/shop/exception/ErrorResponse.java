package com.example.gudgement.shop.exception;

import com.example.gudgement.member.exception.AuthorizationException;
import com.example.gudgement.member.exception.BaseErrorException;
import com.example.gudgement.member.exception.EmailLogicException;
import com.example.gudgement.member.exception.ErrorCode;
import com.example.gudgement.mypage.exception.AccountException;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@Builder
@RequiredArgsConstructor
public class ErrorResponse {
    private final HttpStatus httpStatus;
    private final String code;
    private final String message;

    @Builder
    public ErrorResponse(ItemErrorCode errorCode) {
        this.httpStatus = errorCode.getHttpStatus();
        this.code = errorCode.getErrorCode();
        this.message = errorCode.getMessage();
    }

    public static ResponseEntity<ErrorResponse> error(AlreadyPurchasedException e) {
        return ResponseEntity.status(e.getErrorCode().getHttpStatus())
                .body(ErrorResponse.builder()
                        .httpStatus(e.getErrorCode().getHttpStatus())
                        .code(e.getErrorCode().getErrorCode())
                        .message(e.getErrorCode().getMessage())
                        .build());
    }

    public static ResponseEntity<ErrorResponse> error(InsufficientPointsException e) {
        return ResponseEntity.status(e.getErrorCode().getHttpStatus())
                .body(ErrorResponse.builder()
                        .httpStatus(e.getErrorCode().getHttpStatus())
                        .code(e.getErrorCode().getErrorCode())
                        .message(e.getErrorCode().getMessage())
                        .build());
    }

    public static ResponseEntity<ErrorResponse> error(NotFoundItemException e) {
        return ResponseEntity.status(e.getErrorCode().getHttpStatus())
                .body(ErrorResponse.builder()
                        .httpStatus(e.getErrorCode().getHttpStatus())
                        .code(e.getErrorCode().getErrorCode())
                        .message(e.getErrorCode().getMessage())
                        .build());
    }

}
