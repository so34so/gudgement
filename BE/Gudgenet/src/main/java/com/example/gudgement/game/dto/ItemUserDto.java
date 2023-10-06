package com.example.gudgement.game.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ItemUserDto {

    private String roomNumber;
    private String nickname;
    private Long invenId;

    @Builder
    ItemUserDto(String roomNumber, String nickname, Long invenId){
        this.roomNumber =roomNumber;
        this.nickname = nickname;
        this.invenId = invenId;
    }

}
