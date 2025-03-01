import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import axios from "axios";
import profile from "../../assets/Images/chat/profile.png";
import file from "../../assets/Images/chat/file.png";
import bell from "../../assets/Images/chat/bellGray.png";
import personplus from "../../assets/Images/chat/personPlus.png";
import exit from "../../assets/Images/chat/exit.png";
import { Member } from "../../type/chatType";
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; 
import utc from "dayjs/plugin/utc";

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
  onClose: () => void;
  messages?: ChatMessage[];
  onToggleAlarm: (ChatRoom: number, bellSetting: string) => void;
}

const GroupChat = ({ room, currentUser, onClose, messages = [] }: GroupChatProps) => {
  const [client, setClient] = useState<Client | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const subscriptionRef = useRef<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [lastReadChatNo, setLastReadChatNo] = useState<number | null>(null);

  // ✅ 날짜 및 시간 변환 함수
  const formatDate = (dateString: string) => {
    return dayjs.utc(dateString).local().locale("ko").format("YYYY년 MM월 DD일 dddd");
  };

  const formatTime = (dateString: string) => {
    return dayjs.utc(dateString).local().format("HH:mm");
  };

  // ✅ 채팅 메시지 불러오기 (비동기 함수)
  const fetchMessages = async () => {
    try {
      await axios.post(`http://localhost:8003/workly/api/chat/enter/${room.chatRoomNo}/${currentUser.userNo}`);
      const response = await axios.get(`http://localhost:8003/workly/api/chat/messages/${room.chatRoomNo}`);
  
      if (Array.isArray(response.data)) {
        setChatMessages(response.data.map(msg => ({
          ...msg,
          isMine: Number(msg.userNo) === Number(currentUser.userNo),
        })));
      } else {
        console.error("❌ 서버에서 반환된 데이터가 배열이 아님:", response.data);
      }
    } catch (error) {
      console.error("❌ 채팅 메시지 불러오기 실패", error);
    }
  };
  
  
  useEffect(() => {
    fetchMessages(); 
  }, [room.chatRoomNo]);
  


  // ✅ 마지막 읽은 메시지 가져오기
  useEffect(() => {
    axios.get(`http://localhost:8003/workly/api/chat/lastRead/${room.chatRoomNo}/${currentUser.userNo}`)
      .then(response => {
        setLastReadChatNo(response.data); // ✅ 데이터가 바로 정수값이므로 그대로 사용
      })
      .catch(() => setLastReadChatNo(null));
}, [room.chatRoomNo, currentUser.userNo]);


  

  // // ✅ 채팅 메시지 및 마지막 읽은 메시지 불러오기 (useEffect)
  // useEffect(() => {
  //   fetchMessages();
  //   fetchLastReadChatNo();
  // }, [room.chatRoomNo]);

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
    axios.get(`http://localhost:8003/workly/api/chat/messages/${room.chatRoomNo}`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setChatMessages(response.data);
        }
      })
      .catch(error => console.error("❌ 채팅 메시지 불러오기 실패", error));
  }, [room.chatRoomNo]);
  

  // ✅ WebSocket 연결 및 메시지 수신
  useEffect(() => {
    const sock = new SockJS("http://localhost:8003/workly/ws-stomp");
    const stompClient = new Client({
      webSocketFactory: () => sock,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("🟢 [프론트엔드] WebSocket Connected");
  
        if (subscriptionRef.current) {
          stompClient.unsubscribe(subscriptionRef.current);
        }
  
        const subscription = stompClient.subscribe(`/sub/chatRoom/${room.chatRoomNo}`, (message) => {
          const newMessage: ChatMessage = JSON.parse(message.body);
          console.log("📩 [프론트엔드] 새 메시지 수신:", newMessage);
  
          setChatMessages((prevMessages) => [...prevMessages, {
            ...newMessage,
            isMine: Number(newMessage.userNo) === Number(currentUser.userNo),
          }]);
        });
  
        subscriptionRef.current = subscription.id;
        setClient(stompClient);
      },
      onDisconnect: () => {
        console.log("🔴 [프론트엔드] WebSocket Disconnected");
      },
      onStompError: (frame) => {
        console.error("❌ [프론트엔드] WebSocket STOMP Error:", frame);
      },
    });
  
    stompClient.activate();
  
    return () => {
      if (subscriptionRef.current && stompClient) {
        stompClient.unsubscribe(subscriptionRef.current);
      }
      stompClient.deactivate();
    };
  }, [room.chatRoomNo]);
  
  // ✅ 메시지 전송 함수
  const sendMessage = async () => {
    if (!client || !client.connected || !inputMessage.trim()) return;
  
    const newMessage = {
      userNo: currentUser.userNo,
      userName: currentUser.userName,
      chatRoomNo: room.chatRoomNo,
      message: inputMessage,
      receivedDate: new Date().toISOString(),
      isMine: true,
    };
  
    try {
      const response = await axios.post(`http://localhost:8003/workly/api/chat/saveMessage`, newMessage);
      const savedMessage = response.data;
  
      // ✅ WebSocket을 통해 메시지 전송
      client.publish({
        destination: `/pub/chat/sendMessage/${room.chatRoomNo}`,
        body: JSON.stringify(savedMessage),
      });
  
      setChatMessages(prevMessages => [...prevMessages, savedMessage]);
      setInputMessage("");
    } catch (error) {
      console.error("❌ 채팅 메시지 저장 실패", error);
    }
  };
  
  
  

  

  return (
    <div className="group-chat" style={{ width: 390, height: 600, position: "relative" }}>
      <div className="groupchat-background" style={{ width: 390, height: 600, position: "absolute", background: "white", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: 5 }} />
        
       {/* 채팅방 이름 표시 */}
       <div className="groupchat-title" style={{ left: 20, top: 26, position: "absolute", color: "black", fontSize: 20, fontWeight: "700" }}>
        {room.roomTitle}
      </div>

      <div className="groupchat-close-icon" style={{ left: 359, top: 22, position: "absolute", cursor: "pointer" }} onClick={onClose}>✕</div>

      <div ref={chatContainerRef} style={{ position: "absolute", top: 100, left: 20, display: "flex", flexDirection: "column", gap: 10, width: 360, overflowY: "auto", height: 360 }}>
      {chatMessages.map((msg, index) => {
        const prevMsg = chatMessages[index - 1];
        const nextMsg = chatMessages[index + 1];
        const isSameUserAsBefore = prevMsg && prevMsg.userNo === msg.userNo;
        const isNewDate = !prevMsg || formatDate(prevMsg.receivedDate) !== formatDate(msg.receivedDate);
        const isUnread = lastReadChatNo !== null && msg.chatNo > lastReadChatNo;

        // 이전 메시지와 시간이 같은지 확인하여 시간 중복 표시 방지
        const showTime = !nextMsg || formatTime(nextMsg.receivedDate) !== formatTime(msg.receivedDate);

        return (
          <div key={msg.chatNo} style={{ display: "flex", flexDirection: "column", alignItems: msg.isMine ? "flex-end" : "flex-start", marginBottom: 10}}>
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
                      marginBottom: "-2px"
                    }}
                  >
                    {msg.message}
                  </div>
                )}

                




새 항목

2:14
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
                      right: msg.isMine ? "0px" : "-30",
                      left: msg.isMine ? "0px" : "50px",
                    }}
                  >
                    {formatTime(msg.receivedDate)}
                  </div>
                )}
              </div>

              {isUnread && (
                <div style={{ fontSize: 10, color: "red", marginTop: 2, alignSelf: "flex-end" }}>안 읽음</div>
              )}
            </div>
          );
        })}
      </div>

      <img className="file" style={{ width: 30, height: 30, left: 31, top: 545, position: "absolute" }} src={file} alt="icon" />
      <img className="bell" 
      //onClick={handleBellClick} 
      style={{ cursor: "pointer", width: 30, height: 30, left: 75, top: 545, position: "absolute" }} src={bell} alt="icon" />
      <img className="personplus" 
      //onClick={() => setIsAddMemberPanelOpen(true)}
       style={{ width: 30, height: 30, left: 121, top: 545, position: "absolute", cursor: "pointer" }} src={personplus} alt="icon" />
      <img className="exit" style={{ width: 30, height: 30, left: 168, top: 545, position: "absolute" }} src={exit} alt="icon" />

      <textarea value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="메세지 입력" maxLength={5000} style={{ position: "absolute", bottom: 70, left: "20px", width: "350px", height: "60px", borderRadius: "5px", border: "1.5px solid #ccc", padding: "10px", fontSize: "14px", resize: "none", overflowY: "auto" }} />

      <div onClick={sendMessage} style={{ position: "absolute", bottom: 23, left: 300, width: "70px", height: "35px", background: "#4880FF", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "14px", borderRadius: "5px", cursor: "pointer" }}>전송</div>
      
    </div>
  );
};

export default GroupChat;