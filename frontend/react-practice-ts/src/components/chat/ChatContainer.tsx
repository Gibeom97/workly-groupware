import profileIcon from "../../assets/Images/chat/profile.png";
import chatIcon from "../../assets/Images/chat/chat.png";
import peopleIcon from "../../assets/Images/chat/people.png";
import bellIcon from "../../assets/Images/chat/bell.png";
import settingIcon from "../../assets/Images/chat/setting.png";

const ChatContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div 
      className="containerWrapper" 
      style={{ 
        width: "390px", 
        height: "600px", 
        position: "relative", 
        display: "flex", 
        overflowX: "hidden"  // 📌 좌우 스크롤 방지
      }}
    >
      {/* 전체 배경 */}
      <div 
        className="containerBackground" 
        style={{ 
          width: "390px", height: "600px", left: "0px", top: "0px", position: "absolute", 
          background: "white",/* boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",*/ borderRadius: "5px" 
        }}
      ></div>

      {/* 헤더 영역 */}
      <div 
        className="containerHeader" 
        style={{ width: "390px", height: "30px", left: "0px", top: "0px", position: "absolute", background: "#E9EBF1" }}
      ></div>

      <div 
        className="containerHeaderLogoWrapper" 
        style={{ 
          position: "absolute", 
          left: "12px", top: "7px",  
          fontSize: "16px", fontFamily: "'Nunito Sans', sans-serif", fontWeight: "800",
          color: "#4880FF", display: "inline-block" 
        }}
      >
        Workly
      </div>

      {/* 닫기 버튼 (X) */}
      <div 
        className="containerHeaderCloseButton" 
        style={{ left: "370px", top: "4px", position: "absolute", cursor: "pointer" }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M1 1L9 9M9 1L1 9" 
            stroke="#757575" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>

      {/* 사이드바 영역 */}
      <div 
        className="containerSidebar" 
        style={{ width: "70px", height: "570px", left: "0px", top: "30px", position: "absolute", background: "#E9EBF1" }}
      ></div>

      {/* 네비게이션 아이콘 */}
      <img className="profile" style={{ width: "31px", height: "31px", left: "20px", top: "50px", position: "absolute" }} src={profileIcon} alt="icon1" />
      <img className="chat" style={{ width: "35px", height: "35px", left: "18px", top: "100px", position: "absolute" }} src={chatIcon} alt="icon2" />
      <img className="people" style={{ width: "31px", height: "31px", left: "20px", top: "150px", position: "absolute" }} src={peopleIcon} alt="icon3" />
      <img className="bell" style={{ width: "31px", height: "31px", left: "20px", top: "500px", position: "absolute" }} src={bellIcon} alt="icon4" />
      <img className="setting" style={{ width: "31px", height: "31px", left: "20px", top: "550px", position: "absolute" }} src={settingIcon} alt="icon5" />
      
      {/* 📌 자식 컴포넌트가 들어가는 영역 */}
      <div 
        className="containerContent" 
        style={{ 
          flex: 1, 
          position: "absolute", 
          top: "30px", 
          left: "70px", 
          width: "100%",  // 📌 가로 길이를 자동으로 조정
          height: "570px", 
          overflowY: "auto", // 세로 스크롤 유지
          overflowX: "hidden", // 📌 좌우 스크롤 제거
          padding: "15px"
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ChatContainer;
