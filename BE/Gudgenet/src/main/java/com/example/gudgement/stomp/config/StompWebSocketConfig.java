package com.example.gudgement.stomp.config;//package com.example.com.example.gudgement.stomp.config;
//
//import lombok.AllArgsConstructor;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.messaging.simp.config.ChannelRegistration;
//import org.springframework.messaging.simp.config.MessageBrokerRegistry;
//import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
//import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
//import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
//
//@AllArgsConstructor
//@Configuration
//@EnableWebSocketMessageBroker
//class StompWebSocketConfig implements WebSocketMessageBrokerConfigurer {
//
//    private final StompHandler stompHandler;
//
//    // endpoint : WebSocket과 STOMP를 사용하는 웹 애플리케이션에서 클라이언트가 서버와 통신하기 위해 사용하는 주소
//    @Override
//    public void registerStompEndpoints(StompEndpointRegistry registry) {
//        registry.addEndpoint("/api/v1/stomp")
//                .setAllowedOriginPatterns("*");
//    }
//
//    @Override
//    public void configureMessageBroker(MessageBrokerRegistry registry) {
//        registry.setApplicationDestinationPrefixes("/pub"); // @MessageMapping으로 연결
//        registry.enableSimpleBroker("/sub"); // 해당 경로를 SUBSCRIBE하는 Client에게 메세지를 전달
//    }
//
//    @Override
//    public void configureClientInboundChannel(ChannelRegistration registration) {
//        registration.interceptors(stompHandler);
//    }
//
//}
