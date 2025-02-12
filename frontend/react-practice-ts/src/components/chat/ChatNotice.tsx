
import notice from "../../assets/Images/chat/loud-speaker 11.png";

const ChatNotice = () => {
  return (
    <div 
      className="noticeContainer" 
      style={{ width: "274px", height: "87px", position: "relative" }}
    >
      <div 
        className="noticeTitle" 
        style={{ left: "2px", top: "0px", position: "absolute", color: "#8C8C8D", fontSize: "11px", fontFamily: "'Roboto', sans-serif", fontWeight: "500", lineHeight: "16px", letterSpacing: "0.5px", wordWrap: "break-word" }}
      >
        공지사항
      </div>

      <div 
        className="noticeHeader" 
        style={{ left: "54px", top: "23px", position: "absolute", color: "black", fontSize: "16px", fontFamily: "'Inter', sans-serif", fontWeight: "600", lineHeight: "22.40px", wordWrap: "break-word" }}
      >
        사내 공지
      </div>

      <div 
        className="noticeLatest" 
        style={{ left: "54px", top: "51px", position: "absolute", color: "#4880FF", fontSize: "11px", fontFamily: "'Roboto', sans-serif", fontWeight: "500", lineHeight: "16px", letterSpacing: "0.5px", wordWrap: "break-word" }}
      >
        최신 공지사항 1번 제목임~~
      </div>

      <div 
        data-svg-wrapper 
        className="noticeDivider" 
        style={{ left: "0px", top: "83px", position: "absolute" }}
      >
        <svg width="274" height="2" viewBox="0 0 274 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.570833 1H273.429" stroke="#979797" strokeWidth="0.6" strokeLinecap="square" />
        </svg>
      </div>

      <img 
        className="noticeIcon" 
        style={{ width: "27px", height: "27px", left: "11px", top: "21px", position: "absolute" }} 
        src={notice} 
        alt="notice-icon" 
      />
    </div>
  );
};

export default ChatNotice;
