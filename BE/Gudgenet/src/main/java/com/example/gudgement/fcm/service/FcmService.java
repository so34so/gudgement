package com.example.gudgement.fcm.service;

import com.example.gudgement.fcm.dto.FcmNotificationResponseDto;
import com.example.gudgement.fcm.exception.FcmErrorException;

import java.io.IOException;

public interface FcmService {
    String sendNotificationToChannel (FcmNotificationResponseDto requestDto) throws FcmErrorException;
    void setAccessToken(Long memberId, String firebaseToken) throws IOException;
}
