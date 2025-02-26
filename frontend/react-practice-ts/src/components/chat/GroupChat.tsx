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
  onToggleAlarm : (ChatRoom:number, bellSetting: string) => void;
}

const GroupChat = ({ room, currentUser, onClose, messages = [] }: GroupChatProps) => {
  const [client, setClient] = useState<Client | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const subscriptionRef = useRef<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  
  
  // ✅ 서버에서 채팅 메시지 불러오기
  useEffect(() => {
    const savedMessages = localStorage.getItem(`chatMessages_${room.chatRoomNo}`);
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        if (Array.isArray(parsedMessages)) {
          setChatMessages(parsedMessages);
        } else {
          console.error("❌ 저장된 채팅 데이터가 배열이 아님:", parsedMessages);
          setChatMessages([]); // 잘못된 데이터라면 빈 배열로 초기화
        }
      } catch (error) {
        console.error("❌ JSON 파싱 오류:", error);
        setChatMessages([]); // 파싱 실패 시 빈 배열
      }
    }
  
    axios.get(`/chat/messages/${room.chatRoomNo}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          const updatedMessages = response.data.map(msg => ({
            ...msg,
            isMine: Number(msg.userNo) === Number(currentUser.userNo), 
          }));
          console.log("📌 서버에서 받은 메시지:", response.data);
          console.log("📌 현재 로그인한 사용자:", currentUser);

  
          localStorage.setItem(`chatMessages_${room.chatRoomNo}`, JSON.stringify(updatedMessages));
          setChatMessages(updatedMessages);
        } else {
          console.error("❌ 서버에서 반환된 데이터가 배열이 아님:", response.data);
        }
      })
      .catch((error) => {
        console.error("❌ 채팅 메시지 불러오기 실패", error);
      });
  }, [room.chatRoomNo]);

  useEffect(() => {
    console.log("📌 유저 변경 감지:", currentUser.userNo);
    
    setChatMessages((prevMessages) =>
      prevMessages.map(msg => ({
        ...msg,
        isMine: Number(msg.userNo) === Number(currentUser.userNo), // ✅ 로그인한 유저 변경 시, `isMine`을 다시 계산
      }))
    );
  }, [currentUser.userNo]); // ✅ `userNo` 변경될 때 실행
  

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
  
          if (!newMessage.userNo) {
            console.error("❌ [프론트엔드] 서버에서 userNo가 없음!", newMessage);
          }
  
          setChatMessages((prevMessages) => {
            if (prevMessages.some(msg => msg.chatNo === newMessage.chatNo)) {
              return prevMessages; // 중복이면 추가 X
            }
            return [...prevMessages, { ...newMessage, isMine: Number(newMessage.userNo) === Number(currentUser.userNo) }];
          });
          
  
          setTimeout(() => {
            chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: "smooth" });
          }, 100);
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
  const sendMessage = () => {
    if (!client || !client.connected || !inputMessage.trim()) return;
  
    const newMessage = {
      chatNo: chatMessages.length > 0 ? chatMessages[chatMessages.length - 1].chatNo + 1 : 1,
      userNo: currentUser.userNo,
      userName: currentUser.userName,
      chatRoomNo: room.chatRoomNo,
      message: inputMessage,
      receivedDate: new Date().toISOString(),
      isMine: true,
    };
  
    client.publish({
      destination: `/pub/chat/sendMessage/${room.chatRoomNo}`,
      body: JSON.stringify(newMessage),
    });
  
    // ✅ LocalStorage에도 반영
    const updatedMessages = [...chatMessages, newMessage];
    localStorage.setItem(`chatMessages_${room.chatRoomNo}`, JSON.stringify(updatedMessages));
  
    setChatMessages(updatedMessages);
    setInputMessage("");
  };
  

  return (
    <div className="group-chat" style={{ width: 390, height: 600, position: "relative" }}>
      <div className="groupchat-background" style={{ width: 390, height: 600, position: "absolute", background: "white", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: 5 }} />

      <div className="groupchat-close-icon" style={{ left: 359, top: 22, position: "absolute", cursor: "pointer" }} onClick={onClose}>✕</div>

      <div ref={chatContainerRef} style={{ position: "absolute", top: "100px", left: "20px", display: "flex", flexDirection: "column", gap: "10px", width: "350px", overflowY: "auto", height: "350px" }}>
      {Array.isArray(chatMessages) && chatMessages.map((msg, index) => (
        <div key={index} style={{ display: "flex", justifyContent: msg.isMine ? "flex-end" : "flex-start", alignItems: "center", marginBottom: "5px" }}>
          {!msg.isMine && (
            <img src={profile} alt="상대방 프로필" style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }} />
          )}
          <div style={{ background: msg.isMine ? "#D2E3FF" : "#FFFFFF", padding: "8px", borderRadius: "5px", fontSize: "11px", color: "black", maxWidth: "200px", wordBreak: "break-word" }}>
            {msg.message}
          </div>
        </div>
      ))}
      </div>

      <img className="file" style={{ width: 30, height: 30, left: 31, top: 545, position: "absolute" }} src={file} alt="icon" />
      <img className="bell" 
      //onClick={handleBellClick} 
      style={{ cursor: "pointer", width: 30, height: 30, left: 75, top: 545, position: "absolute" }} src={bell} alt="icon" />
      <img className="personplus" 
      //onClick={() => setIsAddMemberPanelOpen(true)}
       style={{ width: 30, height: 30, left: 121, top: 545, position: "absolute", cursor: "pointer" }} src={personplus} alt="icon" />
      <img className="exit" style={{ width: 30, height: 30, left: 168, top: 545, position: "absolute" }} src={exit} alt="icon" />

      <textarea value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="메세지 입력" maxLength={5000} style={{ position: "absolute", bottom: 70, left: "20px", width: "330px", height: "40px", borderRadius: "5px", border: "1.5px solid #ccc", padding: "10px", fontSize: "14px", resize: "none", overflowY: "auto" }} />

      <div onClick={sendMessage} style={{ position: "absolute", bottom: 23, left: 300, width: "70px", height: "35px", background: "#4880FF", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "14px", borderRadius: "5px", cursor: "pointer" }}>전송</div>
      
    </div>
  );
};

export default GroupChat;
