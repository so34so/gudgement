package com.example.gudgement.fcm.service;

import com.example.gudgement.fcm.dto.FcmNotificationRequestDto;
import com.example.gudgement.fcm.exception.FcmErrorException;

import java.io.IOException;

public interface FcmService {
    String sendNotificationDetail (FcmNotificationRequestDto requestDto) throws FcmErrorException;
    void setAccessToken(Long memberId, String firebaseToken) throws IOException;
}
