import { useState } from "react";
import ChatContainer from "./components/chat/ChatContainer";
import ChatIconSearch from "./components/chat/ChatIconSearch";
import ChatMain from "./components/chat/ChatMain";
import SearchClick from "./components/chat/SearchClick";
import "./Chat.css"; // ✅ 스타일 분리

const Chat = () => {
  const [isOpen, setIsOpen] = useState(true); // ✅ 모달 열고 닫기 상태

  if (!isOpen) return null; // ❌ 모달이 닫혀있으면 아무것도 렌더링하지 않음

  return (
    <div className="chat-modal-overlay">
      <div className="chat-modal-content">
        <button className="chat-close-button" onClick={() => setIsOpen(false)}>x</button>

        <ChatContainer>
          <div className="chat-containerContent">
            <div className="chat-search-section"> 
              <ChatIconSearch />
            </div>
            <SearchClick />
            <ChatMain />
          </div>
        </ChatContainer>
      </div>
    </div>
  );
};

export default Chat;

