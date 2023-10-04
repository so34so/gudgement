package com.example.gudgement.fcm.service;

import com.example.gudgement.exception.FcmErrorException;
import com.example.gudgement.fcm.dto.FcmNotificationResponseDto;

import java.io.IOException;

public interface FcmService {
    String sendNotificationToChannel (FcmNotificationResponseDto requestDto) throws FcmErrorException;
    void setAccessToken(Long memberId, String firebaseToken) throws IOException;
}
