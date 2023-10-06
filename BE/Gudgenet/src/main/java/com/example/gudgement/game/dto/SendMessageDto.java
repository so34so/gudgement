package com.example.gudgement.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class SendMessageDto {
    String nickname;
    String message;

    @Builder
    public SendMessageDto(String nickname, String message){
        this.nickname = nickname;
        this.message = message;
    }
}
