import React, { useEffect, useState } from "react";
import profileIcon from "../../assets/Images/chat/profile.png";
import starFullIcon from "../../assets/Images/chat/starFull.png";
import star from "../../assets/Images/chat/star 62.png";
import noticeIcon from "../../assets/Images/chat/loud-speaker 11.png";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";

import { setFavorites } from "../../features/chatSlice";
import { Member } from "../../type/chatType";

interface ChatMainProps {
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  onProfileClick: (member: Member) => void; 
  onNoticeClick: () => void;
}

const ChatMain: React.FC<ChatMainProps> = ({
  selectedStatus,
  setSelectedStatus,
  onProfileClick,
  onNoticeClick,
}) => {
  // ✅ Redux에서 현재 로그인한 유저 정보 가져오기
  const user = useSelector((state: RootState) => state.user);
  
  // ✅ Redux에서 즐겨찾기 목록 가져오기 (한 번만 선언)
  const favorites = useSelector((state: RootState) => state.chat.favorites as { userNo: number; userName: string; deptName: string; positionName: string }[]);

  const dispatch = useDispatch();

  const [members, setMembers] = useState<
    { userNo: number; userName: string; deptName: string; positionName: string; status: string }[]
  >([]);

  // ✅ 1️⃣ 팀원 목록 불러오기
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:8003/workly/api/chat/members");
        setMembers(response.data);
      } catch (err) {
        console.error("❌ 멤버 목록 불러오기 실패", err);
      }
    };

    fetchMembers();
  }, []);

  // ✅ 2️⃣ 즐겨찾기 목록 불러오기 (최초 1회 실행)
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // 1️⃣ 로컬스토리지에서 데이터 가져오기 (최신 데이터가 아닐 수도 있음)
        const localFavorites = localStorage.getItem("favorites");
        if (localFavorites) {
          dispatch(setFavorites(JSON.parse(localFavorites)));
        }
  
        // 2️⃣ 백엔드에서 데이터 가져오기 (최신 데이터 반영)
        const response = await axios.get(`http://localhost:8003/workly/api/chat/favorite/${user.userNo}`);
        const dbFavorites = response.data.favorites ?? [];
  
        // 3️⃣ Redux 및 LocalStorage 동기화
        dispatch(setFavorites(dbFavorites));
        localStorage.setItem("favorites", JSON.stringify(dbFavorites));
      } catch (error) {
        console.error("❌ 즐겨찾기 목록 불러오기 실패:", error);
      }
    };
  
    if (user.userNo) fetchFavorites();
  }, [dispatch, user.userNo]);
  
  

  // ✅ Redux 상태가 변경될 때마다 console.log로 확인
  useEffect(() => {
  }, [favorites]);

  // ✅ 3️⃣ 즐겨찾기 추가/삭제
  const toggleFavorite = async (targetUser: { userNo: number; userName: string; deptName: string; positionName: string }) => {
    try {
      let updatedFavorites = [...favorites, targetUser]; // ✅ 객체 전체 저장!

  
      if (favorites.some(fav => fav.userNo === targetUser.userNo)) { // ✅ 객체 배열에서 비교
        await axios.delete("http://localhost:8003/workly/api/chat/favorite", {
          data: { userNo: user.userNo, favoriteNo: targetUser.userNo },
          headers: { "Content-Type": "application/json" },
        });
  
        updatedFavorites = favorites.filter(fav => fav.userNo !== targetUser.userNo);
      } else {
        await axios.post("http://localhost:8003/workly/api/chat/favorite", {
          userNo: user.userNo,
          favoriteNo: targetUser.userNo,
        });
  
        updatedFavorites = [...favorites, targetUser]; // ✅ 이제 객체를 추가
      }
  
      dispatch(setFavorites(updatedFavorites));
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  
      console.log("📌 즐겨찾기 업데이트 완료:", updatedFavorites);
    } catch (error) {
      console.error("❌ 즐겨찾기 토글 중 오류 발생:", error);
    }
  };
  
  

  // ✅ 4️⃣ 즐겨찾기 목록 필터링
  const favoriteUsers = members.filter((member) => favorites.some(fav => fav.userNo === member.userNo));


  // ✅ 5️⃣ 로그인한 유저 제외한 팀원 목록 필터링
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
          onClick={() => onProfileClick(user)}
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
        {favoriteUsers.length === 0 ? (
          <div style={{ height: "20px" }}>즐겨찾기 없음</div>
        ) : (
          favoriteUsers.map((member) => (
            <div key={member.userNo} className="memberCard" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => onProfileClick(member)}>
                <div className="memberProfile" style={{ width: "40px", height: "40px", background: "#D9D9D9", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img className="memberProfileIcon" style={{ width: "22px", height: "22px" }} src={profileIcon} alt="profile" />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <div>{member.userName}</div>
                </div>
              </div>
              <img src={starFullIcon} alt="star-full" style={{ cursor: "pointer", width: "15px" }} onClick={() => toggleFavorite(member)} />
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
          <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => onProfileClick(member)}>
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
              <div style={{ fontSize: "11px", color: member.status === "활성화" ? "#4880FF" : "#B3B3B3" }}>
                {member.status || "비활성화"}  {/* ✅ status 값이 없을 경우 기본값 "비활성화" */}
              </div>
            </div>
          </div>

          {/* 🔹 팀원 옆에 즐겨찾기 */}
        <img
          src={favorites.some(fav => fav.userNo === member.userNo) ? starFullIcon : star}
          alt="star"
          style={{ cursor: "pointer", width: "15px" }}
          onClick={() => toggleFavorite(member)}
        />
        </div>
      ))}
    </div>
  );
};

export default ChatMain; 