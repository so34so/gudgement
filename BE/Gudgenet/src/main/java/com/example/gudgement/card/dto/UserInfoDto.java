package com.example.gudgement.card.dto;

import java.util.List;

import com.example.gudgement.game.dto.CardInfoDto;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserInfoDto {
    private String nickname;
    private List<CardInfoDto> cards;

    @Builder
    public UserInfoDto(String nickname, List<CardInfoDto> cards){
        this.nickname = nickname;
        this.cards = cards;
    }
}
