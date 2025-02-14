import chatIcon from "../../assets/Images/chat/chatBiggest.png";
import group from "../../assets/Images/chat/groupChat.png";
import searchIcon from "../../assets/Images/chat/search.png"; // 🔍 검색 아이콘 이미지 임포트 (파일경로는 네 프로젝트에 맞게 수정해)

// const handleCloseCreateChat = () => {
//     setIsCreatingChat(false); // ChatNewList로 돌아가기
//   };

const ChatCreate = (
    {invitePeople, onClose} : {invitePeople : () => void, onClose: ()=> void}) => {
  return (
    <div
      className="ChatCreate"
      style={{
        width: 390,
        height: 600,
        position: "relative",
      }}
    >
      <div
        className="ChatCreate-Background"
        style={{
          width: 390,
          height: 600,
          left: 0,
          top: 0,
          position: "absolute",
          background: "white",
          borderRadius: 5,
        }}
      />
      <div
        className="ChatCreate-HeaderBackground"
        style={{
          width: 390,
          height: 170.18,
          left: 0,
          top: 0,
          position: "absolute",
          background: "#E9EBF1",
          borderRadius: 5,
        }}
      />
      <div
        className="ChatCreate-TitleWrapper"
        style={{
          width: 95,
          height: 19.64,
          paddingBottom: 1.64,
          paddingRight: 6.16,
          left: 23,
          top: 19.64,
          position: "absolute",
          borderRadius: 5,
          justifyContent: "flex-start",
          alignItems: "center",
          display: "inline-flex",
        }}
      >
        <div
          className="ChatCreate-TitleText"
          style={{
            width: 88.84,
            color: "#4880FF",
            fontSize: 16,
            fontFamily: "Nunito Sans",
            fontWeight: "800",
            wordWrap: "break-word",
          }}
        >
          New Chat
        </div>
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
      </div>

      {/* 1:1 채팅 */}
      <div
        style={{
          position: "absolute",
          top: "60px",
          left: "110px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          className="chat"
          style={{ width: "60px", height: "60px" }}
          src={chatIcon}
          alt="1:1 채팅 아이콘"
        />
        <span
          style={{
            marginTop: "8px",
            fontSize: "14px",
            fontFamily: "Inter",
            fontWeight: "600",
            color: "#202224",
          }}
        >
          1:1 채팅
        </span>
      </div>

      {/* 그룹 채팅 */}
      <div
        style={{
          position: "absolute",
          top: "60px",
          left: "230px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          className="group-chat"
          style={{ width: "60px", height: "60px" }}
          src={group}
          alt="그룹 채팅 아이콘"
        />
        <span
          style={{
            marginTop: "8px",
            fontSize: "14px",
            fontFamily: "Inter",
            fontWeight: "600",
            color: "#202224",
          }}
        >
          그룹 채팅
        </span>
      </div>

      {/* 채팅방 정보 설정 카드 */}
      <div
        className="ChatCreate-InfoCard"
        style={{
          width: 300,
          height: 190,
          left: 50,
          top: 192,
          position: "absolute",
          background: "white",
          borderRadius: 5,
          border: "0.50px #979797 solid",
        }}
      />

      {/* 카드 헤더 (파란색) */}
      <div
        className="ChatCreate-InfoHeader"
        style={{
          width: 300,
          height: 29.45,
          left: 50,
          top: 192,
          position: "absolute",
          background: "#4880FF",
          borderRadius: "5px 5px 0 0",
          border: "0.50px #979797 solid",
        }}
      />
      <div
        className="ChatCreate-InfoHeaderText"
        style={{
          position: "absolute",
          left: 68,
          top: 195.8,
          color: "white",
          fontSize: 16,
          fontFamily: "Inter",
          fontWeight: "600",
        }}
      >
        채팅방 정보설정
      </div>

      {/* 채팅방 이름 레이블 */}
      <div
        style={{
          position: "absolute",
          left: 73,
          top: 243,
          fontSize: "14px",
          fontFamily: "Inter",
          fontWeight: "600",
          color: "#979797",
        }}
      >
        채팅방 이름
      </div>

      {/* 채팅방 이름 입력란 */}
      <input
        type="text"
        placeholder="방 이름을 입력하세요"
        style={{
          position: "absolute",
          left: 73,
          top: 265,
          width: "240px",
          height: "25px",
          paddingLeft: "10px",
          border: "1px solid #B3B3B3",
          borderRadius: "3px",
        }}
      />

     {/* 대화상대 초대 레이블 */}
        <div
        style={{
            position: "absolute",
            left: 73,
            top: 298,
            fontSize: "14px",
            fontFamily: "Inter",
            fontWeight: "600",
            color: "#979797",
        }}
        >
        대화상대 초대
        </div>

        {/* 대화상대 초대 클릭 영역 (입력란 대신 div) */}
        <div
        style={{
            cursor: "pointer",
            position: "absolute",
            left: 73,
            top: 320,
            width: "254px",
            height: "25px",
            backgroundColor: "#E9EBF1",
            display: "flex",
            alignItems: "center",
            paddingLeft: "8px",
            borderRadius: "3px",
            color: "#B3B3B3",
            fontSize: "11px",
            fontFamily: "Roboto",
        }}
        onClick={invitePeople}
        >
        이름을 입력하세요
        <img
            src={searchIcon}
            alt="검색"
            style={{ width: "18px", height: "18px", marginLeft: "auto", marginRight: "8px" }}
        />
        </div>

    </div>
  );
};

export default ChatCreate;
