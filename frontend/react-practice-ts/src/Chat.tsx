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
import { Department } from "./type/chatType";
import Alarm from "./components/chat/Alarm";

interface Member {
  no: number;
  name: string;
  position: string;
  team: string;
}

interface ChatRoom {
  no: number;
  chatName: string;
  chatType: string;
  unreadCount?: number;
  isActive?: boolean;
  isNotified : boolean;
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
  const [chatList, setChatList] = useState<ChatRoom[]>([
    { no : 1, chatName: '개발팀 회의', chatType: 'group', unreadCount: 0, isActive: true, isNotified: true },
    { no : 2, chatName: '디자인팀 회의', chatType: 'group', unreadCount: 2, isActive: false, isNotified: false },
    ]);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [isSearchMemberOpen, setIsSearchMemberOpen] = useState(false);
  const [searchChatType, setSearchChatType] = useState<string>("");
  const [searchChatName, setSearchChatName] = useState<string>("");
  const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoom | null>(null);
  const [isOrgOpen, setIsOrgOpen] = useState(false);
  const [isCreateOrgOpen, setIsCreateOrgOpen] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isAlarmListOpen, setIsAlarmListOpen] = useState(false);

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
    setIsInfoModalOpen(false);
    setIsNoticeOpen(false);
    setIsMyInfoModalOpen(false);
    if (chatList.length === 0) {
      setIsFirstChatOpen(true);
      setIsChatListOpen(false);
    } else {
      setIsFirstChatOpen(false);
      setIsChatListOpen(true);
    }
    setIsCreatingChat(false);
    setIsSearchMemberOpen(false);
    setSelectedChatRoom(null);
    setIsOrgOpen(false);
    setIsCreateOrgOpen(false);
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
    chatName: string;
    chatType: string;
    selectedMembers: Member[];
  }) => {
    setChatList((prev) => [
      ...prev,
      {
        no: prev.length + 1,
        chatName: newChatRoom.chatName,
        chatType: newChatRoom.chatType,
        unreadCount: 0,
        isActive: true,
        isNotified: true,
      },
    ]);
    setIsSearchMemberOpen(false);
    setIsChatListOpen(true);
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
    setIsInfoModalOpen(false);
    setIsNoticeOpen(false);
    setIsMyInfoModalOpen(false);
    setIsFirstChatOpen(false);
    setIsChatListOpen(false);
    setIsCreatingChat(false);
    setIsSearchMemberOpen(false);
    setSelectedChatRoom(null);
    setIsOrgOpen(true);
    setIsCreateOrgOpen(false);
  };

  const handleAlarmClick = () => {
    setIsInfoModalOpen(false);
    setIsNoticeOpen(false);
    setIsMyInfoModalOpen(false);
    setIsFirstChatOpen(false);
    setIsChatListOpen(false);
    setIsCreatingChat(false);
    setIsSearchMemberOpen(false);
    setSelectedChatRoom(null);
    setIsOrgOpen(false);
    setIsCreateOrgOpen(false);
    setIsAlarmListOpen(true);
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
            room={selectedChatRoom!}
            messages={[
              { userName: '홍길동', message: '안녕하세요!', chatNo: 1, lastReadChatNo: 0, receivedDate: '9:41 AM', isMine: false },
              { userName: '김철수', message: '회의 시간 변경되었어요.', chatNo: 2, lastReadChatNo: 1, receivedDate: '9:41 AM', isMine: false },
              { userName: '나(본인)', message: '넵 확인했습니다.', chatNo: 3, lastReadChatNo: 2, receivedDate: '9:41 AM', isMine: true }
            ]}
            onClose={() => {
              setSelectedChatRoom(null);
              setIsChatListOpen(true);
            }}
            onToggleAlarm={(chatName, isNotified) => {
              setChatList((prev) =>
                prev.map((room) =>
                  room.chatName === chatName ? { ...room, isNotified } : room
                )
              );
            }}
            currentMembers={[  // ⬅️ 이런 식으로 실제 멤버들 내려주는 상태도 필요
              { no: 1, name: '홍길동', position: '사원', team: '개발팀' },
              { no: 2, name: '김철수', position: '대리', team: '개발팀' },
              { no: 3, name: '나(본인)', position: '주임', team: '개발팀' },
            ]}
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
          </>
        ) : isCreateOrgOpen ? (
          <CreateOrg
          onClose={() => setIsCreateOrgOpen(false)}
          onComplete={(dept) => {
            console.log(`${dept.deptName} 부서 생성됨, 멤버:`, dept.members);
            setDepartments((prev) => [...prev, dept]); // 🔥부서와 멤버 추가
            setIsCreateOrgOpen(false);
            setIsOrgOpen(true); // 생성 후 다시 조직도로 돌아가게
            }}
          />
        ) : isOrgOpen ? (
          <ChatContainer onClose={() => setIsOpen(false)} onChatClick={handleChatClick} 
          onProfileClick={handleProfileClickIcon} onOrgClick={handleOpenOrg} OnAlarmClick={handleAlarmClick}>
          <OrgChart departments={departments}
           onOpenCreateOrg={() => {
            setIsOrgOpen(false);
            setIsCreateOrgOpen(true);
          }} />
          </ChatContainer>
        )  : isFirstChatOpen ? (
          <ChatContainer onClose={() => setIsOpen(false)} onChatClick={handleChatClick} 
           onProfileClick={handleProfileClickIcon} OnAlarmClick={handleAlarmClick} onOrgClick={handleOpenOrg} >
            <ChatNewList setIsCreatingChat={setIsCreatingChat} setIsFirstChatOpen={setIsFirstChatOpen} />
          </ChatContainer>
        ) : isCreatingChat ? (
          <ChatCreate
            invitePeople={invitePeople}
            onClose={() => setIsCreatingChat(false)}
          />
        ) : isChatListOpen ? (
          <ChatContainer onClose={() => setIsOpen(false)} onOrgClick={handleOpenOrg} OnAlarmClick={handleAlarmClick} onProfileClick={handleProfileClickIcon}>
            <ChatList
              chatRooms={chatList}
              setChatList={setChatList}
              setIsCreatingChat={setIsCreatingChat}
              setIsFirstChatOpen={setIsFirstChatOpen}
              openNoticeChat={() => setIsNoticeOpen(true)}
              openChatRoom={(room) => handleOpenChatRoom({ ...room, isNotified: true })}
            />
          </ChatContainer>
        ) :  isAlarmListOpen ? (
          <ChatContainer
            onClose={() => setIsOpen(false)}
            onChatClick={handleChatClick}
            onProfileClick={handleProfileClickIcon}
            onOrgClick={handleOpenOrg}
            OnAlarmClick={handleAlarmClick}
          >
            <Alarm 
            chatRooms={chatList} setChatList={setChatList} onNoticeClick={openNoticeChat} />
          </ChatContainer>
        ): 
        (
          <ChatContainer onClose={() => setIsOpen(false)} onOrgClick={handleOpenOrg} OnAlarmClick={handleAlarmClick} onChatClick={handleChatClick} onProfileClick={handleProfileClickIcon}>
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
