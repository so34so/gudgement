package com.example.gudgement.game.repository;

import com.example.gudgement.game.entity.GameUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface GameUserRepository extends JpaRepository<GameUser,Long> {

    Optional<GameUser> findByNickNameAndGameRoom_RoomNumber(String nickName, String roomNumber);


}
