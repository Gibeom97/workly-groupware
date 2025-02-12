import profileIcon from "../../assets/Images/chat/profile.png";

const ChatMine = () => {
  return (
    <div 
      className="mineContainer" 
      style={{ width: "274px", height: "109px", position: "relative", paddingLeft: "16px" }} // ✅ 가로 시작 위치 통일
    >
      {/* 타이틀 (Workly) */}
      <div 
        className="mineTitleWrapper" 
        style={{ 
          width: "117px", height: "18px", left: "0px", top: "0px", 
          position: "absolute", justifyContent: "flex-start", alignItems: "center", display: "inline-flex"
        }}
      >
        <div 
          className="mineTitle" 
          style={{ width: "109.42px", color: "#4880FF", fontSize: "24px", fontFamily: "'Nunito Sans', sans-serif", fontWeight: "800", wordWrap: "break-word" }}
        >
          Workly
        </div>
      </div>

      {/* 검색 아이콘 */}
      <div 
        className="mineIconWrapper" 
        style={{ right: "16px", top: "4px", position: "absolute" }} // ✅ 다른 요소들과 동일한 간격 유지
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_55_3014)">
            <path 
              d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" 
              stroke="#757575" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_55_3014">
              <rect width="20" height="20" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* 프로필 영역 */}
      <div 
        className="mineProfileWrapper" 
        style={{ width: "251px", height: "41px", left: "0px", top: "48px", position: "absolute", display: "flex", alignItems: "center" }}
      >
        {/* 프로필 이미지 */}
        <div 
          className="mineProfileImageWrapper" 
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
            className="mineProfileIcon" 
            style={{ width: "22px", height: "22px", objectFit: "cover" }} 
            src={profileIcon} 
            alt="profile-icon" 
          />
        </div>

        {/* 이름 및 상태 */}
        <div 
          className="mineProfileInfo" 
          style={{ marginLeft: "10px", flexGrow: 1 }}
        >
          <div 
            className="mineProfileName" 
            style={{ color: "black", fontSize: "16px", fontFamily: "'Inter', sans-serif", fontWeight: "600", lineHeight: "22.40px" }}
          >
            김젤리
          </div>

          <div 
            className="mineProfileStatus" 
            style={{ color: "#B3B3B3", fontSize: "11px", fontFamily: "'Roboto', sans-serif", fontWeight: "500", lineHeight: "16px", letterSpacing: "0.5px" }}
          >
            활성화
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div 
        data-svg-wrapper 
        className="mineDivider" 
        style={{ left: "0px", top: "105px", position: "absolute" }}
      >
        <svg width="274" height="2" viewBox="0 0 274 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.570833 1H273.429" stroke="#979797" strokeWidth="0.6" strokeLinecap="square" />
        </svg>
      </div>
    </div>
  );
};

export default ChatMine;
