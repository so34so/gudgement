package com.example.gudgement.card.dto;

import com.example.gudgement.game.dto.CardInfoDto;
import lombok.*;

import java.util.List;

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
