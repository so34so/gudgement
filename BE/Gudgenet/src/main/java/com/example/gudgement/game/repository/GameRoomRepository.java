package com.example.gudgement.game.repository;

import com.example.gudgement.game.entity.GameRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GameRoomRepository extends JpaRepository<GameRoom,Long> {


    Optional<GameRoom> findByRoomNumber(String roomNumber);
}
