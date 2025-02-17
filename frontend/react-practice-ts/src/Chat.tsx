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
import GroupChat from "./components/chat/GroupChat";
import OrgChart from "./components/chat/OrgChart";
import CreateOrg from "./components/chat/CreateOrg";

interface Member {
  id: number;
  name: string;
  position: string;
  team: string;
}

interface ChatRoom {
  chatName: string;
  chatType: string;
  unreadCount?: number;
  isActive?: boolean;
}


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
  const [searchChatType, setSearchChatType] = useState<string>("");
  const [searchChatName, setSearchChatName] = useState<string>("");
  const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoom | null>(null);
  const [isOrgOpen, setIsOrgOpen] = useState(false);
  const [isCreateOrgOpen, setIsCreateOrgOpen] = useState(false);
  

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
    console.log("채팅방 클릭됨, chatList 상태:", chatList);
    if (chatList.length === 0) {
      console.log("chatList가 비어있음 → isFirstChatOpen true");
      setIsFirstChatOpen(true);
    } else {
      console.log("chatList 있음 → isChatListOpen true");
      setIsChatListOpen(true);
    }
  };

  const invitePeople = (chatType: string, chatName: string) => {
    console.log('Chat.tsx - invitePeople 실행됨!', chatType, chatName);

    setIsCreatingChat(false);

    setTimeout(() => {
      setIsSearchMemberOpen(true);
      setSearchChatType(chatType);
      setSearchChatName(chatName);
      console.log('Chat.tsx - setIsSearchMemberOpen(true) 설정 완료');
    }, 0);
  };

  const handleChatRoomComplete = (newChatRoom: {
    chatName?: string;
    chatType?: string;
    selectedMembers?: Member[];
    deptName?: string;
  }) => {
    console.log(newChatRoom.chatName);
    console.log(newChatRoom.chatType);
    console.log(newChatRoom.selectedMembers);
    console.log(newChatRoom.deptName);
  };

  const handleProfileClickIcon = () => {
    setIsInfoModalOpen(false);
    setIsNoticeOpen(false);
    setIsMyInfoModalOpen(false);
    setIsFirstChatOpen(false);
    setIsChatListOpen(false);
    setIsCreatingChat(false);
    setIsSearchMemberOpen(false);
  };

  const handleOpenChatRoom = (room: ChatRoom) => {
    console.log(`${room.chatName} 채팅방 열림!`);
    setSelectedChatRoom(room);
  };

  const handleOpenOrg = () => {
    setIsOrgOpen(true);
  }

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
        ) : selectedChatRoom ? (
        <GroupChat
          //room={{ chatName: '개발팀 회의', chatType: 'group' }}
          room={selectedChatRoom!}
          messages={[
            { userName: '홍길동', message: '안녕하세요!', chatNo: 1, lastReadChatNo: 0, receivedDate: '9:41 AM', isMine: false },
            { userName: '김철수', message: '회의 시간 변경되었어요.', chatNo: 2, lastReadChatNo: 1, receivedDate: '9:41 AM', isMine: false },
            { userName: '나(본인)', message: '넵 확인했습니다.', chatNo: 3, lastReadChatNo: 2, receivedDate: '9:41 AM', isMine: true }
          ]}
             onClose={() => {
            setIsOpen(false);
            setSelectedChatRoom(null);
            setIsChatListOpen(false);}} // 여기 true인지 fal
        />
          ) : isInfoModalOpen ? (
          <InfoContainer>
            <MemberInfo onClose={closeInfoModal} member={{ name: selectedMemberName, dept: "", position: "", email: "", phone: "", extension: "" }} />
          </InfoContainer>
        ) : isNoticeOpen ? (
          <NoticeChat onClose={closeNoticeChat} />
        ) : isSearchMemberOpen ? ( // ✅ 우선순위 맨 위로 변경!
          <>
            <SearchMember
              chatType={searchChatType}
              chatName={searchChatName}
              onComplete={handleChatRoomComplete}
            />
            <CreateOrg
            onClose={() => setIsCreateOrgOpen(false)}
            invitePeople={(deptName) => {
              console.log(`${deptName} 부서 생성됨`);
              setIsCreateOrgOpen(false);
              setIsOrgOpen(true);
            }}
          />
          </>
        ) : isCreateOrgOpen ? (
          <CreateOrg
            onClose={() => setIsCreateOrgOpen(false)}
            invitePeople={(deptName) => {
              console.log(`${deptName} 부서 생성됨`);
              setIsCreateOrgOpen(false);
              setIsOrgOpen(true);
            }}
          />
        ) : isOrgOpen ? (
          <ChatContainer onClose={() => setIsOpen(false)}>
            <OrgChart
              onOpenCreateOrg={() => {
                setIsOrgOpen(false);
                setIsCreateOrgOpen(true);
              }}
            />
          </ChatContainer>
        )  : isFirstChatOpen ? (
          <ChatContainer onClose={() => setIsOpen(false)} onChatClick={handleChatClick} 
           onProfileClick={handleProfileClickIcon} onOrgClick={handleOpenOrg} >
            <ChatNewList setIsCreatingChat={setIsCreatingChat} setIsFirstChatOpen={setIsFirstChatOpen} />
          </ChatContainer>
        ) : isCreatingChat ? (
          <ChatCreate
            invitePeople={invitePeople}
            onClose={() => setIsCreatingChat(false)}
          />
        ) : isChatListOpen ? (
          <ChatContainer onClose={() => setIsOpen(false)} onOrgClick={handleOpenOrg} onProfileClick={handleProfileClickIcon}>
            <ChatList
              chatRooms={chatList}
              setIsCreatingChat={setIsCreatingChat}
              setIsFirstChatOpen={setIsFirstChatOpen}
              openNoticeChat = {() => setIsNoticeOpen(true)}
              openChatRoom={handleOpenChatRoom}
            />
          </ChatContainer>
        ) : (
          <ChatContainer onClose={() => setIsOpen(false)} onOrgClick={handleOpenOrg}  onChatClick={handleChatClick} onProfileClick={handleProfileClickIcon}>
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
