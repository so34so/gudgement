package com.example.gudgement.stomp.service;

import com.example.gudgement.stomp.dto.DataDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubscriber implements MessageListener { // publisher 구독하고 있다가 발행되면, 이벤트 실행
    private final ObjectMapper objectMapper;
    private final RedisTemplate redisTemplate;
    private final SimpMessageSendingOperations messagingTemplate;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            String publishMessage = (String) redisTemplate.getStringSerializer().deserialize(message.getBody());
            DataDto data = objectMapper.readValue(publishMessage, DataDto.class);

//            log.info("message: " + publishMessage);

            if (data.getType().equals("ABILITY") || data.getType().equals("CHAT_ZARA")) {
                messagingTemplate.convertAndSend("/sub/game/"+data.getCode()+"/zara", data);
            }
            else if (data.getType().equals("CHAT_GHOST") || data.getType().equals("ABILITY_GHOST")) {
                messagingTemplate.convertAndSend("/sub/game/"+data.getCode()+"/ghost", data);
            }
            else if (data.getType().startsWith("ROOM")) {
                messagingTemplate.convertAndSend("/sub/room/"+data.getCode(), data);
            }
            else {
                messagingTemplate.convertAndSend("/sub/game/"+data.getCode()+"/all", data);
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}