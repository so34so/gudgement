package com.example.gudgement.game.repository;

import com.example.gudgement.game.entity.GameUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameUserRepository extends JpaRepository<GameUser,Long> {

    GameUser findByNickName(String nickname);
}
