package com.example.gudgement.game.service;

import com.example.gudgement.game.dto.GameUserDto;
import com.example.gudgement.game.entity.GameRoom;
import com.example.gudgement.game.entity.GameUser;
import com.example.gudgement.game.repository.GameRoomRepository;
import com.example.gudgement.game.repository.GameUserRepository;
import com.example.gudgement.match.dto.MatchDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService{

    private final SimpMessagingTemplate messagingTemplate;
    private final GameRoomRepository gameRoomRepository;
    private final GameUserRepository gameUserRepository;
    private final RedisTemplate<String, String> redisTemplate;

    @Scheduled(fixedRate = 1000)  // 매 초마다 실행
    public void checkUnresponsiveUsers() {
        LocalDateTime now = LocalDateTime.now();
        List<GameUser> unresponsiveUsers = gameUserRepository.findAllByInvitedAtBeforeAndGameAcceptedIsNull(now.minusSeconds(15));

        for (GameUser user : unresponsiveUsers) {
            String roomNumber = user.getGameRoom().getRoomNumber();
            rejectGame(roomNumber, user.getNickName());

            messagingTemplate.convertAndSend("/topic/game/" + roomNumber + "/timeout", user.getNickName() + " did not respond.");
        }
    }

    public String createGameRoom() {

        String roomNumber = UUID.randomUUID().toString().replaceAll("-", "").substring(0,6);
        return roomNumber;
    }

    @Transactional
    public void acceptGame(String roomNumber, String nickname) {
        // Find the user by nickname.
        GameUser gameUser = gameUserRepository.findByNickName(nickname);

        if (gameUser == null) {
            throw new IllegalArgumentException("Invalid nickname: " + nickname);
        }

        // Call the method to accept the game.
        gameUser.acceptGame();

        // Update the acceptance status in Redis.
        redisTemplate.opsForHash().put(roomNumber, nickname, "accepted");

        // No need to call save() here. The transaction will automatically commit
        // the changes when the service method returns.

        if (allUsersAccepted(roomNumber)) {
            messagingTemplate.convertAndSend("/topic/game/" + roomNumber + "/start", "All users accepted.");

            // Save GameRoom and GameUser information in DB.
            saveGameRoomAndUsers(roomNumber);

            // Remove room information from Redis as it's no longer needed there.
            redisTemplate.delete(roomNumber);

            /* If you stored individual user acceptance status or any other related information in Redis,
               you might also want to remove those at this point. */

            Set<String> keys = redisTemplate.keys("*" + roomNumber + "*");
            if (keys != null && !keys.isEmpty()) {
                redisTemplate.delete(keys);
            }
        }
    }

    private void saveGameRoomAndUsers(String roomNumber) {
         /*
          Here you should implement your logic to fetch all necessary data about this game room and its users,
          then save it into your database using appropriate repositories.

          For example:
         */

        Set<String> members = redisTemplate.opsForSet().members(roomNumber);

        if (members != null && !members.isEmpty()) {

            GameRoom gameRoom = new GameRoom();
            gameRoom.setRoomNumber(roomNumber);

            for(String member : members){
                GameUser user = gameUserRepository.findByNickName(member);

                if(user!=null){
                    GameUser gameUser=new GameUser();
                    gameUser.setNickName(user.getNickName());
                    gameUser.setGameRoom(gameRoom);

                    /* You may want to set other properties of your 'game' or 'game user' objects as well */

                    gameUserRepository.save(user);
                    gameRoomRepository.save(gameRoom);
                }
            }
        }
    }

    private boolean allUsersAccepted(String roomNumber) {

        Set<String> members = redisTemplate.opsForSet().members(roomNumber);

        for (String member : members) {
            Object acceptanceStatusObj =  redisTemplate.opsForHash().get(member,"accepted");

            if(acceptanceStatusObj == null || !"accepted".equals(acceptanceStatusObj.toString())) {
                return false;
            }
        }

        return true;
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


/*    private boolean allUsersAccepted(String roomNumber) {
        GameRoom gameRoom = gameRoomRepository.findByRoomNumber(roomNumber);
        for (GameUser user : gameRoom.getUsers()) {
            if (!Boolean.TRUE.equals(user.getGameAccepted())) {  // 수락하지 않은 유저가 있는지 체크.
                return false;
            }
        }
        return true;
    }*/

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
                .invitedAt(LocalDateTime.now())
                .build();

        // Save the user.
        gameUserRepository.save(user);

        // Add the user to the game room's users list directly.
        gameRoom.getUsers().add(user);
    }

}