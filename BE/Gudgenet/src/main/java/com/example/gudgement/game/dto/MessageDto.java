package com.example.gudgement.game.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MessageDto {
    String roomNumber;
    String nickName;
    String message;
}
