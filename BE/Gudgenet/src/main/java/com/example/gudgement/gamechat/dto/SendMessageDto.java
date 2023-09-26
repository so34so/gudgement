package com.example.gudgement.gamechat.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class SendMessageDto {
    Long sender;
    String nickname;
    String message;

    @Builder
    public SendMessageDto(Long sender, String nickname, String message){
        this.sender = sender;
        this.nickname = nickname;
        this.message = message;
    }
}
