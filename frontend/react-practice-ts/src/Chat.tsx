import { useState } from "react";
import ChatContainer from "./components/chat/ChatContainer";
import ChatIconSearch from "./components/chat/ChatIconSearch";
import ChatMain from "./components/chat/ChatMain";
import SearchClick from "./components/chat/SearchClick";
import MemberInfo from "./components/chat/MemberInfo";
import "./Chat.css";
import InfoContainer from "./components/chat/InfoContainer";
import NoticeChat from "./components/chat/NoticeChat";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("비활성화");
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false); // 🔥 추가됨
  const [selectedMemberName, setSelectedMemberName] = useState<string>("");

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const handleProfileClick = (name: string) => {
    setSelectedMemberName(name);
    setIsInfoModalOpen(true);
  };

  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
  };

  // 🔥 공지사항 열기
  const openNoticeChat = () => {
    setIsNoticeOpen(true);
  };

  // 🔥 공지사항 닫기
  const closeNoticeChat = () => {
    setIsNoticeOpen(false);
  };

  // 채팅 목록 열기 - 이제 여기 만들기!!
  

  if (!isOpen) return null;

  return (
    <div className="chat-modal-overlay">
      <div className="chat-modal-content">
        {isInfoModalOpen ? (
          <InfoContainer>
        
            <MemberInfo onClose={closeInfoModal}
              member={{
                name: selectedMemberName,
                dept: "",
                position: "",
                email: "",
                phone: "",
                extension: "",
              }}
            />
          </InfoContainer>
        ) : isNoticeOpen ? ( // 🔥 공지사항 모드일 때
          <NoticeChat onClose={closeNoticeChat}/>
            // {/* <button className="notice-close-button" onClick={closeNoticeChat}>×</button> */}
          
        ) : (
          <ChatContainer onClose={() => setIsOpen(false)}>
            <button className="chat-close-button" onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 10, // 추가!
              }}
              >×</button>

            <div className="chat-containerContent">
              <div className="chat-search-section">
                <div onClick={toggleSearch} style={{ cursor: "pointer" }}>
                  <ChatIconSearch />
                </div>
              </div>

              {isSearchVisible && <SearchClick />}

              <ChatMain
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                onProfileClick={handleProfileClick}
                onNoticeClick={openNoticeChat} // 🔥 추가됨 (공지사항 클릭 핸들러)
              />
            </div>
          </ChatContainer>
        )}
      </div>
    </div>
  );
};

export default Chat;
