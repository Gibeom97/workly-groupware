import speaker from "../../assets/Images/chat/loud-speaker 11.png";
import profile from "../../assets/Images/chat/profile.png";
import bell from "../../assets/Images/chat/bell.png";
import personplus from "../../assets/Images/chat/personPlus.png";
import exit from "../../assets/Images/chat/exit.png";
import { useState } from "react";
import { Member } from "../../type/chatType";
import AddMemberPanel from "./AddMemberPanel";

const members: Member[] = [
  { userNo: 1, userName: '박솜이', positionNo: 3, deptNo: 1 },
  { userNo: 2, userName: '안관주', positionNo: 3, deptNo: 1 },
  { userNo: 3, userName: '임사윤', positionNo: 4, deptNo: 1 },
  { userNo: 4, userName: '김자수', positionNo: 7, deptNo: 1 },
  { userNo: 5, userName: '김예삐', positionNo: 8, deptNo: 2 },
  { userNo: 6, userName: '채소염', positionNo: 8, deptNo: 2 },
  { userNo: 7, userName: '최웡카', positionNo: 4, deptNo: 2 },
  { userNo: 8, userName: '김기밤', positionNo: 7, deptNo: 2 },
  { userNo: 9, userName: '김젤리', positionNo: 9, deptNo: 2 },
  { userNo: 10, userName: '이용휘', positionNo: 8, deptNo: 2 },
];

interface NoticeChatProps {
  onClose: () => void;
  // currentMembers: Member[]; // 백엔드 연결시 
  // onAddMembers: (newMembers: Member[]) => void;
}

const NoticeChat = ({ onClose }: NoticeChatProps) => {
  const [isAddMemberPanelOpen, setIsAddMemberPanelOpen] = useState(false);
  const [chatMembers, setChatMembers] = useState<Member[]>([]);
  const [allEmployees] = useState<Member[]>(members);

  const handlePersonPlusClick = () => {
    setIsAddMemberPanelOpen(true);
  };

  const handleAddMemberConfirm = (newMembers: Member[]) => {
    const filteredNewMembers = newMembers.filter(
      (newMember) => !chatMembers.some((member) => member.userNo === newMember.userNo)
    );

    if (filteredNewMembers.length === 0) {
      alert("이미 참여 중인 멤버입니다.");
      setIsAddMemberPanelOpen(false);
      return;
    }

    const updatedMembers = [...chatMembers, ...filteredNewMembers];
    setChatMembers(updatedMembers);

    alert(
      `새 멤버 초대 완료: ${filteredNewMembers.map((m) => m.userName).join(", ")}`
    );

    setIsAddMemberPanelOpen(false);
  };

  return (
    <div
      className="noticechat-container"
      style={{
        width: 390,
        height: 600,
        position: "relative",
      }}
    >
      <div
        className="noticechat-background"
        style={{
          width: 390,
          height: 600,
          position: "absolute",
          background: "white",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: 5,
        }}
      />

      <div
        className="noticechat-close-icon"
        style={{
          left: 359,
          top: 22,
          position: "absolute",
          cursor: "pointer",
        }}
        onClick={onClose}
      >
        ✕
      </div>

      <img
        className="speaker1"
        style={{
          width: 30,
          height: 30,
          left: 185,
          top: 20,
          position: "absolute",
        }}
        src={speaker}
        alt="icon"
      />

      <div
        className="noticechat-title"
        style={{
          left: 85,
          top: 26,
          position: "absolute",
          color: "black",
          fontSize: 16,
          fontFamily: "Nunito Sans",
          fontWeight: "700",
        }}
      >
        사내공지 톡방
      </div>

      <div
        className="noticechat-avatar"
        style={{
          width: 40,
          height: 40,
          left: 28,
          top: 21,
          position: "absolute",
          background: "#D9D9D9",
          borderRadius: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          className="profile1"
          style={{
            width: "22px",
            height: "22px",
            objectFit: "cover",
          }}
          src={profile}
          alt="profile"
        />
      </div>

      <div
        className="noticechat-content-group"
        style={{
          position: "absolute",
          top: "100px",
          left: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "350px",
        }}
      >
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
          <div
            className="left-divider"
            style={{ flex: 1, height: "1px", background: "#E0E0E0" }}
          />
          <div
            className="noticechat-date"
            style={{
              margin: "0 10px",
              color: "#4880FF",
              fontSize: "11px",
              fontFamily: "Roboto",
              fontWeight: "500",
              lineHeight: "5px",
              letterSpacing: "0.5px",
              whiteSpace: "nowrap",
              width: "auto",
            }}
          >
            2025년 2월 6일 목요일
          </div>
          <div
            className="right-divider"
            style={{ flex: 1, height: "1px", background: "#E0E0E0" }}
          />
        </div>
        <div>공지 내용 출력 부분</div>
      </div>

      {/* 멤버 초대 아이콘 */}
      <img
        className="personplus"
        onClick={handlePersonPlusClick}
        style={{
          width: 30,
          height: 30,
          left: 81,
          top: 545,
          position: "absolute",
          cursor: "pointer",
        }}
        src={personplus}
        alt="icon"
      />

      {isAddMemberPanelOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <AddMemberPanel
            allEmployees={allEmployees}
            currentMembers={chatMembers}
            onClose={() => setIsAddMemberPanelOpen(false)}
            onConfirm={handleAddMemberConfirm}
          />
        </div>
      )}

      {/* 나머지 아이콘들 */}
      <img
        className="bell"
        style={{
          width: 30,
          height: 30,
          left: 31,
          top: 545,
          position: "absolute",
        }}
        src={bell}
        alt="icon"
      />
      <img
        className="exit"
        style={{
          width: 30,
          height: 30,
          left: 131,
          top: 545,
          position: "absolute",
        }}
        src={exit}
        alt="icon"
      />
    </div>
  );
};

export default NoticeChat;
