package com.example.gudgement.member.exception;

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

    public ErrorResponse(ErrorCode errorCode) {
        this.httpStatus = errorCode.getHttpStatus();
        this.code = errorCode.getErrorCode();
        this.message = errorCode.getMessage();
    }

    public static ResponseEntity<ErrorResponse> error(BaseErrorException e) {
        return ResponseEntity.status(e.getErrorCode().getHttpStatus())
                .body(ErrorResponse.builder()
                        .httpStatus(e.getErrorCode().getHttpStatus())
                        .code(e.getErrorCode().getErrorCode())
                        .message(e.getErrorCode().getMessage())
                        .build());
    }

    public static ResponseEntity<ErrorResponse> error(EmailLogicException e) {
        return ResponseEntity.status(e.getErrorCode().getHttpStatus())
                .body(ErrorResponse.builder()
                        .httpStatus(e.getErrorCode().getHttpStatus())
                        .code(e.getErrorCode().getErrorCode())
                        .message(e.getErrorCode().getMessage())
                        .build());
    }

    public static ResponseEntity<ErrorResponse> error(AuthorizationException e) {
        return ResponseEntity.status(e.getErrorCode().getHttpStatus())
                .body(ErrorResponse.builder()
                        .httpStatus(e.getErrorCode().getHttpStatus())
                        .code(e.getErrorCode().getErrorCode())
                        .message(e.getErrorCode().getMessage())
                        .build());
    }
}
