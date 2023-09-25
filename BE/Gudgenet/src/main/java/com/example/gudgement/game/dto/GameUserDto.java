package com.example.gudgement.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GameUserDto {

    private Long id;
    private String nickName;
    private Long gameRoomId;  // Assuming we only need the ID of the GameRoom.
    private Boolean gameAccepted;

    @Builder
    public GameUserDto(Long id, String nickName, Long gameRoomId, Boolean gameAccepted) {
        this.id = id;
        this.nickName = nickName;
        this.gameRoomId = gameRoomId;  // We're assuming that we only need to transfer the ID of the GameRoom.
        this.gameAccepted = gameAccepted;
    }
}
