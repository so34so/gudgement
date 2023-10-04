package com.example.gudgement.game.service;

import com.example.gudgement.account.entity.VirtualAccount;
import com.example.gudgement.account.repository.VirtualAccountRepository;
import com.example.gudgement.card.service.CardService;
import com.example.gudgement.game.dto.CardInfoDto;
import com.example.gudgement.game.dto.EquippedItemsDto;
import com.example.gudgement.game.dto.GameResultDto;
import com.example.gudgement.game.dto.GameUserInfoDto;
import com.example.gudgement.game.entity.GameRoom;
import com.example.gudgement.game.entity.GameUser;
import com.example.gudgement.game.exception.BaseErrorException;
import com.example.gudgement.game.exception.GameErrorCode;
import com.example.gudgement.game.repository.GameRoomRepository;
import com.example.gudgement.game.repository.GameUserRepository;
import com.example.gudgement.match.dto.MatchDto;
import com.example.gudgement.member.entity.Member;
import com.example.gudgement.progress.entity.Progress;
import com.example.gudgement.progress.repository.ProgressRepository;
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
    private final ProgressRepository progressRepository;
    private final VirtualAccountRepository virtualAccountRepository;

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
        log.info(roomNumber +" + "+nickname);
        log.info(roomNumber+":"+nickname+":status");
        log.info(String.valueOf(hasKey));
        
        if (!hasKey) {
            throw new IllegalArgumentException("Invalid nickname: " + nickname);
        }

        // Update the acceptance status in Redis.
        redisTemplate.opsForHash().put(roomNumber, nickname + ":status", "success");

        if (allUsersAccepted(roomNumber)) {
            log.info("All users accepted. Sending start message and saving game room and users.");
           // messagingTemplate.convertAndSend("/topic/game/alarm/" + roomNumber, "All users success");

            // Save GameRoom and GameUser information in DB.
            saveGameRoomAndUsers(roomNumber);

            Set<Object> memberFields = redisTemplate.opsForHash().keys(roomNumber);

            Set<String> members = memberFields.stream()
                    .map(key -> ((String) key).split(":")[0])
                    .collect(Collectors.toSet());

            // List to store userInfoDtos
            List<GameUserInfoDto> userInfoDtos = new ArrayList<>();

            for(String member : members){
                log.info("Processing member: " + member);

                VirtualAccount virtualAccount = fetchVirtualAccount(member);  // Fetch the VirtualAccount of the user
                cardService.generateAndStoreCards(virtualAccount, roomNumber, member);
                
                EquippedItemsDto equippedItemsDto = fetchEquippedItems(member);
                log.info("장착아이템까지는 가지고 옴");
                int level = fetchLevel(member);
                log.info("레벨까지는 가지고 옴");
                Object value = redisTemplate.opsForHash().get(roomNumber, member+":tiggle");

                if (value == null) {
                    throw new BaseErrorException(GameErrorCode.NOT_FOUND_REDIS);
                }

                Long tiggle = Long.parseLong((String) value);

                Set<String> redisCardsObjectSet= redisTemplate.opsForSet().members(roomNumber + ":" + member + ":cards");

                /* Convert fetched data into CardInfoDtos and add them to a list */
                List<CardInfoDto> cardDtosList= new ArrayList<>();

                for (Object cardData : redisCardsObjectSet) {
                    String[] partsOfCardData= ((String)cardData).split(":");
                    CardInfoDto singleCard= CardInfoDto.builder()
                            .name(partsOfCardData[0])
                            .amount(Long.parseLong(partsOfCardData[1]))
                            .order(Integer.parseInt(partsOfCardData[2]))
                            .build();
                    cardDtosList.add(singleCard);
                }

                /* Construct a DTO that contains all necessary information */
                GameUserInfoDto userInfoDto = GameUserInfoDto.builder()
                        .nickname(member)
                        .level(level)
                        .tiggle(tiggle)
                        .equippedItems(equippedItemsDto)
                        .cards(cardDtosList)
                        .build();

                // Add the dto to the list
                userInfoDtos.add(userInfoDto);
            }

            /* Send this DTO list to client side */
            messagingTemplate.convertAndSend("/topic/game/" + roomNumber, userInfoDtos);
            log.info(userInfoDtos.toString());

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

        messagingTemplate.convertAndSend("/topic/game/" + roomNumber, nickname+" fail");

        // Delete the user's information from Redis.
        redisTemplate.delete(roomNumber);
    }

    private int fetchLevel(String nickname) {
        Optional<Member> gameUser = memberRepository.findByNickname(nickname);

        if (gameUser == null) {
            throw new BaseErrorException(GameErrorCode.NOT_FOUND_MYSQL);
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
                    .type(item.getType())
                    .build();

            equippedDtos.add(equippedDto);
        }

        return EquippedItemsDto.builder()
                .items(equippedDtos)
                .build();
    }
    public VirtualAccount fetchVirtualAccount(String nickname) {
        Optional<Member> optionalMember = memberRepository.findByNickname(nickname);
        if (!optionalMember.isPresent()) {
            throw new RuntimeException("User not found: " + nickname);
        }

        Member member = optionalMember.get();

        Optional<VirtualAccount> optionalVirtualAccount = virtualAccountRepository.findByVirtualAccountId(member.getVirtualAccountId());

        if (!optionalVirtualAccount.isPresent()) {
            throw new RuntimeException("Virtual account not found for user: " + nickname);
        }

        return optionalVirtualAccount.get();
    }
    @Transactional
    public void endGame(GameResultDto gameResultDto) {

        String nickname = gameResultDto.getNickName();
        boolean isWinner = gameResultDto.isResult();

        String progressType = isWinner ? "win" : "lose";

        Optional<Member> user = memberRepository.findByNickname(nickname);
        Progress progress = progressRepository.findByMemberAndProgressName(user,progressType);

        if (!user.isPresent()) {
            throw new BaseErrorException(GameErrorCode.NOT_FOUND_MYSQL);
        }

        // Redis에서 해당 유저의 배팅 tiggle 값을 가져옴
        String roomNumber = gameResultDto.getRoomNumber();

        Object value = redisTemplate.opsForHash().get(roomNumber, nickname + ":betting");

        if (value == null) throw new BaseErrorException(GameErrorCode.NOT_FOUND_REDIS);

        Long bettingTiggle = Long.parseLong(String.valueOf(value));

        if(isWinner){
            user.get().addTiggle(bettingTiggle);
            user.get().addExp(2);
            progress.incrementProgressValue();

            redisTemplate.opsForHash().put(roomNumber, nickname + ":status", "finished");

            deleteIfAllUsersFinished(gameResultDto.getRoomNumber());

            setUserGameResult(nickname, roomNumber, isWinner);
        }else{
            user.get().subtractTiggle(bettingTiggle);
            user.get().addExp(2);
            progress.incrementProgressValue();

            redisTemplate.opsForHash().put(roomNumber, nickname + ":status", "finished");

            deleteIfAllUsersFinished(gameResultDto.getRoomNumber());

            setUserGameResult(nickname, roomNumber, isWinner);
        }

    }

    private void deleteIfAllUsersFinished(String roomNumber) {
        GameRoom gameRoom = gameRoomRepository.findByRoomNumber(roomNumber)
                .orElseThrow(() -> new BaseErrorException(GameErrorCode.NOT_FOUND_MYSQL));

        boolean allUsersFinished = gameRoom.getUsers().stream()
                .allMatch(gameUser -> "finished".equals(redisTemplate.opsForHash().get(roomNumber, gameUser.getNickName() + ":status")));

        if (allUsersFinished) {
            deleteKeysByPattern(roomNumber + "*");
        }
    }

    public void deleteKeysByPattern(String pattern) {
        Set<String> keys = redisTemplate.keys(pattern);
        if (keys != null && !keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
    }

    private void setUserGameResult(String username,String roomnumber ,boolean result){

        Optional<GameUser> gameUserOptional=gameUserRepository.findByNickNameAndGameRoom_RoomNumber(username,roomnumber);

        if(!gameUserOptional.isPresent()){
            throw new BaseErrorException(GameErrorCode.NOT_FOUND_MYSQL);
        }

        GameUser gameUser=gameUserOptional.get();
        gameUser.setResult(result);
    }
}
