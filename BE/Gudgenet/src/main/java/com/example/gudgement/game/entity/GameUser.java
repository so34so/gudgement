package com.example.gudgement.game.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class GameUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nickName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="room_id")
    private GameRoom gameRoom;

    private Boolean gameAccepted; // null: 아직 선택하지 않음, true: 수락, false: 거부

    @Builder
    public GameUser(Long id, String nickName, GameRoom gameRoom, Boolean gameAccepted){
        this.id = id;
        this.nickName = nickName;
        this.gameRoom = gameRoom;
        this.gameAccepted = gameAccepted;
    }

    public void acceptGame() {
        this.gameAccepted = true;
    }

    public void rejectGame() {
        this.gameAccepted = false;
    }
}
