export const ApprovalStatus = ({  status = ""  }) => {
    // 상태별 스타일 지정
    const getStatusStyle = (status:any) => {
      let baseStyle = {
        width: "82px",
        height: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "3px",
        fontSize: "12px",
        fontWeight: "bold",
        color: "white",
      };
  
      switch (status) {
        case "완료":
          return { ...baseStyle, background: "#3E7BE6" }; // 파란색
        case "진행중":
          return { ...baseStyle, background: "#157137" }; // 초록색
        case "반려":
          return { ...baseStyle, background: "#EB0909" }; // 빨간색
        default:
          return { ...baseStyle, background: "#E0E0E0", color: "#202224" }; // 기본 회색
      }
    };
  
    return (
      <div style={getStatusStyle(status)}>
        {status || "미정"} {/* 상태값이 없으면 "미정" 표시 */}
      </div>
    );
  };
  