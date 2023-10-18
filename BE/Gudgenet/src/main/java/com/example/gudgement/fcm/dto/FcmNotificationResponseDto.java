package com.example.gudgement.fcm.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FcmNotificationResponseDto {
    private Long memberId;
    private String channel;
    private String title;
    private String content;

    @Builder
    public FcmNotificationResponseDto(Long memberId, String channel,String title, String content) {
        this.channel = channel;
        this.memberId = memberId;
        this.title = title;
        this.content = content;
    }
}
