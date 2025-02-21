import React, { useEffect, useState } from "react";
import profileIcon from "../../assets/Images/chat/profile.png";
import starFullIcon from "../../assets/Images/chat/starFull.png";
import star from "../../assets/Images/chat/star 62.png";
import noticeIcon from "../../assets/Images/chat/loud-speaker 11.png";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { addFavorite, removeFavorite } from "../../features/chatSlice";



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
  // 🔹 Redux에서 현재 로그인한 유저 정보 가져오기
  const user = useSelector((state: RootState) => state.user);

  // 🔹 Redux에서 즐겨찾기 목록 가져오기
  const favorites = useSelector((state: RootState) => state.chat.favorites);
  const dispatch = useDispatch();

  const toggleFavorite = (name: string) => {
    if (favorites.includes(name)) {
      dispatch(removeFavorite(name));
    } else {
      dispatch(addFavorite(name));
    }
  };

  // 🔹 사원 목록 상태 관리
  const [members, setMembers] = useState<
    { userNo: number; userName: string; deptName: string; positionName: string }[]
  >([]);

  useEffect(() => {
    axios
      .get("http://localhost:8003/workly/api/chat/members")
      .then((res) => {
        setMembers(res.data);
      })
      .catch((err) => {
        console.error("멤버 목록 불러오기 실패", err);
      });
  }, []);

  // 🔹 로그인한 유저를 제외한 사원 목록 필터링
  const filteredMembers = members.filter((member) => member.userNo !== user.userNo);

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
      {/* 🔹 로그인한 유저 프로필 */}
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
          onClick={() => onProfileClick(user.userName)}
        >
          <img
            className="mineProfileIcon"
            style={{ width: "22px", height: "22px", objectFit: "cover" }}
            src={profileIcon}
            alt="profile"
          />
        </div>
        <div style={{ marginLeft: "10px" }}>
          <div className="mineUserName" style={{ fontSize: "16px", fontWeight: "600" }}>
            {user.userName}
          </div>
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


      {/* 🔹 즐겨찾기 목록 */}
      <div style={{ marginBottom: "5px" }}>
        <div className="favoriteHeader" style={{ fontSize: "11px", fontWeight: "500", color: "#8C8C8D", marginBottom: "5px" }}>
          즐겨찾기
        </div>
        {filteredMembers.filter((member) => favorites.includes(member.userName)).length === 0 ? (
          <div style={{ height: "20px" }}>{/* 빈 공간 확보 */}</div>
        ) : (
          filteredMembers
            .filter((member) => favorites.includes(member.userName))
            .map((member) => (
              <div
                key={member.userNo.toString()}
                className="memberCard"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => onProfileClick(member.userName)}>
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
                    <div>{member.userName}</div>
                  </div>
                </div>
                <img
                  src={starFullIcon}
                  alt="star-full"
                  style={{ cursor: "pointer", width: "15px" }}
                  onClick={() => toggleFavorite(member.userName)}
                />
              </div>
            ))
        )}
      </div>

      {/* 🔹 구분선 */}
      <div style={{ marginBottom: "15px" }}>
        <div className="divider" style={{ width: "100%", height: "1px", background: "#E0E0E0" }} />
      </div>

     {/* 🔹 팀원 목록 */}
      <div className="memberHeader" style={{ fontSize: "11px", fontWeight: "500", color: "#8C8C8D", marginBottom: "5px" }}>
        팀원
      </div>
      {filteredMembers.map((member) => (
        <div key={member.userNo} className="memberCard" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => onProfileClick(member.userName)}>
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
              <img className="memberProfileIcon" style={{ width: "22px", height: "22px", objectFit: "cover" }} src={profileIcon} alt="profile" />
            </div>
            <div style={{ marginLeft: "10px" }}>
              <div>{member.userName}</div>
            </div>
          </div>

          {/* 🔹 팀원 옆에 즐겨찾기(★) 아이콘 복구 */}
          <img
            src={favorites.includes(member.userName) ? starFullIcon : star}
            alt="star"
            style={{ cursor: "pointer", width: "15px" }}
            onClick={() => toggleFavorite(member.userName)}
          />
        </div>
      ))}

      
    </div>
  );
};

export default ChatMain;
