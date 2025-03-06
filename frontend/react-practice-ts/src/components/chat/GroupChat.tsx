import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import axios from "axios";
import profile from "../../assets/Images/chat/profile.png";
import bell from "../../assets/Images/chat/bell.png";
import personplus from "../../assets/Images/chat/personPlus.png";
import exit from "../../assets/Images/chat/exit.png";
import { Member } from "../../type/chatType";
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; 
import utc from "dayjs/plugin/utc";


const backendHost = "192.168.130.8";
dayjs.extend(utc);


interface ChatRoom {
  chatRoomNo: number;
  roomTitle: string;
}

interface ChatMessage {
  chatNo: number;
  userNo: number;
  userName: string;
  chatRoomNo: number;
  message: string;
  receivedDate: string;
  isMine: boolean;
  lastReadChatNo?: number;
}

interface GroupChatProps {
  room: ChatRoom;
  currentUser: { userNo: number; userName: string };
  currentMembers: Member[];
  onChangeRoom: (newRoom: ChatRoom) => void;
  onClose: () => void;
  messages?: ChatMessage[];
  onToggleAlarm: (ChatRoom: number, bellSetting: string) => void;
  setIsAddMemberPanelOpen: (isOpen: boolean) => void;
}

const GroupChat = ({ room, currentUser, onClose, messages = [] }: GroupChatProps) => {
  const [client, setClient] = useState<Client | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const subscriptionRef = useRef<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [lastReadChatNo, setLastReadChatNo] = useState<number | null>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isAddMemberPanelOpen, setIsAddMemberPanelOpen] = useState(false);

  // ✅ WebSocket 연결 및 메시지 수신
  useEffect(() => {
    
    const sock = new SockJS(`http://${backendHost}:8003/workly/ws-stomp`);

    const stompClient = new Client({
        webSocketFactory: () => sock,
        reconnectDelay: 5000,
        debug: (str) => console.log("🛠 [WebSocket Debug]:", str),
        connectHeaders: {
            userNo: currentUser.userNo.toString(),
        },
        onConnect: () => {
            console.log("🟢 WebSocket Connected");

            if (subscriptionRef.current) {
                stompClient.unsubscribe(subscriptionRef.current);
            }

            const subscription = stompClient.subscribe(`/sub/chatRoom/${room.chatRoomNo}`, (message) => {
                console.log("📩 새 메시지 수신:", message.body);
                const newMessage = JSON.parse(message.body);
                setChatMessages((prev) => [
                    ...prev,
                    { ...newMessage, isMine: newMessage.userNo === currentUser.userNo },
                ]);
            });

            subscriptionRef.current = subscription.id;
            setClient(stompClient);
        },
        onDisconnect: () => console.log("🔴 WebSocket Disconnected"),
    });

    stompClient.activate();

    return () => {
        if (subscriptionRef.current) {
            stompClient.unsubscribe(subscriptionRef.current);
        }
        stompClient.deactivate();
    };
}, [room.chatRoomNo]);

  // ✅ 날짜 및 시간 변환 함수
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return dayjs(dateString).format("YYYY년 MM월 DD일 dddd"); // UTC 변환 제거
  };
  
  const formatTime = (dateString: string) => {
    if (!dateString) return "";
    return dayjs(dateString).format("HH:mm");
  };

  // 채팅 메시지 불러오기 (비동기 함수)
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://${backendHost}:8003/workly/api/chat/messages/${room.chatRoomNo}`);
      const profileMap = await fetchOtherProfiles(); // ✅ 나 제외 프로필 정보 가져오기
  
      // ✅ 각 메시지에 프로필 이미지 추가
      const messagesWithProfile = response.data.map((msg: ChatMessage) => ({
        ...msg,
        profileImg: profileMap[msg.userNo] || profile, // 기본 이미지 설정
        isMine: msg.userNo === currentUser.userNo, // ✅ 내 메시지 여부
      }));
  
      setChatMessages(messagesWithProfile);
    } catch (error) {
      console.error("❌ 채팅 메시지 불러오기 실패:", error);
    }
  };

  
  useEffect(() => {
    fetchMessages(); 
  }, [room.chatRoomNo]);

  // 나를 제외한 멤버들의 프로필 정보 가져오기
  const fetchOtherProfiles = async () => {
    try {
      const response = await axios.get(`http://${backendHost}:8003/workly/api/chat/membersWithoutMe`, {
        params: { chatRoomNo: room.chatRoomNo, userNo: currentUser.userNo },
      });
  
      console.log("📸 프로필 데이터:", response.data);
      
      // userNo를 key로 하는 객체 생성 (예: { 2: 'image_url', 3: 'image_url' })
      return response.data.reduce((acc: { [key: number]: string }, member: any) => {
        acc[member.userNo] = member.profileImg || profile;
        return acc;
      }, {});
  
    } catch (error) {
      console.error("❌ 프로필 이미지 가져오기 실패:", error);
      return {};
    }
  };
  
  
  // 다른 방으로 이동
  const leaveChatRoom = async () => {
    try {
        await axios.post(`http://${backendHost}:8003/workly/api/chat/leave/${room.chatRoomNo}/${currentUser.userNo}`);
        console.log("🚪 [프론트엔드] leaveChatRoom 요청 완료");

        // WebSocket 구독 해제
        if (subscriptionRef.current && client) {
            client.unsubscribe(subscriptionRef.current);
        }

    } catch (error) {
        console.error("❌ [프론트엔드] leaveChatRoom 요청 실패:", error);
    }
};

// 다른 채팅방으로 이동 시 호출
// const handleRoomChange = async (newRoom: ChatRoom) => {
//   try {
//     await leaveChatRoom();  // 기존 방에서 나가기 (WebSocket 구독 해제)
//     onChangeRoom(newRoom);  // ✅ 새로운 채팅방으로 변경
//   } catch (error) {
//     console.error("🚨 채팅방 변경 중 오류 발생:", error);
//   }
// };

// ✅ 안 읽은 메시지 개수 가져오는 함수
const fetchUnreadMessages = async () => {
  try {
      const response = await axios.get(`http://${backendHost}:8003/workly/api/chat/unread/${room.chatRoomNo}/${currentUser.userNo}`);
      setUnreadCount(response.data);
  } catch (error) {
      console.error("❌ [프론트엔드] 안 읽은 메시지 개수 불러오기 실패", error);
  }
};

// ✅ 채팅방 입장 시 안 읽은 메시지 수 업데이트
useEffect(() => {
  fetchUnreadMessages();
}, [room.chatRoomNo, currentUser.userNo]);

  // ✅ 마지막 읽은 메시지 가져오기
  useEffect(() => {
    axios.get(`http://${backendHost}:8003/workly/api/chat/lastRead/${room.chatRoomNo}/${currentUser.userNo}`)
      .then(response => {
        setLastReadChatNo(response.data); // ✅ 데이터가 바로 정수값이므로 그대로 사용
      })
      .catch(() => setLastReadChatNo(null));
}, [room.chatRoomNo, currentUser.userNo]);



  // 프론트엔드 채팅 메세지 저장 로직 추가
  useEffect(() => {
    axios.get(`/chat/messages/${room.chatRoomNo}`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setChatMessages(response.data);
          localStorage.setItem(`chatMessages_${room.chatRoomNo}`, JSON.stringify(response.data)); // ✅ 저장
        }
      })
      .catch(error => console.error("❌ 채팅 메시지 불러오기 실패", error));
  }, [room.chatRoomNo]);
  
  useEffect(() => {
    fetchMessages();
  }, []); // ✅ room.chatRoomNo 의존성 제거
  
  
  


  

  // 채팅방을 구독하는 모두에게 전송?
  const subscribeToChatRoom = () => {
    if (!client || !client.connected) return;

    client.subscribe(`/sub/chatRoom/${room.chatRoomNo}`, (message) => {
        console.log("📩 [프론트엔드] 새 메시지 수신:", message.body);
        const newMessage = JSON.parse(message.body);

        setChatMessages((prev) => [
            ...prev,
            { ...newMessage, isMine: newMessage.userNo === currentUser.userNo },
        ]);

        // ✅ 안 읽은 메시지 개수 다시 가져오기
        fetchUnreadMessages();
    }, { userNo: currentUser.userNo.toString(), roomId: room.chatRoomNo.toString() });
};

  
  
useEffect(() => {
  if (!client || !client.connected) return;

  if (subscriptionRef.current) {
      console.log("🔄 기존 구독 해제:", subscriptionRef.current);
      client.unsubscribe(subscriptionRef.current);
  }

  // 채팅 메시지 구독
  const chatSubscription = client.subscribe(`/sub/chatRoom/${room.chatRoomNo}`, (message) => {
      console.log("📩 새 메시지 수신:", message.body);
      const newMessage = JSON.parse(message.body);

      setChatMessages((prev) => [
          ...prev,
          { ...newMessage, isMine: newMessage.userNo === currentUser.userNo },
      ]);

      if (newMessage.userNo !== currentUser.userNo) {
          updateUserChatStatus(newMessage.chatNo);
      }
  });

  // 안 읽은 메시지 개수 업데이트 구독
  const unreadSubscription = client.subscribe(`/sub/chat/unread/${room.chatRoomNo}`, (message) => {
      console.log("📩 안 읽은 메시지 개수 업데이트:", message.body);
      setUnreadCount(JSON.parse(message.body));
  });

  subscriptionRef.current = chatSubscription.id;

  return () => {
      chatSubscription.unsubscribe();
      unreadSubscription.unsubscribe();
  };
}, [room.chatRoomNo, client]);

  
  

  
  // ✅ 메시지 전송 함수
  const sendMessage = () => {
    if (!client || !client.connected || !inputMessage.trim()) return;

    const chatMessage = {
        chatRoomNo: room.chatRoomNo,
        userNo: currentUser.userNo,
        userName: currentUser.userName,
        message: inputMessage,
    };

    console.log("📤 [프론트엔드] WebSocket으로 메시지 전송:", chatMessage);

    try {
        client.publish({
            destination: `/pub/chat/sendMessage/${room.chatRoomNo}`,
            body: JSON.stringify(chatMessage),
        });

        console.log("✅ [프론트엔드] WebSocket 메시지 전송 성공");

        setInputMessage(""); // 입력 필드 초기화

        // ✅ 내가 메시지를 보낸 경우 lastReadChatNo 업데이트
        updateUserChatStatus();
    } catch (error) {
        console.error("❌ [프론트엔드] WebSocket 메시지 전송 실패", error);
    }
};


const handleClose = () => {
  leaveChatRoom();
  localStorage.removeItem(`chatMessages_${room.chatRoomNo}`);  // ✅ 채팅방 변경 시 메시지 초기화
  setChatMessages([]);
  setLastReadChatNo(null); // ✅ lastReadChatNo 초기화
  onClose();
};


const updateUserChatStatus = async () => {
  try {
      await axios.put(`http://${backendHost}:8003/workly/api/chat/updateStatus/${room.chatRoomNo}/${currentUser.userNo}`);
      console.log("✅ [프론트엔드] updateUserChatStatus 요청 완료");
  } catch (error) {
      console.error("❌ [프론트엔드] updateUserChatStatus 요청 실패:", error);
  }
};

// ✅ 채팅방 입장 시 업데이트 실행
useEffect(() => {
    updateUserChatStatus();
}, [room.chatRoomNo, currentUser.userNo]);  // ✅ 채팅방이 변경될 때마다 실행


const isUnread = (msg: ChatMessage) => {
  return lastReadChatNo !== null && msg.chatNo > lastReadChatNo;
};

  

  return (
    <div className="group-chat" style={{ width: 390, height: 600, position: "relative" }}>
      <div className="groupchat-background" style={{ width: 390, height: 600, position: "absolute", background: "white", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: 5 }} />
        
       {/* 채팅방 이름 표시 */}
       <div className="groupchat-title" style={{ left: 20, top: 26, position: "absolute", color: "black", fontSize: 20, fontWeight: "700" }}>
        {room.roomTitle}
      </div>

      <div className="groupchat-close-icon" style={{ left: 359, top: 22, position: "absolute", cursor: "pointer" }}  onClick={handleClose}>✕</div>

      <div ref={chatContainerRef} style={{ position: "absolute", top: 100, left: 20, display: "flex", flexDirection: "column", gap: 10, width: 360, overflowY: "auto", height: 360 }}>
      {chatMessages.map((msg, index) => {
        
        const prevMsg = chatMessages[index - 1];
        const nextMsg = chatMessages[index + 1];
        const isSameUserAsBefore = prevMsg && prevMsg.userNo === msg.userNo;
        const isNewDate = !prevMsg || formatDate(prevMsg.receivedDate) !== formatDate(msg.receivedDate);
        // const isUnread = lastReadChatNo !== null && msg.chatNo > lastReadChatNo;
        const unread = isUnread(msg);  

        // 이전 메시지와 시간이 같은지 확인하여 시간 중복 표시 방지
        const showTime = !nextMsg || formatTime(nextMsg.receivedTime) !== formatTime(msg.receivedDate);

        return (
          <div key={msg.chatNo ? msg.chatNo : `msg-${index}`} style={{ display: "flex", flexDirection: "column", alignItems: msg.isMine ? "flex-end" : "flex-start", marginBottom: 10 }}>
            {isNewDate && (
              <div
                className="dividerDate"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "15px",
                  width: "100%",
                }}
              >
                <div className="left-divider" style={{ flex: 1, height: "1px", background: "#E0E0E0" }} />
                <div
                  className="noticechat-date"
                  style={{
                    margin: "0 10px",
                    color: "#4880FF",
                    fontSize: "11px",
                    fontFamily: "Roboto",
                    fontWeight: "500",
                    lineHeight: "10px",
                    letterSpacing: "0.5px",
                    whiteSpace: "nowrap",
                    width: "auto",
                  }}
                >
                  {formatDate(msg.receivedDate)}
                </div>
                <div className="right-divider" style={{ flex: 1, height: "1px", background: "#E0E0E0" }} />
              </div>
            )}

            {/* ✅ 안 읽은 메시지 표시 */}
            {unread && (
                <div style={{ fontSize: 10, color: "red", marginTop: 2, alignSelf: "flex-end" }}>{unreadCount > 0 && `안 읽은 메시지: ${unreadCount}개`}</div>
            )}

            {!msg.isMine && !isSameUserAsBefore && (
              <div style={{ display: "flex", alignItems: "center", marginTop: "3px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "#D9D9D9",
                    borderRadius: "25%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    marginRight: "8px",
                  }}
                >
                  <img style={{ width: "22px", height: "22px", objectFit: "cover" }} src={profile} alt="profile" />
                </div>
                <div style={{  marginTop: "0", fontSize: "15px", fontWeight: "bold", color: "#333" }}>{msg.userName}</div>
              </div>
              )}

              <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
                {!msg.isMine && (
                  <div
                    style={{
                      background: "#E9EBF1",
                      wordBreak: "break-word",
                      padding: "11px",
                      borderRadius: "7px",
                      fontSize: "12px",
                      color: "black",
                      maxWidth: "230px",
                      marginLeft: !msg.isMine ? "50px" : "0px",
                      marginRight: msg.isMine ? "5px" : "0px",
                      marginBottom: "-5px"
                    }}
                  >
                    {msg.message}
                  </div>
                )}
                {msg.isMine && (
                  <div
                    style={{
                      background: "#D2E3FF",
                      padding: "11px",
                      borderRadius: "7px",
                      fontSize: "12px",
                      color: "black",
                      maxWidth: "230px",
                      wordBreak: "break-word",
                      marginLeft: "0px",
                      marginRight: "5px",
                      marginBottom: "-5px",
                      marginTop: "2px",
                    }}
                  >
                    {msg.message}
                  </div>
                )}

                {/* 시간 표시 */}
                {showTime && (
                  <div
                    style={{
                      fontSize: 10,
                      color: "#B3B3B3",
                      position: "absolute",
                      bottom: -20,
                      right: msg.isMine ? "0px" : "0",
                      left: msg.isMine ? "0px" : "50px",
                    }}
                  >
                    {formatTime(msg.receivedDate)}
                  </div>
                )}
              </div>

              {/* {isUnread && (
                <div style={{ fontSize: 10, color: "red", marginTop: 2, alignSelf: "flex-end" }}>안 읽음</div>
              )} */}
            </div>
          );
        })}
      </div>
      
      

      <img className="bell" 
      //onClick={handleBellClick} 
      style={{ cursor: "pointer", width: 30, height: 30, left: 23, top: 545, position: "absolute" }} src={bell} alt="icon" />
        <img
          className="personplus"
          onClick={() => {
            console.log("멤버 추가 버튼 클릭됨"); // 디버깅 로그 추가
            setIsAddMemberPanelOpen(true); // ✅ 상태 업데이트
          }}
          style={{
            width: 30,
            height: 30,
            left: 69,
            top: 545,
            position: "absolute",
            cursor: "pointer",
          }}
          src={personplus}
          alt="icon"
        />


      <img className="exit" style={{ width: 30, height: 30, left: 116, top: 545, position: "absolute" }} src={exit} alt="icon" />

      <textarea value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="메세지 입력" maxLength={5000} style={{ position: "absolute", bottom: 70, left: "20px", width: "350px", height: "60px", borderRadius: "5px", border: "1.5px solid #ccc", padding: "10px", fontSize: "14px", resize: "none", overflowY: "auto" }} />

      <div onClick={sendMessage} style={{ position: "absolute", bottom: 23, left: 300, width: "70px", height: "35px", background: "#4880FF", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "14px", borderRadius: "5px", cursor: "pointer" }}>전송</div>
      
    </div>
  );
};

export default GroupChat;