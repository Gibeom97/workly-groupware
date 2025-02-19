import profile from "../../assets/Images/chat/profile.png";
import bell from "../../assets/Images/chat/bellGray.png";
import personplus from "../../assets/Images/chat/personPlus.png";
import exit from "../../assets/Images/chat/exit.png";
import file from "../../assets/Images/chat/file.png";
import { useState } from "react";
import { Member } from "../../type/chatType";
import AddMemberPanel from "./AddMemberPanel";

const members: Member[] = [
  { no: 1, name: '박솜이', position: '이사', team: '경영지원팀' },
  { no: 2, name: '안관주', position: '이사', team: '경영지원팀' },
  { no: 3, name: '임사윤', position: '부장', team: '경영지원팀' },
  { no: 4, name: '김자수', position: '대리', team: '경영지원팀' },
  { no: 5, name: '김예삐', position: '주임', team: '인사팀' },
  { no: 6, name: '채소염', position: '주임', team: '인사팀' },
  { no: 7, name: '최웡카', position: '부장', team: '인사팀' },
  { no: 8, name: '김기밤', position: '대리', team: '인사팀' },
  { no: 9, name: '김젤리', position: '사원', team: '인사팀' },
  { no: 10, name: '이용휘', position: '주임', team: '인사팀' },
];

interface ChatRoom {
  chatName: string;
  chatType: string;
  unreadCount?: number;
  isActive?: boolean;
  isNotified: boolean;
}

interface ChatMessage {
  userName: string;
  message: string;
  chatNo: number;
  lastReadChatNo: number;
  receivedDate: string;
  isMine: boolean;
}

interface UserChat {
  userNo: number;
  lastReadChatNo: number;
}

interface GroupChatProps {
  room: ChatRoom;
  messages: ChatMessage[];
  onClose: () => void;
  onToggleAlarm: (chatName: string, isNotified: boolean) => void;
  currentMembers: Member[];
}

const userChatList: UserChat[] = [
  { userNo: 1, lastReadChatNo: 3 },
  { userNo: 2, lastReadChatNo: 2 },
  { userNo: 3, lastReadChatNo: 1 },
];

const GroupChat = ({
  room,
  messages,
  onClose,
  onToggleAlarm,
  currentMembers,
}: GroupChatProps) => {
  const [isAddMemberPanelOpen, setIsAddMemberPanelOpen] = useState(false);
  const [allEmployees] = useState<Member[]>(members);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(messages);
  const [chatMembers, setChatMembers] = useState<Member[]>(currentMembers);

  const handlePersonPlusClick = () => {
    setIsAddMemberPanelOpen(true);
  };

  const handleAddMemberConfirm = (newMembers: Member[]) => {
    const filteredNewMembers = newMembers.filter(
      (newMember) => !chatMembers.some((member) => member.no === newMember.no)
    );

    if (filteredNewMembers.length === 0) {
      alert("이미 참여 중인 멤버입니다.");
      setIsAddMemberPanelOpen(false);
      return;
    }

    const updatedMembers = [...chatMembers, ...filteredNewMembers];
    setChatMembers(updatedMembers);

    const inviteMessages: ChatMessage[] = filteredNewMembers.map((member, index) => ({
      userName: '시스템',
      message: `${member.name}님이 초대되었습니다.`,
      chatNo: chatMessages.length + 1 + index,
      lastReadChatNo: 0,
      receivedDate: new Date().toLocaleTimeString(),
      isMine: false,
    }));

    setChatMessages((prevMessages) => [...prevMessages, ...inviteMessages]);
    setIsAddMemberPanelOpen(false);
  };

  const handleBellClick = () => {
    const action = room.isNotified ? '해제' : '설정';
    const confirmResult = window.confirm(`알림을 ${action}하시겠습니까?`);
    if (confirmResult) {
      onToggleAlarm(room.chatName, !room.isNotified);
      alert(`알림이 ${action}되었습니다.`);
    }
  };

  // 여기 나가기 백엔드랑 연동해서 수정하기 
  //const handle
  
  return (
    <div className="group-chat" style={{
      width: 390,
      height: 600,
      position: 'relative'
    }}>
      <div className="groupchat-background" style={{
        width: 390,
        height: 600,
        position: 'absolute',
        background: 'white',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: 5
      }} />

      <div className="groupchat-close-icon" style={{
        left: 359,
        top: 22,
        position: 'absolute',
        cursor: "pointer"
      }} onClick={onClose}>
        ✕
        <div className="chat-date" style={{ display: "flex", marginLeft: '-340px', marginTop:'40px'}}>
        <div className="left-divider" style={{ flex: 1, height: '1px', background: '#E0E0E0' }} />
        <div className="groupchat-date" style={{ margin: '0 10px', color: '#4880FF', fontSize: '11px', fontFamily: 'Roboto', fontWeight: '500', lineHeight: '5px', letterSpacing: '0.5px', whiteSpace: 'nowrap', width: 'auto' }}>2025년 2월 6일 목요일</div>
        <div className="right-divider" style={{ flex: 1, height: '1px', background: '#E0E0E0' }} />
      </div>

      </div>

      <div className="groupchat-title" style={{
        left: 20,
        top: 26,
        position: 'absolute',
        color: 'black',
        fontSize: 20,
        fontFamily: 'Nunito Sans',
        fontWeight: '700'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <div style={{
            width: 40,
            height: 40,
            background: '#D9D9D9',
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img className="chat-profile" style={{ width: '22px', height: '22px', objectFit: 'cover' }} src={profile} alt="profile" />
          </div> 
          {room.chatName}
        </div>
      </div>

      <div className="groupchat-content-group" style={{
        position: 'absolute',
        top: '100px',
        left: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '350px'
      }}>
        {messages.map((msg, index) => {
  const unreadCount =
    userChatList.filter((userChat) => msg.chatNo > userChat.lastReadChatNo).length - (msg.isMine ? 1 : 0);

  return (
    <div
      key={index}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: msg.isMine ? 'flex-end' : 'flex-start',
        marginBottom: '5px',
      }}
    >
      {!msg.isMine && (
        <div
          style={{
            width: 40,
            height: 40,
            background: '#D9D9D9',
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '8px',
          }}
        >
          <img
            className="member-profile"
            style={{ width: '22px', height: '22px', objectFit: 'cover' }}
            src={profile}
            alt="profile"
          />
        </div>
      )}
      {/* 상대방 이름 */}
      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {!msg.isMine && (
          <div
            style={{
              fontFamily: 'Nunito Sans',
              fontWeight: '700',
              fontSize: '14px',
              color: 'black',
              paddingBottom: '3px',
            }}
          >
            {msg.userName}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          {msg.isMine && unreadCount > 0 && (
            <div style={{ fontSize: '10px', color: '#4880FF', marginRight: '5px', alignSelf: 'flex-end' }}>{unreadCount}</div>
          )}
          <div
            style={{
              background: msg.isMine ? '#D2E3FF' : '#E9EBF1',
              padding: '8px',
              borderRadius: '5px',
              fontSize: '11px',
              fontFamily: 'Roboto',
              fontWeight: '600',
              color: 'black',
              lineHeight: '20px',
              letterSpacing: '0.1px',
              maxWidth: '200px',
              wordBreak: 'break-word',
            }}
          >
            {msg.message}
          </div>
          {!msg.isMine && unreadCount > 0 && (
            <div style={{ fontSize: '10px', color: '#4880FF', marginLeft: '5px', alignSelf: 'flex-end' }}>{unreadCount}</div>
          )}
        </div>
        <div style={{ fontSize: '10px', color: '#B3B3B3', marginTop: '3px', alignSelf: msg.isMine ? 'flex-end' : 'flex-start' }}>{msg.receivedDate}</div>
      </div>
    </div>
  );
})}

      </div>
      
      {/* 전송 버튼 */}
      <div style={{ position: 'absolute', bottom: 23, left: 300, width: '70px', height: '35px', background: '#4880FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', borderRadius: '5px', cursor: 'pointer' }}>
        전송
      </div>

      {/* 채팅 입력란 */}
      <textarea placeholder="메세지 입력" maxLength={5000} style={{ position: 'absolute', bottom: 60, left: '20px', width: '350px', height: '70px', borderRadius: '5px', border: '1.5px solid #ccc', padding: '10px', fontSize: '14px', resize: 'none', overflowY: 'auto', whiteSpace: 'pre-wrap', marginBottom:'10px', boxSizing: 'border-box' }} />

      {/* 하단 아이콘 */}
      <img className="file" style={{ width: 30, height: 30, left: 31, top: 545, position: 'absolute' }} src={file} alt="icon" />
      <img className="bell" onClick={handleBellClick} style={{ cursor: "pointer", width: 30, height: 30, left: 75, top: 545, position: 'absolute' }} src={bell} alt="icon" />
      {/* 사람 추가 아이콘 */}
      <img
        className="personplus"
        onClick={handlePersonPlusClick} // ✅ 클릭 이벤트 수정
        style={{  width: 30, height: 30, left: 121, top: 545, position: 'absolute', cursor: 'pointer' }}
        src={personplus}
      />

      {isAddMemberPanelOpen && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
        >
          <AddMemberPanel
            allEmployees={allEmployees}
            //selectedMembers={currentMembers.map((member) => member.name)}
            currentMembers={chatMembers}
            onClose={() => setIsAddMemberPanelOpen(false)}
            onConfirm={handleAddMemberConfirm}
          />
        </div>
      )}


      <img className="exit"
      // onClick={}
      style={{ width: 30, height: 30, left: 168, top: 545, position: 'absolute' }} src={exit} alt="icon" />
    </div>

    

  );
};

export default GroupChat;
