//package com.example.gudgement.stomp.service;
//
//import com.chibbol.wtz.domain.room.entity.Room;
//import com.chibbol.wtz.domain.room.service.RoomEnterInfoRedisService;
//import com.chibbol.wtz.domain.room.service.RoomService;
//import com.chibbol.wtz.domain.user.entity.User;
//import com.chibbol.wtz.domain.user.repository.UserRepository;
//import com.chibbol.wtz.domain.user.service.UserService;
//import com.chibbol.wtz.global.stomp.dto.DataDTO;
//import com.chibbol.wtz.global.stomp.repository.StompRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.data.redis.listener.ChannelTopic;
//import org.springframework.stereotype.Service;
//
//@Slf4j
//@RequiredArgsConstructor
//@Service
//public class StompService {
//
//    private final StompRepository stompRepository;
//    private final UserService userService;
//    private final RedisPublisher redisPublisher;
//    private final ChannelTopic roomTopic;
//    private final RoomEnterInfoRedisService roomEnterInfoRedisService;
//    private final RoomService roomService;
//    private final UserRepository userRepository;
//
//    public void connectUser(String sessionId, Long userSeq) {
//        log.info("connectUser 시작");
//        stompRepository.setUserSeqForSessionId(sessionId, userSeq);
//        log.info("connectUser 끝");
//    }
//
//    public void subscribeUser(Long userSeq, String roomCode) {
//        log.info("subscribeUser 시작");
//        stompRepository.setRoomCodeForUserSeq(userSeq, roomCode);
//        log.info("subscribeUser 끝");
//    }
//
//    public void unsubscribeUser(Long userSeq) {
//        if(userSeq == null) {
//            return;
//        }
//
//        log.info("EXIT 시작");
//        String roomCode = stompRepository.getRoomCodeByUserSeq(userSeq);
//        if(roomCode == null) {
//            return;
//        }
//        User user = userService.findByUserSeq(userSeq);
//        // 메세지 보내기
//        DataDTO dataDTO = DataDTO.builder()
//                .type("ROOM_EXIT")
//                .code(roomCode)
//                .data(user.getNickname() +"님이 퇴장하셨습니다.")
//                .build();
//        redisPublisher.stompPublish(roomTopic, dataDTO);
//        // CurSeats 관리
//        roomEnterInfoRedisService.setUserExitInfo(roomCode, user.getUserSeq());
//        // 남은 사람 없을 경우
//        boolean emptyRoom = false;
//        if (roomEnterInfoRedisService.getUsingSeats(roomCode) == 0) {
//            emptyRoom = true;
//            roomService.deleteRoom(roomCode);
//        }
//        dataDTO.setType("ROOM_CUR_SEATS");
//        dataDTO.setData(roomEnterInfoRedisService.getUserEnterInfo(roomCode));
//        redisPublisher.stompPublish(roomTopic, dataDTO);
//        // 남은 사람이 존재하면서 & 방장이 나갔을 경우
//        Room room = roomService.findRoomByCode(roomCode);
//        if (!emptyRoom && user.getUserSeq() == room.getOwner().getUserSeq()) {
//            long newOwnerSeq = roomService.changeRoomOwner(roomCode);
//            dataDTO.setType("ROOM_CHANGE_OWNER");
//            dataDTO.setData(newOwnerSeq);
//            redisPublisher.stompPublish(roomTopic, dataDTO);
//        }
//        log.info("roomCode 삭제 시작");
//        stompRepository.removeRoomCodeForUserSeq(userSeq); // roomCode삭제
//        log.info("roomCode 삭제 끝");
//        log.info("EXIT 끝");
//    }
//
//    public void disconnectUser(String sessionId) {
//        if(sessionId == null) {
//            return;
//        }
//
//        log.info("disconnect 시작");
//        Long userSeq = stompRepository.getUserSeqBySessionId(sessionId);
//        if(userSeq == null) {
//            return;
//        }
//        if (stompRepository.checkExistRoom(userSeq)) {
//            log.info("이게 왜 안뜨지?");
//            unsubscribeUser(userSeq);
//        }
//        stompRepository.removeUserSeqForSessionId(sessionId);
//        stompRepository.removeSessionIdForUserSeq(userSeq);
//        // 로그아웃 처리
//        User user = userRepository.findByUserSeq(userSeq);
//        if(user == null) {
//            return;
//        }
//        user.updateRefreshToken(null);
//        userRepository.save(user);
//
//        log.info("disconnect 끝");
//    }
//
//    public boolean checkForDuplicateUser(Long userSeq) {
//        if(userSeq == null) {
//            return false;
//        }
//
//        return stompRepository.checkForDuplicateUser(userSeq);
//    }
//}
