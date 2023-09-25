package com.example.gudgement.game.repository;

import com.example.gudgement.game.entity.GameRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRoomRepository extends JpaRepository<GameRoom,Long> {

    void deleteByRoomNumber(String roomNumber);

    GameRoom findByRoomNumber(String roomNumber);
}
