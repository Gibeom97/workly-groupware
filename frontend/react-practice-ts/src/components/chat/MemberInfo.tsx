import { useEffect, useState } from "react";
import axios from "axios";
import profileBig from "../../assets/Images/chat/profileBig.png";
import chatBig from "../../assets/Images/chat/chatBig.png";
import bell from "../../assets/Images/chat/bell.png";
import starBig from "../../assets/Images/chat/starBig.png";
import { defaultMember } from "../../type/chatType";

interface Member {
  userNo: number;
  userName: string;
  positionNo?: number;
  deptNo?: number;
  status?: string;
  deptName: string;
  positionName: string;
  email?: string;
  phone?: string;
  extension?: string;
  profileImg?: string;
}

type MemberInfoProps = {
  member?: Member;
  onClose: () => void;
  chatType?: string;
};

const MemberInfo = ({ member = defaultMember, onClose }: MemberInfoProps) => {
  const [profileImage, setProfileImage] = useState(profileBig);

  // ✅ 선택한 멤버의 프로필 이미지 가져오기
  const fetchMemberProfile = async () => {
    if (!member || !member.userNo) return;

    try {
      const response = await axios.get(`http://localhost:8003/workly/api/user/profile/${member.userNo}`);
      console.log(`📌 ${member.userName}의 프로필 이미지:`, response.data.profileImg);

      if (response.data.profileImg) {
        const imageUrl = response.data.profileImg.startsWith("http")
          ? response.data.profileImg
          : new URL(response.data.profileImg, "http://localhost:8003").href;
        
        setProfileImage(imageUrl);
      } else {
        setProfileImage(profileBig);
      }
    } catch (error) {
      console.error(`❌ ${member.userName}의 프로필 이미지 불러오기 실패:`, error);
      setProfileImage(profileBig);
    }
  };

  // ✅ 멤버 변경될 때마다 프로필 이미지 업데이트
  useEffect(() => {
    fetchMemberProfile();
  }, [member?.userNo]);

  return (
    <div
      className="meminfo"
      style={{
        width: 300,
        height: 500,
        backgroundColor: "white",
        paddingBottom: 16,
        marginLeft: "-10px",
        position: "relative",
      }}
    >
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: -45,
          right: 5,
          background: "transparent",
          border: "none",
          fontSize: 18,
          cursor: "pointer",
        }}
      >
        ✕
      </button>

      {/* 프로필 이미지 */}
      <div
        className="meminfo-profile"
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 40,
          paddingLeft: 75,
        }}
      >
        <img
          style={{ width: 100, height: 100, borderRadius: "50%" }}
          src={profileImage}
          alt="profile"
          onError={(e) => (e.currentTarget.src = profileBig)}
        />
      </div>

      {/* 멤버 정보 */}
      <div style={{ marginTop: 35, paddingLeft: 0, paddingRight: 16 }}>
        {[
          { label: "이름", value: member.userName },
          { label: "부서", value: member.deptName },
          { label: "직급", value: member.positionName },
          { label: "이메일", value: member.email },
          { label: "연락처", value: member.phone },
          { label: "내선번호", value: member.extension },
        ].map((item, index) => (
          <div key={index} style={{ display: "flex", marginBottom: 15 }}>
            <div
              style={{
                width: 90,
                color: "#979797",
                fontSize: 16,
                fontWeight: "600",
                fontFamily: "Inter",
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                color: "#202224",
                fontSize: 16,
                fontWeight: "600",
                fontFamily: "Inter",
              }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* 1:1 채팅, 알림 설정, 즐겨찾기 */}
      <div
        style={{
          display: "flex",
          gap: "25px",
          paddingTop: "35px",
          marginLeft: "15px",
          position: "relative",
        }}
      >
        {/* 1:1 채팅 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img className="chatBig" style={{ width: 28, height: 28 }} src={chatBig} alt="chat icon" />
          <span
            style={{
              fontSize: "14px",
              fontFamily: "Inter",
              fontWeight: "600",
              marginTop: "4px",
            }}
          >
            1:1 채팅
          </span>
        </div>

        {/* 알림 설정 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img className="bellBig" style={{ width: 28, height: 28 }} src={bell} alt="alarm icon" />
          <span
            style={{
              fontSize: "14px",
              fontFamily: "Inter",
              fontWeight: "600",
              marginTop: "4px",
            }}
          >
            알림 설정
          </span>
        </div>

        {/* 즐겨찾기 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img className="starBig" style={{ width: 28, height: 28 }} src={starBig} alt="favorite icon" />
          <span
            style={{
              fontSize: "14px",
              fontFamily: "Inter",
              fontWeight: "600",
              marginTop: "4px",
            }}
          >
            즐겨찾기
          </span>
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;
