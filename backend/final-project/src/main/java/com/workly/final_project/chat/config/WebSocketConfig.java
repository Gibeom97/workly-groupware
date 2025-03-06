package com.workly.final_project.chat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-stomp") // WebSocket 연결 엔드포인트
                .setAllowedOriginPatterns("*") // CORS 허용
               // .setAllowedOrigins("*") // 모든 도메인 허용
                .withSockJS(); // SockJS 사용
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/sub","/queue"); // 구독용 브로커
        registry.setApplicationDestinationPrefixes("/pub"); // 발행용 프리픽스
        registry.setUserDestinationPrefix("/user");
    }
}
