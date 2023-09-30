package com.example.gudgement.game.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserTiggleDto {
    private String nickname;
    private Long tiggle;

    @Builder
    public UserTiggleDto(String nickname, Long tiggle){
        this.nickname = nickname;
        this.tiggle = tiggle;
    }
}
