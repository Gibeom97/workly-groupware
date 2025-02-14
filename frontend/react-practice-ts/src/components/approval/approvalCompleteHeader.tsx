export const ApprovalCompleteHeader = () => {
    return (
      <div style={containerStyle}>    
         
      <h2 style={titleStyle}>결재 완료 문서</h2>
  
        {/* 구분선 */}
        <div style={dividerStyleBold} />
  
        {/* 종류 & 연차유형 */}
        <div style={rowContainerStyle}>
          <div style={rowStyle}>
            <label style={labelStyle}>종류</label>
            <span style={textStyle}>연차</span>
          </div>
  
          <div style={rowStyle}>
            <label style={labelStyle}>연차유형</label>
            <span style={textStyle}>오후반차</span>
          </div>
        </div>
  
        {/* 구분선 */}
        <div style={dividerStyle} />
  
        {/* 제목 입력 */}
        <div style={rowStyle}>
          <label style={labelStyle}>제목</label>
          <span style={textStyle}>연차휴가 신청의 건</span>
        </div>
  
        {/* 구분선 */}
        <div style={dividerStyle} />
  
        {/* 결재라인 */}
        <div>
          <label style={labelStyle}>결재라인</label>
          <div style={approvalListContainerStyle}>
            <div style={approvalItemStyle}>
              <span>개발본부 / IT팀 / 김웡카 과장</span>
              <span style={dateStyle}>2025-02-06 16:22</span>
              <span style={statusStyle("#FD9A56")}>결재요청</span>
            </div>
            <div style={approvalItemStyle}>
              <span>개발본부 / IT팀 / 조용해 팀장</span>
              <span style={dateStyle}>2025-02-06 18:15</span>
              <span style={statusStyle("#4880FF")}>승인</span>
            </div>
            <div style={approvalItemStyle}>
              <span>개발본부 / IT팀 / 박살이 이사</span>
              <span style={dateStyle}>2025-02-07 09:05</span>
              <span style={statusStyle("#4880FF")}>승인</span>
            </div>
            <div style={approvalItemStyle}>
              <span>경영본부 / 인사팀 / 만경만 이사</span>
              <span style={dateStyle}>2025-02-07 09:05</span>
              <span style={statusStyle("#34C268")}>수신</span>
            </div>
          </div>
        </div>
  
        {/* 구분선 */}
        <div style={dividerStyle} />
  
        {/* 첨부 */}
        <div style={rowStyle}>
          <label style={labelStyle}>첨부</label>
        </div>
  
        {/* 구분선 */}
        <div style={dividerStyle} />
  
        {/* 참조 */}
        <div style={rowStyle}>
          <label style={labelStyle}>참조</label>
          <div style={referenceContainerStyle}>
            <span style={referenceItemStyle}>인사팀 / 김기발 대리</span>
            <span style={referenceItemStyle}>인사팀 / 채소영 주임</span>
            <span style={referenceItemStyle}>인사팀 / 김자수 팀장</span>
          </div>
        </div>
  
        {/* 구분선 */}
        <div style={dividerStyle} />
      </div>
    );
  };
  
  // ✅ **컨테이너 스타일**
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    padding: "20px",
    width: "100%",
    maxWidth: "900px",
    background: "white",
    borderRadius: "8px",
    margin: "0 auto", // ✅ 좌우 중앙 정렬
  };
  
  // ✅ **타이틀 스타일**
  const titleStyle = {
    fontSize: "16px",
    fontWeight: "700",
    color: "#202224",
    marginBottom: "10px",
  };
  
  // ✅ **구분선 스타일**
  const dividerStyle = {
    width: "100%",
    height: "1px",
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    margin: "10px 0",
  };
  
  const dividerStyleBold = {
    width: "100%",
    height: "3px",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    margin: "10px 0",
  };
  
  // ✅ **행 스타일**
  const rowContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "80%",
    gap: "20px",
  };
  
  const rowStyle = {
    display: "flex",
    alignItems: "center",
    flex: 1,
    gap: "10px",
  };
  
  // ✅ **라벨 스타일**
  const labelStyle = {
    width: "80px",
    fontSize: "14px",
    fontWeight: "700",
    color: "#202224",
  };
  
  // ✅ **텍스트 스타일**
  const textStyle = {
    fontSize: "13px",
    color: "#666"
  };
  
  // ✅ **결재라인 스타일**
  const approvalListContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "3px",
  };
  
  const approvalItemStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 0.5fr 0.6fr", // ✅ 첫 번째 컬럼을 적절히 조정하여 중앙 배치
    alignItems: "center",
    gap: "30px", // ✅ 간격을 적절히 조정하여 균형 맞추기
    fontSize: "12px",
    color: "#666",
    textAlign: "center", // ✅ 텍스트 중앙 정렬
  };
  
  
  
  
  // ✅ **결재 상태 스타일**
  const statusStyle = (color: string) => ({
    padding: "4px 6px",
    fontSize: "11px",
    borderRadius: "4px",
    color: "white",
    backgroundColor: color,
    width: "60px",
    
  });
  
  // ✅ **결재일자 스타일**
  const dateStyle = {
    fontSize: "12px",
    color: "#666",
  };
  
  // ✅ **참조자 컨테이너 스타일**
  const referenceContainerStyle = {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  };
  
  const referenceItemStyle = {
    background: "white",
    border: "1px solid #4880FF",
    borderRadius: "8px",
    padding: "5px 10px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#4880FF",
  };
  