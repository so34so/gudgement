package com.example.gudgement.gamechat.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MessageDto {
    Long memberId;
    String message;
}
