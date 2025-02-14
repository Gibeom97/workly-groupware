import { useState } from "react";
import ChatContainer from "./components/chat/ChatContainer";
import ChatIconSearch from "./components/chat/ChatIconSearch";
import ChatMain from "./components/chat/ChatMain";
import SearchClick from "./components/chat/SearchClick";
import MemberInfo from "./components/chat/MemberInfo";
import "./Chat.css";
import InfoContainer from "./components/chat/InfoContainer";
import NoticeChat from "./components/chat/NoticeChat";
import MyInfo from "./components/chat/MyInfo";
import ChatNewList from "./components/chat/ChatNewList";
import ChatList from "./components/chat/ChatList";
import ChatCreate from "./components/chat/ChatCreate";
import SearchMember from "./components/chat/SearchMember";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("비활성화");
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [selectedMemberName, setSelectedMemberName] = useState<string>("");
  const [isMyInfoModalOpen, setIsMyInfoModalOpen] = useState(false);
  const [isFirstChatOpen, setIsFirstChatOpen] = useState(false);
  const [isChatListOpen, setIsChatListOpen] = useState(false);
  const [chatList, setChatList] = useState<any[]>([]);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [isSearchMemberOpen, setIsSearchMemberOpen] = useState(false);

  const [myName] = useState("김젤리");

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const handleProfileClick = (name: string) => {
    if (name === myName) {
      setIsMyInfoModalOpen(true);
    } else {
      setSelectedMemberName(name);
      setIsInfoModalOpen(true);
    }
  };

  const closeInfoModal = () => setIsInfoModalOpen(false);
  const closeMyInfoModal = () => setIsMyInfoModalOpen(false);
  const closeNoticeChat = () => setIsNoticeOpen(false);

  const openNoticeChat = () => setIsNoticeOpen(true);

  const handleChatClick = () => {
    if (chatList.length === 0) {
      setIsFirstChatOpen(true);
    } else {
      setIsChatListOpen(true);
    }
  };

  const invitePeople = () => {
    setIsCreatingChat(false); // 채팅방 만들기 화면 닫고
    setIsSearchMemberOpen(true); // 사용자 검색 화면 열기
  };


  if (!isOpen) return null;

  return (
    <div className="chat-modal-overlay">
      <div className="chat-modal-content">
        {isMyInfoModalOpen ? (
          <InfoContainer>
            <MyInfo
              onClose={closeMyInfoModal}
              myinfo={{
                name: "김젤리",
                dept: "개발팀",
                position: "사원",
                email: "kimjelly@example.com",
                phone: "010-1234-5678",
                extension: "1234",
              }}
            />
          </InfoContainer>
        ) : isInfoModalOpen ? (
          <InfoContainer>
            <MemberInfo onClose={closeInfoModal} member={{ name: selectedMemberName, dept: "", position: "", email: "", phone: "", extension: "" }} />
          </InfoContainer>
        ) : isNoticeOpen ? (
          <NoticeChat onClose={closeNoticeChat} />
        ) : isFirstChatOpen ? (
          <ChatContainer onChatClick={handleChatClick}>
            <ChatNewList setIsCreatingChat={setIsCreatingChat} setIsFirstChatOpen={setIsFirstChatOpen} />
          </ChatContainer>
        ) : isChatListOpen ? (
          <ChatContainer>
            <ChatList />
          </ChatContainer>
        ) : isCreatingChat ? (
          <ChatCreate invitePeople={invitePeople} onClose={() => setIsCreatingChat(false)} />
        ) : isSearchMemberOpen ? (
          <SearchMember />
        ) : (
          <ChatContainer onClose={() => setIsOpen(false)} onChatClick={handleChatClick}>
            <button className="chat-close-button" onClick={() => setIsOpen(false)} style={{ position: "absolute", top: "10px", right: "10px", zIndex: 10 }}>
              ×
            </button>
            <div className="chat-containerContent">
              <div className="chat-search-section">
                <div onClick={toggleSearch} style={{ cursor: "pointer" }}>
                  <ChatIconSearch />
                </div>
              </div>

              {isSearchVisible && <SearchClick />}

              <ChatMain selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} onProfileClick={handleProfileClick} onNoticeClick={openNoticeChat} />
            </div>
          </ChatContainer>
        )}
      </div>
    </div>
  );
};

export default Chat;
