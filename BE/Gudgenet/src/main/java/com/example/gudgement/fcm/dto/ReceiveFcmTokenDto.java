package com.example.gudgement.fcm.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReceiveFcmTokenDto {
    private Long id;
    private String firebaseToken;
}
