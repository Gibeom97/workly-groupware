package com.workly.final_project.chat.model.dto;

public class ChatDTO {
    private int chatRoomNo;   // 채팅방 번호
    private String roomTitle; // 채팅방 제목
    private String chatType;  // 채팅 타입
    private String createdChat; // 채팅방 생성 시간
    private boolean bellSetting; // 알림 설정 여부
    private String lastMessageTime; // 마지막 메시지 수신 시간
    private int unreadCount;  // 읽지 않은 메시지 개수

    // 기본 생성자
    public ChatDTO() {}

    // Getter & Setter
    public int getChatRoomNo() {
        return chatRoomNo;
    }

    public void setChatRoomNo(int chatRoomNo) {
        this.chatRoomNo = chatRoomNo;
    }

    public String getRoomTitle() {
        return roomTitle;
    }

    public void setRoomTitle(String roomTitle) {
        this.roomTitle = roomTitle;
    }

    public String getChatType() {
        return chatType;
    }

    public void setChatType(String chatType) {
        this.chatType = chatType;
    }

    public String getCreatedChat() {
        return createdChat;
    }

    public void setCreatedChat(String createdChat) {
        this.createdChat = createdChat;
    }

    public boolean isBellSetting() {
        return bellSetting;
    }

    public void setBellSetting(boolean bellSetting) {
        this.bellSetting = bellSetting;
    }

    public String getLastMessageTime() {
        return lastMessageTime;
    }

    public void setLastMessageTime(String lastMessageTime) {
        this.lastMessageTime = lastMessageTime;
    }

    public int getUnreadCount() {
        return unreadCount;
    }

    public void setUnreadCount(int unreadCount) {
        this.unreadCount = unreadCount;
    }
}
