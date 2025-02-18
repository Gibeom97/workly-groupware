import { useState } from "react";
import profile from "../../assets/Images/chat/profile.png";
import bell from "../../assets/Images/chat/bell.png";

interface ChatRoom {
  no: number;
  chatName: string;
  chatType: string;
  unreadCount?: number;
  isActive?: boolean;
  isNotified: boolean; // 🔔 알림 설정 여부 추가
}

interface AlarmProps {
  chatRooms: ChatRoom[];
  setChatList: React.Dispatch<React.SetStateAction<ChatRoom[]>>;
  onNoticeClick: () => void;
}

const Alarm = ({ chatRooms,
  setChatList,
  onNoticeClick }: AlarmProps) => {
  const [filter, setFilter] = useState<"all" | "notified" | "muted">("all");
  
  // const [chatRooms, setChatRooms] = useState<ChatRoom[]>([
  //   { no: 1, chatName: "김자수", chatType: "dm", isActive: true, unreadCount: 2, isNotified: true },
  //   { no: 2, chatName: "채소염", chatType: "dm", isActive: false, isNotified: false },
  //   { no: 3, chatName: "법무팀 채팅방", chatType: "group", unreadCount: 100, isNotified: true },
  //   { no: 4, chatName: "인사팀 채팅방", chatType: "group", unreadCount: 15, isNotified: false },
  //   { no: 5, chatName: "안관주", chatType: "dm", isActive: true, unreadCount: 6, isNotified: true },
  //   { no: 6, chatName: "디자인팀 채팅방", chatType: "group", isNotified: true },
  // ]);

  // 알림 상태 토글 함수
  const toggleNotification = (no: number) => {
    setChatList((prev) =>
      prev.map((room) =>
        room.no === no ? { ...room, isNotified: !room.isNotified } : room
      )
    );
  };

  // 필터링 적용된 채팅방 목록
  const filteredRooms = chatRooms.filter((room) => {
    if (filter === "notified") return room.isNotified;
    if (filter === "muted") return !room.isNotified;
    return true;
  });

  return (
    <><div
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "8px 12px",
      alignItems: "center",
    }}
  >
    <span style={{ fontSize: 20, fontWeight: "bold", color: "#4880FF" }}>
      Alarm
    </span>
    <div style={{ display: "flex", gap: 8 }}>
    </div>
  </div>
    <div
      style={{
        width: 280,
        height: "auto",
        position: "relative",
        background: "white",
        borderRadius: 8,
        padding: "10px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* 상단 필터 버튼 */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <button
          onClick={() => setFilter("notified")}
          style={{
            backgroundColor: filter === "notified" ? "#4880FF" : "#E9EBF1",
            color: filter === "notified" ? "white" : "black",
            borderRadius: "8px",
            padding: "6px 12px",
            border: "none",
            cursor: "pointer",
          }}
        >
          알림 받기
        </button>
        <button
          onClick={() => setFilter("muted")}
          style={{
            backgroundColor: filter === "muted" ? "#4880FF" : "#E9EBF1",
            color: filter === "muted" ? "white" : "black",
            borderRadius: "8px",
            padding: "6px 10px",
            border: "none",
            cursor: "pointer",
            marginRight : "120px"
          }}
        >
          알림 해제
        </button>
      </div>

      {/* 공지방 */}
      <div
        style={{
          fontWeight: "bold",
          color: "#4880FF",
          cursor: "pointer",
          marginBottom: "8px",
        }}
        onClick={onNoticeClick}
      >
        사내 공지 톡방
      </div>

      {/* 채팅방 목록 */}
      {filteredRooms.map((room) => (
        <div
          key={room.no}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 10px",
            position: "relative",
            left : "-11px"
          }}
        >
          {/* 프로필 이미지 */}
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "#D9D9D9",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <img src={profile} alt="profile" style={{ width: "22px", height: "22px" }} />
          </div>

          {/* 채팅방 이름 */}
          <div style={{ flexGrow: 1 }}>
            <div style={{ fontWeight: 600 }}>{room.chatName}</div>
            <div style={{ fontSize: "12px", color: room.isActive ? "#4880FF" : "#999999" }}>
              {room.isActive ? "활성화" : "비활성화"}
            </div>
          </div>

          {/* 안 읽은 메시지 수 */}
          {room.unreadCount && room.unreadCount > 0 && (
            <div
              style={{
                backgroundColor: "#FF4D4F",
                color: "white",
                fontSize: "12px",
                padding: "2px 6px",
                borderRadius: "12px",
                marginRight: "8px",
              }}
            >
              {room.unreadCount}
            </div>
          )}

          {/* 알림 설정 아이콘 (토글) */}
          <img
            src={bell}
            alt="알림 설정"
            style={{
              width: "20px",
              height: "20px",
              cursor: "pointer",
              opacity: room.isNotified ? 1 : 0.3,
            }}
            onClick={() => toggleNotification(room.no)}
          />
        </div>
      ))}
    </div>
    </>
  );
};

export default Alarm;
