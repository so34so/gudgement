package com.example.gudgement.game.service;

import com.example.gudgement.CardService;
import com.example.gudgement.game.dto.EquippedItemsDto;
import com.example.gudgement.game.dto.GameUserDto;
import com.example.gudgement.game.dto.GameUserInfoDto;
import com.example.gudgement.game.entity.GameRoom;
import com.example.gudgement.game.entity.GameUser;
import com.example.gudgement.game.repository.GameRoomRepository;
import com.example.gudgement.game.repository.GameUserRepository;
import com.example.gudgement.match.dto.MatchDto;
import com.example.gudgement.member.entity.Member;
import com.example.gudgement.shop.dto.EquippedDto;
import com.example.gudgement.shop.dto.ItemDto;
import com.example.gudgement.shop.entity.Inventory;
import com.example.gudgement.shop.entity.Item;
import com.example.gudgement.member.repository.MemberRepository;
import com.example.gudgement.shop.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService{

    private final SimpMessagingTemplate messagingTemplate;
    private final GameRoomRepository gameRoomRepository;
    private final GameUserRepository gameUserRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final MemberRepository memberRepository;
    private final InventoryRepository inventoryRepository;

    private final CardService cardService;

    @Scheduled(fixedRate = 1000)
    public void checkUnresponsiveUsers() {
        LocalDateTime now = LocalDateTime.now();

        List<String> roomNumbers = new ArrayList<>(redisTemplate.keys("*"));

        for (String roomNumber : roomNumbers) {
            Set<Object> memberKeys = redisTemplate.opsForHash().keys(roomNumber);

            for (Object keyObject : memberKeys) {
                String key = (String) keyObject;
                String[] parts = key.split(":");

                if (parts[1].equals("invitedAt")) {
                    LocalDateTime invitedAt = LocalDateTime.parse((String) redisTemplate.opsForHash().get(roomNumber, key));

                    if (!redisTemplate.opsForHash().hasKey(roomNumber, parts[0] + ":status") && invitedAt.isBefore(now.minusSeconds(15))) {
                        rejectGame(roomNumber, parts[0]);
                        messagingTemplate.convertAndSend("/topic/game/" + roomNumber + "/timeout", parts[0] + " did not respond.");
                    }
                }
            }
        }
    }

    public String createGameRoom() {

        String roomNumber = UUID.randomUUID().toString().replaceAll("-", "").substring(0,6);
        return roomNumber;
    }

    @Transactional
    public void acceptGame(String roomNumber, String nickname) {
        log.info("test");
        // Check if the user exists in Redis.
        Boolean hasKey = redisTemplate.opsForHash().hasKey(roomNumber, nickname + ":status");

        if (!hasKey) {
            throw new IllegalArgumentException("Invalid nickname: " + nickname);
        }

        // Update the acceptance status in Redis.
        redisTemplate.opsForHash().put(roomNumber, nickname + ":status", "success");

        if (allUsersAccepted(roomNumber)) {
            log.info("All users accepted. Sending start message and saving game room and users.");
            messagingTemplate.convertAndSend("/topic/game/" + roomNumber + "/start", "All users success");

            // Save GameRoom and GameUser information in DB.
            saveGameRoomAndUsers(roomNumber);

            Set<Object> memberFields = redisTemplate.opsForHash().keys(roomNumber);

            Set<String> members = memberFields.stream()
                    .map(key -> ((String) key).split(":")[0])
                    .collect(Collectors.toSet());

            for(String member : members){
                log.info("Processing member: " + member);

                cardService.generateAndStoreCards(roomNumber, member);

                EquippedItemsDto equippedItemsDto = fetchEquippedItems(member);
                log.info("장착아이템까지는 가지고 옴");
                int level = fetchLevel(member);
                log.info("레벨까지는 가지고 옴");
                Object value = redisTemplate.opsForHash().get(roomNumber, member+":tiggle");
                if (value == null) {
                    throw new RuntimeException("Value is not found in Redis");
                }
                Long tiggle = Long.parseLong((String) value);

                /* Construct a DTO that contains all necessary information */
                GameUserInfoDto userInfoDto = GameUserInfoDto.builder()
                        .nickname(member)
                        .level(level)
                        .tiggle(tiggle)
                        .equippedItems(equippedItemsDto)
                        .build();

                log.info("userInfoDto: " + userInfoDto);

                /* Send this DTO to client side */
                messagingTemplate.convertAndSendToUser(member, "/queue/userInfo", userInfoDto);
            }

        }else{
            log.info("fail");
        }
    }

    private boolean allUsersAccepted(String roomNumber) {
        // Get all keys (user info) from the Redis hash.
        Set<Object> membersKeys = redisTemplate.opsForHash().keys(roomNumber);

        for (Object keyObject : membersKeys) {
            String key = (String) keyObject;
            if (!key.endsWith(":status")) {  // Ignore keys that are not related to status.
                continue;
            }

            Object acceptanceStatusObj =  redisTemplate.opsForHash().get(roomNumber, key);

            if(acceptanceStatusObj == null || !"success".equals(acceptanceStatusObj.toString())) {
                return false;  // If any user's status is not 'success', return false immediately.
            }
        }

        return true;  // If all users' statuses are 'success', return true.
    }

    private void saveGameRoomAndUsers(String roomNumber) {
        log.info(roomNumber + "세이브까지 왔다.");
        // Create and save a new GameRoom.
        GameRoom gameRoom = new GameRoom();
        gameRoom.setRoomNumber(roomNumber);
        gameRoom = gameRoomRepository.save(gameRoom);
        log.info(gameRoom.getRoomNumber() + "세이브까지 왔다.2");
        // Get all keys (user info) from the Redis hash.
        Set<Object> memberKeys = redisTemplate.opsForHash().keys(roomNumber);

        for(Object keyObject : memberKeys){
            String key = (String) keyObject;
            String[] parts = key.split(":");
            String nickname = parts[0];

            // Check if we already processed this user.
            if(parts[1].equals("status")) {
                // Create and save a new GameUser for each nickname.
                GameUser gameUser = new GameUser();
                gameUser.setNickName(nickname);
                gameUser.setGameRoom(gameRoom);
                gameUser.setResult(false);  // set initial result as false

                // Save the user.
                gameUserRepository.save(gameUser);
                log.info(gameUser.getNickName() + "유저세이브까지 왔다.");
            }
        }
    }

    @Transactional
    public void rejectGame(String roomNumber, String nickname) {
        // Check if the user exists in Redis.
        Boolean hasKey = redisTemplate.opsForHash().hasKey(roomNumber, nickname+":status");

        if (!hasKey) {
            throw new IllegalArgumentException("Invalid nickname: " + nickname);
        }

        messagingTemplate.convertAndSend("/topic/game/" + roomNumber+"/reject",nickname+" fail");

        // Delete the user's information from Redis.
        redisTemplate.opsForHash().delete(roomNumber);
    }

    private int fetchLevel(String nickname) {
        Optional<Member> gameUser = memberRepository.findByNickname(nickname);

        if (gameUser == null) {
            throw new IllegalArgumentException("Invalid nickname: " + nickname);
        }

        return gameUser.get().getLevel();
    }

    private EquippedItemsDto fetchEquippedItems(String nickname) {
        // Find the user by nickname.
        Member member = memberRepository.findByNickname(nickname).orElseThrow(() -> {
            throw new IllegalArgumentException("Invalid nickname: " + nickname);
        });
        log.info(String.valueOf(member.getMemberId()));

        List<Inventory> equippedInventories = inventoryRepository.findByMemberAndEquipped(member, true);

        log.info("equippedInventories: {}", equippedInventories.toString());

        log.info(String.valueOf(member.getMemberId()));

        // Convert the entity list to DTO.
        List<EquippedDto> equippedDtos = new ArrayList<>();

        for (Inventory inventory : equippedInventories) {
            Item item = inventory.getItemId();

            EquippedDto equippedDto= EquippedDto.builder()
                    .invenId(inventory.getInvenId())
                    .itemId(item.getItemId())
                    .itemName(item.getItemName())
                    .itemContent(item.getItemContent())
                    .itemEffect(item.getItemEffect())
                    .image(item.getImage())
                    .isEquipped(inventory.isEquipped())  // Assuming that isEquip() method exists in Inventory class.
                    .quantity(inventory.getQuantity())  // Assuming that getQuantity() method exists in Inventory class.
                    .build();

            equippedDtos.add(equippedDto);
        }

        return EquippedItemsDto.builder()
                .items(equippedDtos)
                .build();
    }

}
