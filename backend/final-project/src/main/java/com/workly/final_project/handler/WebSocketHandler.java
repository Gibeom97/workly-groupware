package com.workly.final_project.handler;

import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class WebSocketHandler extends TextWebSocketHandler {
    private static final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        String userNo = session.getUri().getQuery().split("=")[1];
        sessions.put(userNo, session);
        System.out.println("✅ WebSocket 연결: " + userNo);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        String userNo = session.getUri().getQuery().split("=")[1];
        String response = "{ \"approvalComplete\": 2, \"approvalRequest\": 5 }"; // 예제 데이터
        session.sendMessage(new TextMessage(response));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessions.values().remove(session);
    }
}
