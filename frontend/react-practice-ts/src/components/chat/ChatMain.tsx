import React, { useEffect, useState } from "react";
import profileIcon from "../../assets/Images/chat/profile.png";
import totalprofileIcon from "../../assets/Images/chat/totalprofile.png";
import starFullIcon from "../../assets/Images/chat/starFull.png";
import star from "../../assets/Images/chat/star 62.png";
import noticeIcon from "../../assets/Images/chat/loud-speaker 11.png";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setFavorites } from "../../features/chatSlice";
import { Member } from "../../type/chatType";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";


interface ChatMainProps {
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  onProfileClick: (member: Member) => void;
  onNoticeClick: () => void;
}

interface MemberWithStatus {
  userNo: number;
  userName: string;
  deptName: string;
  positionName: string;
  chatStatus: string;   // "활성화" 또는 "비활성화"
  statusType: number;   // 1 또는 2
  profileImg?: string;
}

const ChatMain: React.FC<ChatMainProps> = ({
  selectedStatus,
  setSelectedStatus,
  onProfileClick,
  onNoticeClick,
}) => {
  // Redux
  const user = useSelector((state: RootState) => state.user);
  const favorites = useSelector(
    (state: RootState) =>
      state.chat.favorites as {
        userNo: number;
        userName: string;
        deptName: string;
        positionName: string;
      }[]
  );
  const dispatch = useDispatch();

  // 로컬 상태
  const [members, setMembers] = useState<MemberWithStatus[]>([]);
  const [profileImage, setProfileImage] = useState(profileIcon);

  // 1) 전체 멤버 불러오기
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8003/workly/api/chat/members"
        );
        // 서버에서 chatStatus, statusType을 함께 내려준다고 가정
        const membersWithProfile = await Promise.all(
          response.data.map(async (member: MemberWithStatus) => {
            try {
              const profileResponse = await axios.get(
                `http://localhost:8003/workly/api/user/profile/${member.userNo}`
              );
              return {
                ...member,
                profileImg: profileResponse.data.profileImg || profileIcon,
              };
            } catch {
              return { ...member, profileImg: profileIcon };
            }
          })
        );
        setMembers(membersWithProfile);
      } catch (err) {
        console.error("❌ 멤버 목록 불러오기 실패", err);
      }
    };
    fetchMembers();
  }, []);

  // 2) 즐겨찾기 목록 불러오기
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const localFavorites = localStorage.getItem("favorites");
        if (localFavorites) {
          dispatch(setFavorites(JSON.parse(localFavorites)));
        }
        const response = await axios.get(
          `http://localhost:8003/workly/api/chat/favorite/${user.userNo}`
        );
        const dbFavorites = response.data.favorites ?? [];
        dispatch(setFavorites(dbFavorites));
        localStorage.setItem("favorites", JSON.stringify(dbFavorites));
      } catch (error) {
        console.error("❌ 즐겨찾기 목록 불러오기 실패:", error);
      }
    };
    if (user.userNo) fetchFavorites();
  }, [dispatch, user.userNo]);

  // 3) 즐겨찾기 추가/삭제
  const toggleFavorite = async (targetUser: {
    userNo: number;
    userName: string;
    deptName: string;
    positionName: string;
  }) => {
    try {
      let updatedFavorites = [...favorites, targetUser];
      if (favorites.some((fav) => fav.userNo === targetUser.userNo)) {
        await axios.delete("http://localhost:8003/workly/api/chat/favorite", {
          data: { userNo: user.userNo, favoriteNo: targetUser.userNo },
          headers: { "Content-Type": "application/json" },
        });
        updatedFavorites = favorites.filter(
          (fav) => fav.userNo !== targetUser.userNo
        );
      } else {
        await axios.post("http://localhost:8003/workly/api/chat/favorite", {
          userNo: user.userNo,
          favoriteNo: targetUser.userNo,
        });
        updatedFavorites = [...favorites, targetUser];
      }
      dispatch(setFavorites(updatedFavorites));
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      console.log("📌 즐겨찾기 업데이트 완료:", updatedFavorites);
    } catch (error) {
      console.error("❌ 즐겨찾기 토글 중 오류 발생:", error);
    }
  };

  // 4) 내 프로필 이미지 불러오기
  useEffect(() => {
    axios
      .get(`http://localhost:8003/workly/api/user/profile/${user.userNo}`)
      .then((response) => {
        console.log("📌 서버에서 받은 프로필 이미지:", response.data.profileImg);
        setProfileImage(response.data.profileImg);
      })
      .catch(() => setProfileImage(profileIcon));
  }, [user.userNo]);

  // 5) 프로필 이미지를 다시 불러오기 (선택사항)
  const fetchProfileImages = async () => {
    try {
      const updatedMembers = await Promise.all(
        members.map(async (member) => {
          try {
            const response = await axios.get(
              `http://localhost:8003/workly/api/user/profile/${member.userNo}`
            );
            return {
              ...member,
              profileImg: response.data.profileImg || profileIcon,
            };
          } catch {
            return { ...member, profileImg: profileIcon };
          }
        })
      );
      setMembers(updatedMembers);
    } catch (error) {
      console.error("❌ 팀원 프로필 이미지 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    // members.length가 바뀔 때만 fetchProfileImages를 실행할지 여부는 선택
    fetchProfileImages();
  }, [members.length]);

  // 즐겨찾기, 팀원 목록 필터
  const favoriteUsers = members.filter((m) =>
    favorites.some((fav) => fav.userNo === m.userNo)
  );
  const filteredMembers = members.filter((m) => m.userNo !== user.userNo);

  //  상태 변경 핸들러
  const handleChangeStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatusText = e.target.value; // "활성화" or "비활성화"
    setSelectedStatus(newStatusText);

    const newStatusType = newStatusText === "활성화" ? 2 : 1;

    try {
      // 6-1) DB 업데이트
      await axios.put(
        `http://localhost:8003/workly/api/chat/status/${user.userNo}`,
        { statusType: newStatusType }
      );

      // 6-2) **로컬 members 배열에서 해당 회원만** 상태값 변경
      setMembers((prev) =>
        prev.map((member) =>
          member.userNo === user.userNo
            ? {
                ...member,
                chatStatus: newStatusText,
                statusType: newStatusType,
              }
            : member
        )
      );

      console.log("회원 상태 업데이트 성공:", newStatusType);
    } catch (error) {
      console.error("회원 상태 업데이트 실패:", error);
    }
  };

  // 멤버 상태값 변경 실시간
  useEffect(() => {
    // Client 생성
    const stompClient = new Client({
      brokerURL: "ws://localhost:8003/ws-stomp/websocket", // 웹소켓 엔드포인트 (필요에 따라 변경)
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => {
        console.log(str);
      },
    });
  
    stompClient.onConnect = (frame) => {
      // "/sub/status" 채널 구독
      stompClient.subscribe("/sub/status", (message) => { // Update 붙여놓기
        const statusUpdate = JSON.parse(message.body);
        console.log("실시간 상태 업데이트 수신:", statusUpdate);
        setMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.userNo === statusUpdate.userNo
              ? {
                  ...member,
                  statusType: statusUpdate.statusType,
                  chatStatus: statusUpdate.statusType === 2 ? "활성화" : "비활성화",
                }
              : member
          )
        );
      });
    };
  
    // 연결 시작
    stompClient.activate();
  
    // 컴포넌트 언마운트 시 연결 종료
    return () => {
      stompClient.deactivate();
    };
  }, []);
  
  

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
      {/* 내 프로필 영역 */}
      <div
        className="mine"
        style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}
      >
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
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
            src={profileImage}
            alt="profile"
            onError={(e) => {
              e.currentTarget.src = totalprofileIcon;
            }}
          />
        </div>

        <div style={{ marginLeft: "10px" }}>
          <div
            className="mineUserName"
            style={{ fontSize: "16px", fontWeight: "600" }}
          >
            {user.userName}
          </div>
          <select
            className="mineStatusDropdown"
            value={selectedStatus}
            onChange={handleChangeStatus}
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
          </select>
        </div>
      </div>

      {/* 구분선 */}
      <div style={{ marginBottom: "15px" }}>
        <div
          className="divider"
          style={{ width: "100%", height: "1px", background: "#E0E0E0" }}
        />
      </div>

      {/* 사내 공지 */}
      <div
        className="notice"
        style={{ marginBottom: "15px", cursor: "pointer" }}
        onClick={onNoticeClick}
      >
        <div
          className="noticeHeader"
          style={{
            fontSize: "11px",
            fontWeight: "500",
            color: "#8C8C8D",
            marginBottom: "5px",
          }}
        >
          공지사항
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            className="noticeIcon"
            style={{ width: "30px", height: "30px", marginRight: "15px" }}
            src={noticeIcon}
            alt="공지 아이콘"
          />
          <div>
            <div
              className="noticeTitle"
              style={{ fontSize: "16px", fontWeight: "600" }}
            >
              사내 공지
            </div>
            <div
              className="noticeContent"
              style={{
                fontSize: "11px",
                fontWeight: "500",
                color: "#4880FF",
              }}
            >
              최신 공지사항 1번 제목임~~
            </div>
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div style={{ marginBottom: "15px" }}>
        <div
          className="divider"
          style={{ width: "100%", height: "1px", background: "#E0E0E0" }}
        />
      </div>

      {/* 즐겨찾기 목록 */}
      <div style={{ marginBottom: "5px" }}>
        <div
          className="favoriteHeader"
          style={{
            fontSize: "11px",
            fontWeight: "500",
            color: "#8C8C8D",
            marginBottom: "5px",
          }}
        >
          즐겨찾기
        </div>
        {favoriteUsers.length === 0 ? (
          <div style={{ height: "20px" }}>즐겨찾기 없음</div>
        ) : (
          favoriteUsers.map((member) => (
            <div
              key={member.userNo}
              className="memberCard"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                onClick={() => onProfileClick(member)}
              >
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
                    style={{ width: "22px", height: "22px" }}
                    src={profileIcon }
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
                onClick={() => toggleFavorite(member)}
              />
            </div>
          ))
        )}
      </div>

      {/* 구분선 */}
      <div style={{ marginBottom: "15px" }}>
        <div
          className="divider"
          style={{ width: "100%", height: "1px", background: "#E0E0E0" }}
        />
      </div>

      {/* 팀원 목록 */}
      <div
        className="memberHeader"
        style={{
          fontSize: "11px",
          fontWeight: "500",
          color: "#8C8C8D",
          marginBottom: "5px",
        }}
      >
        팀원
      </div>
      {filteredMembers.map((member) => (
  <div
    key={member.userNo}
    className="memberCard"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "10px",
    }}
  >
    <div
      style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      onClick={() => onProfileClick(member)}
    >
      {/* 
        1) member.profileImg가 존재하면 업로드된 프로필로 표시
        2) 로딩 실패 시 onError를 통해 기본 아이콘으로 대체
        3) member.profileImg가 없거나 빈 문자열이면 기본 아이콘(div)으로 표시 
      */}
      {member.profileImg ? (
        <img
          className="memberProfileIcon"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            objectFit: "cover",
          }}
          src={member.profileImg}
          alt="profile"
          onError={(e) => {
            // 이미지 로딩 실패 시 기본 아이콘으로 교체
            e.currentTarget.onerror = null;
            e.currentTarget.src = totalprofileIcon;
            // e.currentTarget.style = 'width:22px; height:22px;' // 만약 실패 시에도 사이즈를 작게 하고 싶다면
          }}
        />
      ) : (
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
            style={{ width: "22px", height: "22px" }}
            src={profileIcon}
            alt="profile"
          />
        </div>
      )}
      <div style={{ marginLeft: "10px" }}>
        <div>{member.userName}</div>
        <div
          style={{
            fontSize: "11px",
            color: member.chatStatus === "활성화" ? "#4880FF" : "#B3B3B3",
          }}
        >
          {member.chatStatus || "비활성화"}
        </div>
      </div>
    </div>
    <img
      src={
        favorites.some((fav) => fav.userNo === member.userNo)
          ? starFullIcon
          : star
      }
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
