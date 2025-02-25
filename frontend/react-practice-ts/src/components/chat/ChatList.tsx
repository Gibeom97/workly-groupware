import { useDispatch, useSelector } from "react-redux";
import { SetStateAction, useEffect } from "react";
import { setChatRooms } from "../../features/chatSlice";
import { RootState } from "../../store";
import chatPlus from "../../assets/Images/chat/chatplus.png";
import profile from "../../assets/Images/chat/profile.png";
import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";

interface ChatRoom {
  chatRoomNo: number; // 채팅방 번호
  roomTitle: string;  // 채팅방 이름
  unreadCount?: number;
  isActive?: boolean;
  bellSetting: 'Y' | 'N'; // 알림 설정
  createdChat?: string;
  chatType: string;
}

interface ChatListProps {
  chatRooms: ChatRoom[];
  setChatList : Dispatch<SetStateAction<ChatRoom[]>>;
  setIsCreatingChat: (value: boolean) => void;
  setIsFirstChatOpen: (value: boolean) => void;
  openNoticeChat: () => void;
  openChatRoom: (room: ChatRoom) => void;
}

const ChatList = ({
  chatRooms,
  setChatList, 
  setIsCreatingChat,
  openNoticeChat,
  openChatRoom,
}: ChatListProps) => {
  const dispatch = useDispatch();
  const reduxChatRooms = useSelector((state: RootState) => state.chat.chatRooms); // Redux에서 채팅방 목록 가져오기
  const userNo = useSelector((state: RootState) => state.user.userNo); // 현재 로그인한 사용자 번호

  // ✅ 백엔드에서 채팅 목록 불러오기
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get(`http://localhost:8003/workly/api/chat/list/${userNo}`);
        console.log("📌 채팅방 목록:", response.data);

        const formattedChatRooms = response.data.map((room: ChatRoom) => ({
          ...room,
          createdChat: room.createdChat ? new Date(room.createdChat).toISOString() : null,
        }));

        dispatch(setChatRooms(formattedChatRooms)); // Redux에 저장
      } catch (error) {
        console.error("❌ 채팅방 목록 불러오기 실패:", error);
      }
    };

    if (userNo) {
      fetchChatRooms();
    }
  }, [dispatch, userNo]);

  return (
    <div
      style={{
        width: 280,
        height: 420,
        position: "relative",
        background: "white",
        borderRadius: 8,
      }}
    >
      {/* 상단 검색, 추가 버튼 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 12px",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 20, fontWeight: "bold", color: "#4880FF" }}>
          Chatting
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          <img
            src={chatPlus}
            alt="add"
            style={{ width: 25, height: 25, cursor: "pointer" }}
            onClick={() => {
              setIsCreatingChat(true);
            }}
          />
        </div>
      </div>

      {/* 공지방 */}
      <div
        style={{
          padding: "8px 12px",
          color: "#4880FF",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={openNoticeChat}
      >
        사내 공지 톡방
      </div>

      {/* 채팅방 목록 (Redux에서 가져온 데이터로 렌더링) */}
      {reduxChatRooms.length > 0 ? (
        reduxChatRooms.map((room) => (
          <div
            key={room.chatRoomNo} // ✅ 고유 키 사용
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 12px",
              position: "relative",
              cursor: "pointer",
            }}
            onClick={() =>
              openChatRoom({
                ...room,
                createdChat:
                  typeof room.createdChat === "string"
                    ? new Date(room.createdChat).toISOString() // ✅ 문자열이면 Date 변환 후 toISOString() 적용
                    : room.createdChat,
              })
            }
          >
            {/* 프로필 이미지 */}
            <div
              className="mineProfile"
              style={{
                width: "40px",
                height: "40px",
                background: "#D9D9D9",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img
                className="ProfileIcon"
                style={{ width: "22px", height: "22px", objectFit: "cover" }}
                src={profile}
                alt="profile"
              />
            </div>

            {/* 채팅방 제목 */}
            <div style={{ flexGrow: 1 }}>
              <div
                style={{ fontWeight: 600, marginLeft: 15, cursor: "pointer" }}
              >
                {room.roomTitle}
              </div>
              <div
                style={{
                  cursor: "pointer",
                  fontSize: 12,
                  color: room.isActive ? "#4880FF" : "#999999",
                  marginLeft: 15,
                }}
              >
                {room.isActive ? "활성화" : "비활성화"}
              </div>
            </div>

            {/* 안 읽은 메시지 수 */}
            {room.unreadCount && room.unreadCount > 0 && (
              <div
                style={{
                  backgroundColor: "#FF4D4F",
                  color: "white",
                  fontSize: 12,
                  padding: "2px 6px",
                  borderRadius: 12,
                  position: "absolute",
                  right: 12,
                }}
              >
                {room.unreadCount}
              </div>
            )}
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>채팅방이 없습니다.</p>
      )}
    </div>
  );
};

export default ChatList;
