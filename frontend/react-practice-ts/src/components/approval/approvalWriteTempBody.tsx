const ApprovalWriteTempBody = ({ approvalData, setApprovalData, isTempUpdate = false }) => { 
    // ✅ 모든 입력 필드의 상태를 업데이트하는 함수 (title, content 등)
    const handleChange = (e: any) => {
      const { name, value } = e.target; // ✅ name 속성을 이용한 동적 상태 업데이트
      setApprovalData((prevData: any) => ({
        ...prevData,
        [name]: value, // ✅ 모든 입력 필드 반영 가능 (approvalTitle, approvalContent 등)
      }));
    };
  
    return (
      <div
        data-svg-wrapper
        style={{
          display: "flex",
          flexDirection: "column", // ✅ 수직 정렬 추가
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* ✅ 기안 제목 입력 필드 추가 */}
        <input
          type="text"
          name="approvalTitle" // ✅ title 입력 관리
          value={approvalData.approvalTitle} 
          onChange={handleChange}
          placeholder="제목을 입력하세요"
          style={{
            width: "870px",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid black",
            borderRadius: "4px",
            outline: "none",
            marginBottom: "10px", // ✅ 제목 입력과 내용 입력 간격 추가
          }}
        />
  
        {/* ✅ 결재 유형(구분) 선택 필드 추가 */}
        <select
          name="approvalType" // ✅ 구분 입력 관리
          value={approvalData.approvalType} 
          onChange={handleChange}
          style={{
            width: "870px",
            padding: "8px",
            fontSize: "16px",
            border: "1px solid black",
            borderRadius: "4px",
            outline: "none",
            marginBottom: "10px", // ✅ 간격 추가
            backgroundColor: "white",
          }}
        >
          <option value="">-- 결재 유형 선택 --</option>
          <option value="일반">일반</option>
          <option value="휴가원">휴가원</option>
          <option value="지출결의">지출결의</option>
        </select>
  
        {/* ✅ 텍스트 입력 영역 */}
        <textarea
          name="approvalContent" // ✅ name 속성 추가하여 `handleChange`와 연동
          value={approvalData.approvalContent} 
          onChange={handleChange}
          placeholder={"내용을 입력하세요"}
          style={{
            width: "870px",
            height: "440px",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid black",
            borderRadius: "4px",
            outline: "none",
            backgroundColor: "transparent",
            color: "black",
            resize: "none",
            overflowY: "auto",
            textAlign: "left",
            marginTop: "-30px",
          }}
        />
      </div>
    );
  };
  
  export default ApprovalWriteTempBody;
  