import profileIcon from "../../assets/Images/chat/profile.png";
import star from "../../assets/Images/chat/star 62.png";

const ChatMember = () => {
  return (
    <div 
      className="memberContainer" 
      style={{ 
        width: "274px",  
        position: "relative", 
        display: "flex", 
        flexDirection: "column", 
        paddingLeft: "10px",
        overflowY: "auto", 
        overflowX: "hidden",
        background: "white" // 배경색 추가
      }}
    >
      {/* 팀원 제목 */}
      <div 
        className="memberHeader" 
        style={{ 
          color: "#8C8C8D", 
          fontSize: "11px", 
          fontFamily: "'Roboto', sans-serif", 
          fontWeight: "500", 
          lineHeight: "16px", 
          letterSpacing: "0.5px",
          paddingBottom: "8px",
          borderBottom: "1px solid #E0E0E0", // 구분선 추가
          marginBottom: "8px"
        }}
      >
        팀원
      </div>

      {/* 팀원 목록 */}
      {[
        { name: "박솜이", status: "비활성화" },
        { name: "최웡카", status: "비활성화" },
        { name: "김기밤", status: "활성화" },
        { name: "채소염", status: "비활성화" },
      ].map((member, index) => (
        <div 
          key={index} 
          className="memberCard" 
          style={{ 
            width: "100%", 
            height: "50px", // ✅ 높이 조정 (더 자연스럽게)
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between", 
            padding: "5px 12px", // ✅ 내부 간격 조정
            background: "#F9F9F9", 
            borderRadius: "8px", 
            marginBottom: "5px"
          }}
        >
          {/* 프로필 이미지 */}
          <div 
            className="memberAvatarWrapper" 
            style={{ 
              width: "40px", 
              height: "42px", 
              background: "#D9D9D9", 
              borderRadius: "10px", 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center",
              overflow: "hidden"
            }}
          >
            <img 
              className="memberAvatarIcon" 
              style={{ width: "22px", height: "22px", objectFit: "cover" }} 
              src={profileIcon} 
              alt="avatar" 
            />
          </div>

          {/* 이름 및 상태 */}
          <div 
            className="memberInfo" 
            style={{ flexGrow: 1, marginLeft: "14px" }} // ✅ 적절한 간격 유지
          >
            <div 
              className="memberName" 
              style={{ 
                color: "black", 
                fontSize: "16px", 
                fontFamily: "'Inter', sans-serif", 
                fontWeight: "600", 
                lineHeight: "22.40px"
              }}
            >
              {member.name}
            </div>

            <div 
              className="memberStatus" 
              style={{ 
                color: "#B3B3B3", 
                fontSize: "11px", 
                fontFamily: "'Roboto', sans-serif", 
                fontWeight: "500", 
                lineHeight: "16px", 
                letterSpacing: "0.5px"
              }}
            >
              {member.status}
            </div>
          </div>

          {/* 별 아이콘 */}
          <img 
            className="memberStatusIcon" 
            style={{ 
              width: "15px", 
              height: "15px",
              marginRight: "5px" // ✅ 적절한 위치 조정
            }} 
            src={star} 
            alt="star" 
          />
        </div>
      ))}
    </div>
  );
};

export default ChatMember;
