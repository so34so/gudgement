package com.example.gudgement.gamechat.controller;


import com.example.gudgement.gamechat.dto.MessageDto;
import com.example.gudgement.gamechat.dto.SendMessageDto;
import com.example.gudgement.member.repository.MemberRepository;
import com.example.gudgement.stomp.dto.DataDto;
import com.example.gudgement.stomp.service.RedisPublisher;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j
@RequiredArgsConstructor
public class StompGameChatController {

    private final RedisPublisher publisher;
    private final MemberRepository memberRepository;
    private final ChannelTopic gameTopic;

    private final SimpMessagingTemplate messagingTemplate;

    // gameCode Long으로 받는 거 수정해야 됨
    @Operation(summary = "전체 채팅")
    @MessageMapping("/game/{roomNumber}/chat/all")
    public void chatAll(@DestinationVariable String roomNumber, MessageDto messageDTO){
        log.info(messageDTO.getMemberId()+"");

        SendMessageDto message = SendMessageDto.builder()
                .sender(messageDTO.getMemberId())
                .nickname(memberRepository.findNicknameByMemberId(messageDTO.getMemberId()))
                .message(messageDTO.getMessage()).build();

//        messagingTemplate.convertAndSendToUser(nickname, "/queue/userInfo", userInfoDto);

        publisher.publish(gameTopic,
                DataDto.builder()
                        .type("GAME_CHAT")
                        .code(roomNumber)
                        .data(message)
                        .build());
    }

}
