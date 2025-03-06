

const InfoContainer = ({ children }: { children: React.ReactNode }) => {
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
          width: "390px", height: "560px", left: "0px", top: "0px", position: "absolute", 
          background: "white",borderRadius: "5px" 
        }}
      ></div>

      {/* 헤더 영역 */}
      {/* <div 
        className="containerHeader" 
        style={{ width: "390px", height: "30px", left: "0px", top: "0px", position: "absolute", background: "#4880FF" }}
      ></div> */}

      {/* <div 
        className="containerHeaderLogoWrapper" 
        style={{ 
          position: "absolute", 
          left: "12px", top: "7px",  
          fontSize: "16px", fontFamily: "'Nunito Sans', sans-serif", fontWeight: "800",
          color: "white", display: "inline-block" 
        }}
      >
        사원정보
        <div className="noticechat-close-icon" style={{
            left: 359,
            top: 22,
            position: 'absolute',
            cursor: "pointer"
          }}  > 
            ✕
          </div>
      </div> */}

      
      {/*  자식 컴포넌트가 들어가는 영역 */}
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

export default InfoContainer;
