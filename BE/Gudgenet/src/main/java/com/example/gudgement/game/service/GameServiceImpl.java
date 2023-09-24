package com.example.gudgement.game.service;

import com.example.gudgement.game.dto.GameUserDto;
import com.example.gudgement.game.entity.GameRoom;
import com.example.gudgement.game.entity.GameUser;
import com.example.gudgement.game.repository.GameRoomRepository;
import com.example.gudgement.game.repository.GameUserRepository;
import com.example.gudgement.match.dto.MatchDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService{

    private final SimpMessagingTemplate messagingTemplate;
    private final GameRoomRepository gameRoomRepository;
    private final GameUserRepository gameUserRepository;

    public String createGameRoom() {
        // UUID를 이용해 랜덤한 방 번호 생성
        Random random = new Random();

        int roomNumber = random.nextInt(9000000) + 1000000; // Generates a random number between 100000 and 999999.
        return Integer.toString(roomNumber);

        // WebSocket 연결 생성 (Spring에서 제공하는 WebSocket API 사용)
        // 실제 구현은 WebSocket 설정과 관련된 복잡한 부분이 있으므로 여기서는 생략
    }

    // GameServiceImpl 클래스에 추가...

    @Transactional
    public void acceptGame(String roomNumber, String nickname) {
        // Find the user by nickname.
        GameUser gameUser = gameUserRepository.findByNickName(nickname);

        if (gameUser == null) {
            throw new IllegalArgumentException("Invalid nickname: " + nickname);
        }

        // Call the method to accept the game.
        gameUser.acceptGame();

        // No need to call save() here. The transaction will automatically commit
        // the changes when the service method returns.

        if (allUsersAccepted(roomNumber)) {
            messagingTemplate.convertAndSend("/topic/game/" + roomNumber + "/start", "All users accepted.");
        }
    }


    @Transactional
    public void rejectGame(String roomNumber, String nickname) {
        // Find the user by nickname.
        GameUser gameUser = gameUserRepository.findByNickName(nickname);

        if (gameUser == null) {
            throw new IllegalArgumentException("Invalid nickname: " + nickname);
        }

        // Call the method to reject the game.
        gameUser.rejectGame();

        messagingTemplate.convertAndSend("/topic/game/" + roomNumber + "/reject", nickname + " rejected.");

        // Delete the room.
        gameRoomRepository.deleteByRoomNumber(roomNumber);  // 게임 방 삭제 로직 추가.
    }


    private boolean allUsersAccepted(String roomNumber) {
        GameRoom gameRoom = gameRoomRepository.findByRoomNumber(roomNumber);
        for (GameUser user : gameRoom.getUsers()) {
            if (!Boolean.TRUE.equals(user.getGameAccepted())) {  // 수락하지 않은 유저가 있는지 체크.
                return false;
            }
        }
        return true;
    }

    @Transactional
    public void addUserToRoom(String roomNumber, String nickname) {
        // Find the game room by room number.
        GameRoom gameRoom = gameRoomRepository.findByRoomNumber(roomNumber);

        if (gameRoom == null) {
            throw new IllegalArgumentException("Invalid room number: " + roomNumber);
        }

        // Create a new user and add it to the game room.
        GameUser user = GameUser.builder()
                .nickName(nickname)
                .gameAccepted(null)
                .gameRoom(gameRoom)
                .build();

        // Save the user.
        gameUserRepository.save(user);

        // Add the user to the game room's users list directly.
        gameRoom.getUsers().add(user);
    }

}
