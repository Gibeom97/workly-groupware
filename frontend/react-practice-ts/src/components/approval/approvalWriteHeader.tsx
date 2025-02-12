export const ApprovalWriteHeader = () => {
    return (
      <div style={pageContainerStyle}>
        <div style={formContainerStyle}>
          <div style={sectionTitleStyle}>기안서 작성</div>

          {/* 구분선 */}
          <div style={dividerStyle1} />

          {/* 종류 & 기안양식 */}
        <div style={rowContainerStyle}>
          <div style={rowStyle}>
            <label style={labelStyle}>종류</label>
            <select style={selectBoxStyle}>
              <option>일반</option>
              <option>휴가원</option>
            </select>
          </div>

          <div style={rowStyle2}>
            <label style={labelStyle}>기안양식</label>
            <select style={selectBoxStyle}>
              <option>자유양식</option>
              <option>정형화 양식</option>
            </select>
          </div>
        </div>

          {/* 구분선 */}
          <div style={dividerStyle} />

          {/* 제목 입력 */}
          <div style={rowStyle}>
            <label style={labelStyle}>제목</label>
            <input type="text" placeholder="제목을 입력하세요." style={inputStyle} />
          </div>

        {/* 구분선 */}
        <div style={dividerStyle} />

          {/* 결재라인 */}
          <div style={rowStyle}>
            <label style={labelStyle}>결재라인</label>
            <button style={actionButtonStyle}>+ 선택</button>
            <input type="text" style={inputStyle} />
          </div>

        {/* 구분선 */}
        <div style={dividerStyle} />          

          {/* 첨부 */}
          <div style={rowStyle}>
            <label style={labelStyle}>첨부</label>
            <button style={actionButtonStyle}>+ 첨부</button>
            <input type="text" style={inputStyle} />
          </div>

        {/* 구분선 */}
        <div style={dividerStyle} />          

          {/* 참조 */}
          <div style={rowStyle}>
            <label style={labelStyle}>참조</label>
            <button style={actionButtonStyle}>+ 선택</button>
            <input type="text" style={inputStyle} />
          </div>

        {/* 구분선 */}
        <div style={dividerStyle} />

        </div>
      </div>
    );
};

// ✅ **페이지 전체 컨테이너 스타일 (가운데 정렬)**
const pageContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw", // 전체 너비를 화면 크기로 설정
  minHeight: "100vh", // 화면 전체 높이 차지
  padding: "20px",
};

// ✅ **기안서 작성 폼 박스 스타일 (가운데 정렬 & 배경 그림자 제거)**
const formContainerStyle = {
    width: "70%", // ✅ 기존 50% → 70%로 넓힘
    maxWidth: "900px", // ✅ 기존 600px → 900px로 증가
    background: "white",
    padding: "20px",
  };

const sectionTitleStyle = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#202224",
  marginBottom: "10px",
};

const dividerStyle = {
  width: "100%",
  height: "1px",
  backgroundColor: "rgba(0, 0, 0, 0.15)",
  margin: "10px 0",
};

const dividerStyle1 = {
    width: "100%",
    height: "3px", // ✅ 기존 1px → 3px로 굵게 변경
    backgroundColor: "rgba(0, 0, 0, 0.3)", // ✅ 조금 더 진한 회색으로 변경
    margin: "10px 0",
};


const rowContainerStyle = {
    display: "flex", // ✅ 내부 요소를 가로로 배치
    justifyContent: "space-between", // ✅ 두 개의 row를 좌우로 정렬
    width: "100%", // ✅ 부모 컨테이너 전체 너비 설정
    gap: "20px", // ✅ 두 요소 사이 간격 추가
  };
  
  const rowStyle = {
    display: "flex",
    alignItems: "center",
    flex: 1, // ✅ 같은 크기로 맞춤
    gap: "10px",
    marginBottom: "10px",
  };
  
  const rowStyle2 = {
    display: "flex",
    alignItems: "center",
    flex: 1, // ✅ 같은 크기로 맞춤
    gap: "10px",
    marginBottom: "10px",
  };
  

const labelStyle = {
  width: "80px",
  fontSize: "14px",
  fontWeight: "700",
  color: "#202224",
};

const selectBoxStyle = {
  width: "150px",
  border: "1px solid black",
  borderRadius: "4px",
  fontSize: "12px",
  padding: "5px",
  cursor: "pointer",
};

const inputStyle = {
  flex: 1,
  height: "25px",
  border: "1px solid black",
  borderRadius: "4px",
  paddingLeft: "10px",
  fontSize: "12px",
};

const actionButtonStyle = {
    display: "flex",  // ✅ 내부 요소를 flexbox로 설정
    alignItems: "center",  // ✅ 세로 중앙 정렬
    justifyContent: "center",  // ✅ 가로 중앙 정렬
    height: "25px",
    width: "70px",  // ✅ 버튼 크기 추가 (가로 너비 설정)
    background: "white",
    borderRadius: "5px",
    border: "2px solid #4880FF",
    fontSize: "11px",
    fontWeight: "bold",
    color: "black",
    cursor: "pointer",
  };
  
