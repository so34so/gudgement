package com.example.gudgement.fcm.exception;

import com.google.firebase.ErrorCode;
import com.google.firebase.FirebaseException;
import lombok.Getter;

@Getter
public class FcmErrorException extends FirebaseException {




    public FcmErrorException(ErrorCode errorCode, String message, Throwable cause) {
        super(errorCode, message, cause);
    }
}
