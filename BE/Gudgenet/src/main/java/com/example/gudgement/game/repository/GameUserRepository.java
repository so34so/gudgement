package com.example.gudgement.game.repository;

import com.example.gudgement.game.entity.GameUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface GameUserRepository extends JpaRepository<GameUser,Long> {

    GameUser findByNickName(String nickname);

    List<GameUser> findAllByInvitedAtBeforeAndGameAcceptedIsNull(LocalDateTime localDateTime);
}
