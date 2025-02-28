import { useEffect, useRef, useState } from "react";
import ApprovalLineModal from "./approvalLineModal";
import ApprovalCCModal from "./approvalCCModal";

export const ApprovalWriteHeader = ({approvalData, setApprovalData, selectedCCUsers = [], setSelectedCCUsers = []}) => {
    // ✅ 각각의 모달 상태를 독립적으로 관리
    const [approvalLineModalOpen, setApprovalLineModalOpen] = useState(false);
    const [approvalCCModalOpen, setApprovalCCModalOpen] = useState(false);
    const [approvalType, setApprovalType] = useState(""); // ✅ 종류 선택 (일반 or 휴가원)
    const [leaveType, setLeaveType] = useState(""); // ✅ 휴가원 선택 시 기안양식 (연차, 반차 등)
    const [startLeaveDate, setStartLeaveDate] = useState(""); // ✅ 연차 시작일
    const [endDate, setEndDate] = useState(""); // ✅ 연차 종료일
    const [halfDayDate, setHalfDayDate] = useState(""); // ✅ 반차 날짜
    const [leaveDays, setLeaveDays] = useState(0); // ✅ 사용 연차 일수


    const handleApprovalTypeChange = (e) => {
      const selectedType = e.target.value;
      setApprovalType(selectedType);
    
      // ✅ approvalData에도 반영
      setApprovalData((prevData: any) => ({
        ...prevData,
        approvalType: selectedType, // approvalData에 반영
        leaveType: "", // 기안양식 초기화
        startLeaveDate: "",
        endDate: "",
        halfDayDate: "",
        leaveDays: 0,
      }));
    };

    useEffect(() => {
      setApprovalData((prevData: any) => ({
        ...prevData,
        approvalType,
        leaveType,
        startLeaveDate,
        endDate,
        halfDayDate: leaveType.includes("반차") ? startLeaveDate : "", // 반차는 startDate와 동일
        leaveDays,
      }));
    }, [leaveType, startLeaveDate, endDate, leaveDays, approvalType]);
    
  
  // 참조자 목록 상태 추가
  //const [selectedCCUsers, setSelectedCCUsers] = useState([]);
  
  useEffect(() => {
    console.log("✅ Header에서 업데이트된 selectedCCUsers:", selectedCCUsers);
  }, [selectedCCUsers]);


  // 파일 업로드용 state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 선택 트리거용 Ref

  // 파일 선택 처리
  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);

      //approvalData에 파일 추가
      setApprovalData((prevData:any) => ({
        ...prevData,
        attachments: [...prevData.attachments || [], ...filesArray], // 파일 목록 저장
      }));
    }
  };

// 파일 삭제 함수 추가
const handleRemoveFile = (index: number) => {
  setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));

  // approvalData에서도 파일 제거
  setApprovalData((prevData: any) => ({
    ...prevData,
    attachments: prevData.attachments?.filter((_, i) => i !== index) || [],
  }));
};

  // 입력값 변경 시 상태 업데이트하는 함수
  const handleChange = (e:any) => {
    const {name, value} = e.target;
    setApprovalData((prevData:any) => ({
      ...prevData,
      [name]: value,
    }));
  };

    // 파일 선택 버튼 클릭 시 input[type="file"] 트리거
    const handleFileUploadClick = () => {
      fileInputRef.current?.click();
    };

     // 📌 연차 시작일/종료일이 변경될 때 연차 일수 계산
  useEffect(() => {
    if (approvalType === "휴가원" && leaveType === "연차" && startLeaveDate && endDate) {
      const start = new Date(startLeaveDate);
      const end = new Date(endDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1; // 차이 계산 후 1일 추가
      setLeaveDays(days > 0 ? days : 0); // 음수가 나오지 않도록 제한
    } else if (leaveType === "오전반차" || leaveType === "오후반차") {
      setLeaveDays(0.5); // ✅ 반차 선택 시 0.5일
    } else {
      setLeaveDays(0);
    }
  }, [approvalType, leaveType, startLeaveDate, endDate]);


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
            <select
              name="approvalType"
              style={selectBoxStyle}
              value={approvalType}
              onChange={handleApprovalTypeChange}
            >
              <option value="">선택</option>
              <option value="일반">일반</option>
              <option value="휴가원">휴가원</option>
            </select>
          </div>

          {/* ✅ 휴가원 선택 시 기안양식 선택 */}
          {approvalType === "휴가원" && (
            <div style={rowStyle2}>
              <label style={labelStyle}>기안양식</label>
              <select
                style={selectBoxStyle}
                value={leaveType}
                onChange={(e) => {
                  setLeaveType(e.target.value);
                  setLeaveDays(e.target.value.includes("반차") ? 0.5 : 0); // ✅ 반차일 경우 0.5일
                  setStartLeaveDate("");
                  setEndDate("");
                  setHalfDayDate("");
                }}
              >
                <option value="">선택</option>
                <option value="연차">연차</option>
                <option value="오전반차">오전반차</option>
                <option value="오후반차">오후반차</option>
              </select>
            </div>
          )}
        </div>

        {/* ✅ 연차 선택 시 연차 시작일 & 종료일 입력 */}
        {approvalType === "휴가원" && leaveType === "연차" && (
          <>
            <div style={dividerStyle} />
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <label style={labelStyle}>연차 시작일</label>
                <input type="date" style={inputStyle} value={startLeaveDate} onChange={(e) => setStartLeaveDate(e.target.value)} />
              </div>
              <div style={rowStyle2}>
                <label style={labelStyle}>연차 종료일</label>
                <input type="date" style={inputStyle} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </div>
          </>
        )}
        {approvalType === "휴가원" && (leaveType === "오전반차" || leaveType === "오후반차") && (
          <>
            <div style={dividerStyle} />
            <div style={rowStyle}>
              <label style={labelStyle}>반차 날짜</label>
              <input
                type="date"
                style={inputStyle}
                value={startLeaveDate} // ✅ 반차도 startDate 사용
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  setStartLeaveDate(selectedDate);
                  setEndDate(selectedDate); // ✅ 반차의 경우 startDate = endDate 동일
                  setLeaveDays(0.5); // ✅ 반차는 0.5일로 고정
                }}
              />
            </div>
          </>
        )}
                <div style={dividerStyle} />
        {/* 사용 연차 일수 */}
        {approvalType === "휴가원" && (
          <div style={rowStyle}>
            <label style={labelStyle}>사용 연차 일수</label>
            <input type="text" style={inputStyle} value={leaveDays} readOnly />
          </div>
        )}


        {/* 구분선 */}
        <div style={dividerStyle} />

        {/* 제목 입력 */}
        <div style={rowStyle}>
          <label style={labelStyle}>제목</label>
          <input type="text" name="approvalTitle" placeholder="제목을 입력하세요." style={inputStyle}  value={approvalData.approvalTitle} onChange={handleChange} />
        </div>

        {/* 구분선 */}
        <div style={dividerStyle} />

        {/* 결재라인 */}
        <div style={rowStyle}>
          <label style={labelStyle}>결재라인</label>
          <button style={actionButtonStyle} onClick={() => setApprovalLineModalOpen(true)}>
            + 선택
          </button>

   {/* ✅ 결재라인 목록 (자동 크기 조절) */}
   <div
    style={{
      //width: "100%", // 부모 요소에 맞게 너비 설정
      minHeight: "20px", // 최소 높이 설정 (데이터 없을 때도 공간 확보)
      padding: "8px",
      wordBreak: "break-word", // 긴 텍스트 자동 줄바꿈
      fontSize: "12px",
      color: "#007bff",
    }}
  >
    {approvalData.approvalLine && approvalData.approvalLine.length > 0 ? (
      approvalData.approvalLine.map((emp, index) => (
        <div key={index} style={{ marginBottom: "5px" }}>
          {emp.USER_NAME} ({emp.DEPT_NAME} - {emp.POSITION_NAME})
        </div>
      ))
    ) : (
      <div style={{ color: "gray", fontSize: "11px"}}>결재자를 추가하세요</div>
    )}
  </div>
</div>

        {/* ✅ 결재라인 모달 (조건부 렌더링) */}
        {approvalLineModalOpen && (
          <ApprovalLineModal 
          onClose={() => setApprovalLineModalOpen(false)} 
          setApprovalData={setApprovalData} // 결재라인 저장을 위해 추가
          />
        )}

        {/* 구분선 */}
        <div style={dividerStyle} />

        {/* 첨부 */}
        <div style={rowStyle}>
          <span style={labelStyle}>첨부</span>
          <button style={actionButtonStyle} onClick={handleFileUploadClick} >
            + 첨부
          </button>
          {/* 숨겨진 파일 입력 필드 */}
          <input type="file" multiple ref={fileInputRef} style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", opacity: 0, pointerEvents: "none"}} onChange={handleFileChange} />
        
          {/* 선택된 파일 이름 표시 (클릭 시 다운로드 가능) */}
          <div style={fileListContainerStyle}>
            {selectedFiles.length > 0 ? (
              selectedFiles.map((file, index) => {
                const fileURL = URL.createObjectURL(file); // 파일 URL 생성

                return (
                  <div key={index} style={fileItemStyle}>
                    <a href={fileURL} download={file.name} style={fileLinkStyle}>
                      📎 {file.name}
                    </a>
                    <button onClick={() => handleRemoveFile(index)} style={removeButtonStyle}>x</button>
                  </div>
                );
              })
            ) : (
              <div style={fileItemStyle}>선택된 파일 없음</div>
            )}
          </div>
        </div>

        

        {/* 구분선 */}
        <div style={dividerStyle} />

        {/* 참조 */}
        <div style={rowStyle}>
          <label style={labelStyle}>참조</label>
          <button style={actionButtonStyle} onClick={() => setApprovalCCModalOpen(true)}>
            + 선택
          </button>
          <div style={infoContainer}>
            {selectedCCUsers.length > 0 ? (
              selectedCCUsers.map((emp, index) => (
                <div key={index} style={{ marginBottom: "5px" }}>
                  {emp.USER_NAME} ({emp.DEPT_NAME} - {emp.POSITION_NAME})
                </div>
              ))
            ) : (
              <div style={emptyMessage}>참조자를 추가하세요</div>
            )}
          </div>
        </div>
        
        {/* ✅ 참조 모달 (조건부 렌더링) */}
        {approvalCCModalOpen && (
          <ApprovalCCModal 
          onClose={() => setApprovalCCModalOpen(false)} 
          setSelectedCCUsers={setSelectedCCUsers} // 상태 업데이트 함수 전달
          selectedCCUsers={selectedCCUsers} // 현재 선택된 참조자 목록 전달
          />

        )}

        {/* 구분선 */}
        <div style={dividerStyle} />
      </div>
    </div>
    
  );
};

const infoContainer = {
  minHeight: "20px",
  padding: "8px",
  wordBreak: "break-word",
  fontSize: "12px",
  color: "#007bff",
};

const emptyMessage = { color: "gray", fontSize: "11px" };

// 삭제 버튼 스타일
const removeButtonStyle = {
  background: "none",
  border: "none",
  fontSize: "14px",
  cursor: "pointer",
  marginLeft: "6px",
};

// 파일 다운로드 링크 스타일
const fileLinkStyle = {
  textDecoration: "none",
  color: "#007bff",
  cursor: "pointer",
  fontSize: "12px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

// 파일 목록을 감싸는 컨테이너 (스크롤 가능)
const fileListContainerStyle = {
  maxWidth: "300px", // 파일명이 너무 길 경우 대비
  maxHeight: "60px", // ✅ 최대 높이 설정하여 스크롤 가능하도록 변경
  overflowY: "auto", // ✅ 스크롤이 필요하면 자동으로 활성화
  //border: "1px solid black",
  borderRadius: "5px",
  padding: "5px",
  fontSize: "11px", 
  color: "#757575",
};

// 개별 파일 스타일
const fileItemStyle = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  padding: "3px 0",
};

// ✅ **페이지 전체 컨테이너 스타일 (가운데 정렬)**
const pageContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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
  
  
