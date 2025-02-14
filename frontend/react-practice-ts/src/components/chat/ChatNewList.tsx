import chatPlus from "../../assets/Images/chat/chatplus.png";
//import ChatCreate from "./ChatCreate";


const ChatNewList = ({
  setIsCreatingChat,
  setIsFirstChatOpen,
}: {
  setIsCreatingChat: (value: boolean) => void;
  setIsFirstChatOpen: (value: boolean) => void;
}) => {

  return (
    <div
      className="ChatNewList"
      style={{
        width: "245px",
        height: "490px",
        background: "#FFFFFF",
        borderRadius: "8px",
        padding: "8px 10px",
        fontFamily: "'Roboto', sans-serif",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* 헤더 부분 */}
      <div
        className="ChatNewList-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div
          className="ChatNewList-title"
          style={{
            fontSize: "24px",
            fontFamily: "Nunito Sans",
            fontWeight: "800",
            color: "#4880FF",
          }}
        >
          Chatting
        </div>
        <img
          className="ChatNewList-icon"
          style={{ width: "30px", height: "30px", cursor: "pointer" }}
          src={chatPlus}
          alt="icon"
          onClick={() => { setIsCreatingChat(true); setIsFirstChatOpen(false);}}
        />
      </div>

      {/* 메시지 */}
      <div
        className="ChatNewList-message"
        style={{
          fontSize: "16px",
          fontWeight: "600",
          color: "#202224",
          marginBottom: "20px",
        }}
      >
        존재하는 채팅방이 없습니다.
      </div>

      {/* 새로운 채팅방 만들기 버튼 */}
      <div
        className="ChatNewList-create-wrapper"
        style={{
          background: "#E9EBF1",
          borderRadius: "5px",
          height: "31px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={() => { setIsCreatingChat(true); setIsFirstChatOpen(false);}}
        
      >
        <span
          className="ChatNewList-create-text"
          style={{
            fontSize: "12px",
            fontFamily: "Roboto",
            fontWeight: "500",
            color: "#202224",
          }}
        >
          새로운 채팅방 만들기
        </span>
      </div>
    </div>
  );
};

export default ChatNewList;
