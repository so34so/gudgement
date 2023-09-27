package com.example.gudgement.game.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class GameUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nickName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="gameRoom")
    private GameRoom gameRoom;

    private boolean result;

    @Builder
    public GameUser(Long id, String nickName, GameRoom gameRoom, boolean result){
        this.id = id;
        this.nickName = nickName;
        this.gameRoom = gameRoom;
        this.result = result;
    }

}
