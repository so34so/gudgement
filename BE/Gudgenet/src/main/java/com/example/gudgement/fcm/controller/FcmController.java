package com.example.gudgement.fcm.controller;

import com.example.gudgement.fcm.dto.FcmNotificationResponseDto;
import com.example.gudgement.fcm.dto.ReceiveFcmTokenDto;
import com.example.gudgement.fcm.exception.FcmErrorException;
import com.example.gudgement.fcm.service.FcmService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Tag(name = "FireBase Notification", description = "앱 푸시 알림 관련 controller 입니다.")
@RestController
@RequestMapping("/fcm/")
@RequiredArgsConstructor
public class FcmController {

    private final FcmService fcmService;

    @Operation(summary = "([테스트용] 단일 회원 알림 보내기")
    @PostMapping("member/send")
    public String sendNotification(@RequestBody FcmNotificationResponseDto requestDto) throws FcmErrorException {
        return fcmService.sendNotificationDetail(requestDto);
    }

    @Operation(summary = "firebase 토큰 받기")
    @PutMapping("token")
    public void setToken(@RequestBody ReceiveFcmTokenDto requestDto) throws IOException {
        fcmService.setAccessToken(requestDto.getId(), requestDto.getFirebaseToken());
    }
}

