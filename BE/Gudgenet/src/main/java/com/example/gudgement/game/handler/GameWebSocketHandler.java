package com.example.gudgement.game.handler;//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.messaging.handler.annotation.SendTo;
//import org.springframework.stereotype.Controller;
//
//@Controller
//public class GameWebSocketHandler {
//
//    @MessageMapping("/createRoom")
//    @SendTo("/topic/roomCreated")
//    public Room createRoom(@Payload RoomCreationRequest request) {
//        // 게임 방 생성 로직
//        Room room = new Room(request.getPlayerId());
//        // 게임 방을 데이터베이스에 저장하거나 관리합니다.
//        return room;
//    }
//
//    @MessageMapping("/chat/{roomId}")
//    @SendTo("/topic/chat/{roomId}")
//    public ChatMessage sendChatMessage(@Payload ChatMessage message, @DestinationVariable String roomId) {
//        // 채팅 메시지 처리 로직
//        // roomId를 기반으로 메시지를 적절한 게임 방으로 브로드캐스트합니다.
//        return message;
//    }
//}
