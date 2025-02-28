package com.workly.final_project.chat.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

	/*메세지 브로커 설정*/
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // 클라이언트가 메시지를 받을 때 -> /sub/chat/room
        config.enableSimpleBroker("/sub");

        // 클라이언트가 메시지를 보낼 때 -> /pub/chat/message
        config.setApplicationDestinationPrefixes("/pub");
    }

    /* stomp */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 소켓 연결용 endpoint 설정 -> ws://localhost:5173/ws-stomp 로 연결됨
        // SockJS 사용 가능하게 설정 (웹소켓 미지원 브라우저 대응)
        registry.addEndpoint("/ws-stomp")
                .setAllowedOriginPatterns("http://localhost:5173") // CORS 허용 설정
                .withSockJS();
    }
    
    
//    @Override
//    public boolean configureMessageConverters(List<MessageConverter> converters) {
//        converters.add(new MappingJackson2MessageConverter());
//        return false; // 기본 컨버터를 등록하지 않도록 설정 (필요 시 true로 변경)
//    }

}

