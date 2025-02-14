
import React from "react";
import profileIcon from "../../assets/Images/chat/profile.png";
import starFullIcon from "../../assets/Images/chat/starFull.png";
import star from "../../assets/Images/chat/star 62.png";
import noticeIcon from "../../assets/Images/chat/loud-speaker 11.png";

interface ChatMainProps {
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  onProfileClick: (name: string) => void; // 프로필 클릭 이벤트 핸들러
  onNoticeClick: () => void; // 공지사항 클릭 이벤트 핸들러
}

const ChatMain: React.FC<ChatMainProps> = ({ selectedStatus, setSelectedStatus, onProfileClick, onNoticeClick }) => {
  return (
    <div
      className="main"
      style={{
        width: "245px",
        height: "490px",
        background: "#FFFFFF",
        borderRadius: "8px",
        padding: "20px 0px",
        fontFamily: "'Roboto', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 🔹 김젤리 프로필 */}
      <div className="mine" style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
        <div
          className="mineProfile"
          style={{
            width: "40px",
            height: "40px",
            background: "#D9D9D9",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer", // 프로필 사진에 커서 포인터 추가
          }}
          onClick={() => onProfileClick('채소염')}// 프로필 사진 클릭 이벤트
        >
          <img className="mineProfileIcon" style={{ width: "22px", height: "22px", objectFit: "cover" }} src={profileIcon} alt="profile" />
        </div>
        <div style={{ marginLeft: "10px" }}>
          <div className="mineUserName" style={{ fontSize: "16px", fontWeight: "600" }}>김젤리</div>

          {/* 🔹 상태 선택 드롭다운 */}
          <select
            className="mineStatusDropdown"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              fontSize: "11px",
              fontWeight: "500",
              color: "#202224",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "2px 6px",
              background: "white",
              cursor: "pointer",
              width: "100px",
            }}
          >
            <option value="활성화">활성화</option>
            <option value="비활성화">비활성화</option>
            <option value="회의중">회의중</option>
            <option value="자리비움">자리비움</option>
          </select>
        </div>
      </div>

      {/* 🔹 구분선 */}
      <div className="divider" style={{ width: "100%", height: "1px", background: "#E0E0E0", marginBottom: "15px" }} />

      {/* 🔹 사내 공지 */}
      <div className="notice" style={{ marginBottom: "15px", cursor: 'pointer' }} onClick={onNoticeClick}>
        <div className="noticeHeader" style={{ fontSize: "11px", fontWeight: "500", color: "#8C8C8D", marginBottom: "5px" }}>공지사항</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img className="noticeIcon" style={{ width: "30px", height: "30px", marginRight: "15px" }} src={noticeIcon} alt="공지 아이콘" />
          <div>
            <div className="noticeTitle" style={{ fontSize: "16px", fontWeight: "600" }}>사내 공지</div>
            <div className="noticeContent" style={{ fontSize: "11px", fontWeight: "500", color: "#4880FF" }}>최신 공지사항 1번 제목임~~</div>
          </div>
        </div>
      </div>

      {/* 🔹 구분선 */}
      <div className="divider" style={{ width: "100%", height: "1px", background: "#E0E0E0", marginBottom: "15px" }} />

      {/* 🔹 즐겨찾기 */}
      <div className="favorite" style={{ marginBottom: "15px" }}>
        <div className="favoriteHeader" style={{ fontSize: "11px", fontWeight: "500", color: "#8C8C8D", marginBottom: "5px" }}>즐겨찾기</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="favoriteProfile" style={{ width: "40px", height: "40px", background: "#D9D9D9", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img className="favoriteProfileIcon" style={{ width: "22px", height: "22px", objectFit: "cover" }} src={profileIcon} alt="profile" />
            </div>
            <div style={{ marginLeft: "10px" }}>
              <div className="favoriteUserName" style={{ fontSize: "16px", fontWeight: "600" }}>김예삐</div>
              <div className="favoriteStatus" style={{ fontSize: "11px", fontWeight: "500", color: "#B3B3B3" }}>비활성화</div>
            </div>
          </div>
          <img className="favoriteStarIcon" style={{ width: "15px", height: "15px" }} src={starFullIcon} alt="full-star"  />
        </div>
      </div>

      {/* 🔹 구분선 */}
      <div className="divider" style={{ width: "100%", height: "1px", background: "#E0E0E0", marginBottom: "15px" }} />

      {/* 🔹 팀원 */}
      <div className="memberHeader" style={{ fontSize: "11px", fontWeight: "500", color: "#8C8C8D", marginBottom: "5px" }}>팀원</div>

      {[ "박솜이", "최웡카", "김기밤", "채소염" ].map((name, index) => (
        <div key={index} className="memberCard" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="memberProfile" style={{ width: "40px", height: "40px", background: "#D9D9D9", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img className="memberProfileIcon" style={{ width: "22px", height: "22px", objectFit: "cover" }} src={profileIcon} alt="profile" />
            </div>
            <div style={{ marginLeft: "10px" }}>
              <div className="memberUserName" style={{ fontSize: "16px", fontWeight: "600" }}>{name}</div>
              <div className="memberStatus" style={{ fontSize: "11px", fontWeight: "500", color: "#B3B3B3" }}>{name === "김기밤" ? "활성화" : "비활성화"}</div>
            </div>
          </div>
          <img className="memberStarIcon" style={{ width: "15px", height: "15px" }} src={star} alt="star" />
        </div>
      ))}
    </div>
  );
};

export default ChatMain;
