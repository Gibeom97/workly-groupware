import { useEffect, useState } from "react";
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
import { Department,  Member, defaultMember  } from "./type/chatType";
import Alarm from "./components/chat/Alarm";
//import { useSelector } from "react-redux";
//import { RootState } from "./store"; 
import { ChatMessage } from "./type/chatType"; 
import AddMemberPanel from "./components/chat/AddMemberPanel";
import axios from "axios";



interface ChatRoom {
  chatRoomNo: number;
  roomTitle: string;
  chatType: string;
  unreadCount?: number;
  isActive?: boolean;
  bellSetting: 'Y' | 'N';
  createdChat?: string;
}

interface CurrentUser{
  userNo : number;
  userName : string;
  statusType : string;
  totalAnnualLeave : number;
  usedAnnualLeave : number;
  deptName : string;
  positionName : string;
}

interface ChatProps {
  currentUser: CurrentUser;
  onClose: () => void;
}


const Chat = ({ currentUser, onClose }: ChatProps) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]); // ✅ 초기값 빈 배열 설정

  useEffect(() => {
    console.log("📌 유저 변경 감지:", currentUser.userNo);

    setChatMessages((prevMessages = []) =>  // ✅ prevMessages가 undefined일 경우 빈 배열 처리
      prevMessages.map(msg => ({
        ...msg,
        isMine: Number(msg.userNo) === Number(currentUser.userNo),
      }))
    );
  }, [currentUser.userNo]);

  const [isOpen, setIsOpen] = useState(true);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("비활성화");
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [isMyInfoModalOpen, setIsMyInfoModalOpen] = useState(false);
  const [isFirstChatOpen, setIsFirstChatOpen] = useState(false);
  const [isChatListOpen, setIsChatListOpen] = useState(false);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [isSearchMemberOpen, setIsSearchMemberOpen] = useState(false);
  const [searchChatType, setSearchChatType] = useState<string>("");
  const [searchRoomTitle, setsearchRoomTitle] = useState<string>("");
  const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoom | null>(null);
  const [isOrgOpen, setIsOrgOpen] = useState(false);
  const [isCreateOrgOpen, setIsCreateOrgOpen] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isAlarmListOpen, setIsAlarmListOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [chatList, setChatList] = useState<ChatRoom[]>([]);
  const [currentRoom, setCurrentRoom] = useState<ChatRoom | null>(null);
  const [isAddMemberPanelOpen, setIsAddMemberPanelOpen] = useState(false);
  const [currentMembers, setCurrentMembers] = useState<Member[]>([]);


  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const handleProfileClick = (member: Member) => {  
    if (member.userNo === currentUser.userNo) {
      setIsMyInfoModalOpen(true); // 로그인한 사용자 (나) myinfo열기
    } else {
      setSelectedMember(member);
      setIsInfoModalOpen(true); // 다른 사용자면 memberinfo 열기
    }
  };

  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
    setSelectedMember(null); // 모달 닫을 때 초기화
  };

  const handleRoomChange = (newRoom: ChatRoom) => {
    setCurrentRoom(newRoom);
};


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

  const invitePeople = (chatType: string, roomTitle: string) => {
    console.log('Chat.tsx - invitePeople 실행됨!', chatType, roomTitle);

    setIsCreatingChat(false);
    setIsInfoModalOpen(false); // MemberInfo 모달이 열리지 않도록 설정
    setIsMyInfoModalOpen(false); // MyInfo 모달이 열리지 않도록 설정
    setSelectedMember(null); // ✅ selectedMember 초기화 추가

    setTimeout(() => {
      setIsSearchMemberOpen(true);
      setSearchChatType(chatType);
      setsearchRoomTitle(roomTitle);
      
    }, 0);
  };
  

  const handleChatRoomComplete = (newChatRoom: {
    roomTitle: string;
    chatType: string;
    selectedMembers: Member[];
  }) => {
    setChatList((prev) => [
      ...prev,
      {
        chatRoomNo: prev.length + 1,
        roomTitle: newChatRoom.roomTitle,
        chatType: newChatRoom.chatType,
        unreadCount: 0,
        isActive: true,
        bellSetting: 'Y',
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
    console.log(`${room.roomTitle} 채팅방 열림!`);
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
  };

  const onToggleAlarm = (chatRoomNo: number, bellSetting: string) => {
    const validBellSetting = (bellSetting === 'Y' || bellSetting === 'N') ? bellSetting : 'N';
  
    setChatList((prev) =>
      prev.map((room): ChatRoom =>
        room.chatRoomNo === chatRoomNo ? { ...room, bellSetting: validBellSetting } : room
      )
    );
  };
  
  // Chat.tsx에서 currentMembers 상태를 selectedChatRoom에 따라 업데이트
  useEffect(() => {
    if (selectedChatRoom) {
      fetchChatMembers(selectedChatRoom.chatRoomNo);
    }
  }, [selectedChatRoom]);
  
  const fetchChatMembers = async (chatRoomNo: number) => {
    try {
      const response = await axios.get(`http://localhost:8003/workly/api/chat/members/${chatRoomNo}`);
      setCurrentMembers(response.data); // ✅ 현재 채팅방의 멤버 업데이트
    } catch (error) {
      console.error("❌ 채팅방 멤버 불러오기 실패", error);
    }
  };
  
  

  // ✅ 1. LocalStorage에서 chatList 불러오기
  useEffect(() => {
    const savedChatList = localStorage.getItem("chatList");
    if (savedChatList) {
      setChatList(JSON.parse(savedChatList));
    }
  }, []);

  // ✅ 2. chatList가 변경될 때마다 LocalStorage에 저장
  useEffect(() => {
    localStorage.setItem("chatList", JSON.stringify(chatList));
  }, [chatList]);

  if (!isOpen) return null;

  return (
    <div className="chat-modal-overlay">
      <div className="chat-modal-content">
        { isSearchMemberOpen ? ( // ✅ 우선순위 맨 위로 변경!
          <>
            <SearchMember 
              chatType={searchChatType} 
              roomTitle={searchRoomTitle}
              member={selectedMember ?? defaultMember} // ✅ 이제 오류 없음!
              onComplete={handleChatRoomComplete} 
            />
          </>
        ) : isMyInfoModalOpen ? (
         <InfoContainer> 
             <MyInfo myinfo={currentUser}  onClose={closeMyInfoModal} />
          </InfoContainer>
        ) : selectedChatRoom ? (
          <>
    <GroupChat
      room={selectedChatRoom}
      currentUser={currentUser}
      messages={chatMessages}
      onClose={() => {
        setSelectedChatRoom(null);
        setIsChatListOpen(true);
      }}
      onToggleAlarm={onToggleAlarm}
      currentMembers={currentMembers} // ✅ 현재 채팅방 멤버 전달
      onChangeRoom={handleRoomChange}
      setIsAddMemberPanelOpen={setIsAddMemberPanelOpen} // ✅ 추가
    />

    {isAddMemberPanelOpen && (
      <AddMemberPanel
        allEmployees={[]} // 🔥 백엔드 API에서 전체 직원 목록 불러와야 함
        currentMembers={currentMembers} // ✅ 현재 채팅방 멤버 전달
        room={selectedChatRoom} // ✅ 현재 선택된 채팅방 정보
        onClose={() => setIsAddMemberPanelOpen(false)}
        onConfirm={(newMembers) => {
          console.log("✅ 멤버 추가됨:", newMembers);
          setCurrentMembers([...currentMembers, ...newMembers]); // ✅ 새로운 멤버 업데이트
          setIsAddMemberPanelOpen(false); // ✅ 패널 닫기
        }}
      />
    )}
  </>

          ) : isInfoModalOpen ? (
          <InfoContainer>
            <MemberInfo 
              member={selectedMember ?? defaultMember}
              onClose={closeInfoModal}
            />
          </InfoContainer>
        ) : isNoticeOpen ? (
          <NoticeChat onClose={closeNoticeChat} 
          // currentMembers={noticeChatMembers} // 공지방 멤버 내려줌
          //   onAddMembers={(newMembers) => {
          //     setNoticeChatMembers((prev) => [...prev, ...newMembers]);
          //   }} // 백엔드 연결시 풀기
          />
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
              openChatRoom={(room) => handleOpenChatRoom({ ...room, bellSetting: 'Y' })}
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

              {isSearchVisible && <SearchClick onProfileClick={handleProfileClick} />}

              <ChatMain selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} onProfileClick={handleProfileClick} onNoticeClick={openNoticeChat} />
            </div>
          </ChatContainer>
        )}
      </div>
    </div>
  );
};

export default Chat;