import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setChatRooms } from "../../features/chatSlice"; // ✅ Redux 저장 액션
import { RootState } from "../../store";
import axios from "axios";
import chatPlus from "../../assets/Images/chat/chatplus.png";
import profile from "../../assets/Images/chat/profile.png";

interface ChatRoom {
  chatRoomNo: number;
  roomTitle: string;
  unreadCount?: number;
  isActive?: boolean;
  bellSetting: 'Y' | 'N';
  createdChat?: string;
  chatType: string;
}

interface ChatListProps {
  chatRooms: ChatRoom[];
  setChatList: React.Dispatch<React.SetStateAction<ChatRoom[]>>;
  setIsFirstChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCreatingChat: (value: boolean) => void;
  openNoticeChat: () => void;
  openChatRoom: (room: ChatRoom) => void;
}

const ChatList = ({ setIsCreatingChat, openNoticeChat, openChatRoom }: ChatListProps) => {
  const dispatch = useDispatch();
  const reduxChatRooms = useSelector((state: RootState) => state.chat.chatRooms);
  const userNo = useSelector((state: RootState) => state.user.userNo);
  const [isLoading, setIsLoading] = useState(true); // ✅ 초기 로딩 상태 추가

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        //console.log("📌 채팅 목록 불러오기 시작");

        // ✅ 1️⃣ LocalStorage에서 채팅 목록 가져오기
        const localChatRooms = localStorage.getItem(`chatRooms_${userNo}`);
        if (localChatRooms) {
         // console.log("🔹 LocalStorage에서 불러온 채팅방 목록:", JSON.parse(localChatRooms));
          dispatch(setChatRooms(JSON.parse(localChatRooms))); // Redux 상태 업데이트
        }

        // ✅ 2️⃣ 백엔드에서 최신 채팅 목록 가져오기
        const response = await axios.get(`http://localhost:8003/workly/api/chat/list/${userNo}`);
       // console.log("📌 백엔드 응답:", response.data);

        if (response.data.length > 0) {
        //  console.log("📢 Redux에 저장될 데이터:", response.data);

          // ✅ 3️⃣ Redux 및 LocalStorage 동기화
          dispatch(setChatRooms(response.data));
          localStorage.setItem(`chatRooms_${userNo}`, JSON.stringify(response.data));
        } else {
          console.warn("⚠️ 백엔드에서 빈 배열이 반환됨.");
        }
      } catch (error) {
        console.error("❌ 채팅방 목록 불러오기 실패:", error);
      } finally {
        setIsLoading(false); // ✅ 데이터 로드 완료 후 로딩 해제
      }
    };

    if (userNo) {
      fetchChatRooms();
    }
  }, [dispatch, userNo]);

  if (isLoading) {
    return <p>⏳ 로딩 중...</p>; // ✅ 로딩 중이면 UI 표시
  }

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
      {/* 🔹 상단 검색 & 추가 버튼 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 12px",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 20, fontWeight: "bold", color: "#4880FF" }}>Chatting</span>
        <div style={{ display: "flex", gap: 8 }}>
          <img
            src={chatPlus}
            alt="add"
            style={{ width: 25, height: 25, cursor: "pointer" }}
            onClick={() => setIsCreatingChat(true)}
          />
        </div>
      </div>

      {/* 🔹 공지방 */}
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

      {/* 🔹 채팅방 목록 */}
      {reduxChatRooms.length > 0 ? (
        reduxChatRooms.map((room) => (
          <div
            key={room.chatRoomNo}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 12px",
              position: "relative",
              cursor: "pointer",
            }}
            onClick={() => openChatRoom(room)}
          >
            {/* 🔹 프로필 이미지 */}
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

            {/* 🔹 채팅방 제목 */}
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontWeight: 600, marginLeft: 15, cursor: "pointer" }}>
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
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>채팅방이 없습니다.</p>
      )}
    </div>
  );
};

export default ChatList;
