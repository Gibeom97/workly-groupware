import React, { useState } from "react";
import profileIcon from "../../assets/Images/chat/profile.png";
import starFullIcon from "../../assets/Images/chat/starFull.png";
import star from "../../assets/Images/chat/star 62.png";
import noticeIcon from "../../assets/Images/chat/loud-speaker 11.png";

interface ChatMainProps {
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  onProfileClick: (name: string) => void;
  onNoticeClick: () => void;
}

const ChatMain: React.FC<ChatMainProps> = ({
  selectedStatus,
  setSelectedStatus,
  onProfileClick,
  onNoticeClick,
}) => {
  // 즐겨찾기 상태 관리
  const [favorites, setFavorites] = useState<string[]>(["김예삐"]);

  const toggleFavorite = (name: string) => {
    setFavorites((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  

  const members = ["김예삐", "박솜이", "최웡카", "김기밤", "채소염"];
  const memberStatus: Record<string, string> = {
  김예삐: "비활성화",
  박솜이: "비활성화",
  최웡카: "비활성화",
  김기밤: "활성화",
  채소염: "비활성화",
};

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
            cursor: "pointer",
          }}
          onClick={() => onProfileClick("김젤리")}
        >
          <img className="mineProfileIcon" style={{ width: "22px", height: "22px", objectFit: "cover" }} src={profileIcon} alt="profile" />
        </div>
        <div style={{ marginLeft: "10px" }}>
          <div className="mineUserName" style={{ fontSize: "16px", fontWeight: "600" }}>김젤리</div>
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
      <div style={{ marginBottom: "15px" }}>
        <div className="divider" style={{ width: "100%", height: "1px", background: "#E0E0E0" }} />
      </div>

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
      <div style={{ marginBottom: "15px" }}>
        <div className="divider" style={{ width: "100%", height: "1px", background: "#E0E0E0" }} />
      </div>

      {/* 🔹 즐겨찾기 */}
      <div style={{ marginBottom: "5px" }}>
        <div className="favoriteHeader" style={{ fontSize: "11px", fontWeight: "500", color: "#8C8C8D", marginBottom: "5px" }}>즐겨찾기</div>
        {members.filter(name => favorites.includes(name)).length === 0 ? (
          <div style={{ height: "20px" }}>{/* 빈 공간 확보 */}</div>
        ) : (
          members.filter(name => favorites.includes(name)).map((name) => (
            <div key={name} className="memberCard" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", cursor: 'pointer' }} onClick={() => onProfileClick(name)}>
                <div className="memberProfile" style={{ width: "40px", height: "40px", background: "#D9D9D9", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img className="memberProfileIcon" style={{ width: "22px", height: "22px", objectFit: "cover" }} src={profileIcon} alt="profile" />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <div>{name}</div>
                  <div style={{ fontSize: "11px", color: "#B3B3B3" }}>{memberStatus[name]}</div>
                </div>
              </div>
              <img src={starFullIcon} alt="star-full" style={{ cursor: 'pointer', width: '15px' }} onClick={() => toggleFavorite(name)} />
            </div>
          ))
        )}
        {/* 🔹 구분선 - 즐겨찾기와 팀원 사이 고정 */}
        <div className="divider" style={{ width: "100%", height: "1px", background: "#E0E0E0", marginTop: "5px" }} />
      </div>


      {/* 🔹 팀원 */}
      <div className="memberHeader" style={{ fontSize: "11px", fontWeight: "500", color: "#8C8C8D", marginBottom: "5px" }}>팀원</div>
      {members.map((name) => (
      <div key={name} className="memberCard" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", cursor: 'pointer' }} onClick={() => onProfileClick(name)}>
          {/* 🔹 프로필 사진 영역 복구 */}
          <div
            className="memberProfile"
            style={{
              width: "40px",
              height: "40px",
              background: "#D9D9D9",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              className="memberProfileIcon"
              style={{ width: "22px", height: "22px", objectFit: "cover" }}
              src={profileIcon}
              alt="profile"
            />
          </div>

          <div style={{ marginLeft: "10px" }}>
            <div>{name}</div>
            <div style={{ fontSize: "11px", color: "#B3B3B3" }}>{memberStatus[name]}</div>
          </div>
        </div>
        <img
          src={favorites.includes(name) ? starFullIcon : star}
          alt="star"
          style={{ cursor: 'pointer', width: '15px' }}
          onClick={() => toggleFavorite(name)}
        />
      </div>
    ))}

    </div>
  );
};

export default ChatMain;
