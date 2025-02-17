import chatPlus from "../../assets/Images/chat/chatplus.png";
import profile from "../../assets/Images/chat/profile.png";
//import speaker from "../../assets/Images/chat/loud-speaker 11.png";
//import searchIcon from "../../assets/Images/chat/search.png";
//import groupProfile from "../../assets/Images/chat/groupList.png"

interface ChatRoom {
  chatName: string;
  chatType: string;
  unreadCount?: number;
  isActive?: boolean; // 사용자 활성 상태 여부
}

const ChatList = ({
  chatRooms = [],
  setIsCreatingChat,
  openNoticeChat,
  openChatRoom,
}: {
  chatRooms?: ChatRoom[];
  setIsCreatingChat: (value: boolean) => void;
  setIsFirstChatOpen: (value: boolean) => void;
  openNoticeChat?: () => void;
  openChatRoom?: (room: ChatRoom) => void;
}) => {
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
          {/* <img src={searchIcon} alt="search" style={{ width: 20, height: 20 }} /> */}
          <img
            src={chatPlus}
            alt="add"
            style={{ width:25, height: 25, cursor: "pointer" }}
            onClick={() => {
              setIsCreatingChat(true);
            }}
          />
        </div>
      </div>

      {/* 공지방 */}
      
      <div
        style={{ padding: "8px 12px", color: "#4880FF", fontWeight: "bold", cursor:"pointer"}}
        onClick={openNoticeChat}
      >
        사내 공지 톡방
      </div>
     

      {/* 채팅방 목록 */}
      {chatRooms.map((room, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 12px",
            position: "relative",
          }}
          onClick={() => openChatRoom && openChatRoom(room)}
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
          //onClick={}
        >
          <img className="ProfileIcon" style={{ width: "22px", height: "22px", objectFit: "cover" }} src={profile} alt="profile" />
        </div>
        
           {/* 채팅방 이름 */}
          <div style={{ flexGrow: 1 }}>
            <div style={{ fontWeight: 600, marginLeft:15 , cursor:"pointer"}}>{room.chatName}</div>
            {/* 비활성화 활성화 */}
            <div
              style={{
                cursor:"pointer",
                fontSize: 12,
                color: room.isActive ? "#4880FF" : "#999999",
                marginLeft:15
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
      ))}
    </div>
  );
};

export default ChatList;
