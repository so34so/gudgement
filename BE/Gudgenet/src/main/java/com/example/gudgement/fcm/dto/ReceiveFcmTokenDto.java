package com.example.gudgement.fcm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReceiveFcmTokenDto {
    private Long id;
    private String firebaseToken;
}
