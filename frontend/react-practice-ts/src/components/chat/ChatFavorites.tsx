import profileIcon from "../../assets/Images/chat/profile.png";
import starFullIcon from "../../assets/Images/chat/starFull.png";

const ChatFavorites = () => {
  return (
    <div 
      className="favoritesContainer" 
      style={{ 
        width: "274px", 
        height: "83px", 
        position: "relative", 
        display: "flex", 
        alignItems: "center", 
        paddingLeft: "10px"
      }}
    >
      {/* 즐겨찾기 타이틀 */}
      <div 
        className="favoritesTitle" 
        style={{ 
          position: "absolute", 
          left: "1px", 
          top: "0px", 
          color: "#8C8C8D", 
          fontSize: "11px", 
          fontFamily: "'Roboto', sans-serif", 
          fontWeight: "500", 
          lineHeight: "16px", 
          letterSpacing: "0.5px"
        }}
      >
        즐겨찾기
      </div>

      {/* 프로필 이미지 */}
      <div 
        className="favoritesProfileWrapper" 
        style={{ 
          width: "40px", 
          height: "42px",  
          background: "#D9D9D9",
          borderRadius: "10px",
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          overflow: "hidden",
          position: "absolute",
          left: "0px",
          top: "23px"
        }}
      >
        <img 
          src={profileIcon} 
          alt="profile" 
          style={{ width: "22px", height: "22px", objectFit: "cover" }} 
        />
      </div>

      {/* 사용자 정보 */}
      <div 
        className="favoritesInfo" 
        style={{ 
          position: "absolute",
          left: "54px",
          top: "23px"
        }}
      >
        <div 
          className="favoritesUserName" 
          style={{ 
            color: "black", 
            fontSize: "16px", 
            fontFamily: "'Inter', sans-serif", 
            fontWeight: "600", 
            lineHeight: "22.4px"
          }}
        >
          김예삐
        </div>
      </div>

      {/* 별 아이콘 */}
      <img 
        className="favoritesIcon" 
        style={{ 
          width: "15px", 
          height: "15px", 
          position: "absolute", 
          left: "235px", 
          top: "26px"
        }} 
        src={starFullIcon}
        alt="icon" 
      />

      {/* 구분선 */}
      <div 
        data-svg-wrapper 
        className="favoritesDivider" 
        style={{ 
          position: "absolute", 
          left: "0px", 
          top: "79px"
        }}
      >
        <svg width="274" height="2" viewBox="0 0 274 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.570833 1H273.429" stroke="#979797" strokeWidth="0.6" strokeLinecap="square" />
        </svg>
      </div>
    </div>
  );
};

export default ChatFavorites;
