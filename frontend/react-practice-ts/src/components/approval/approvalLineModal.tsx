import React, { useEffect, useState } from "react";
import ApprovalFavoriteLineModal from "./approvalFavoriteLineModal";
import axios from "axios";
import { useSelector } from "react-redux";
import { groupBy } from "lodash";

// ✅ 데이터 타입 정의 (TypeScript 적용)
interface Employee {
  id: number;
  POSITION_NAME: string;
  USER_NO: number,
  DEPT_NAME: string;
  USER_NAME: string;
  approvalType: string;
  type: '결재자';
  approvalLevel: number;
}

const ApprovalLineModal = ( {onClose, setApprovalData} ) => {
  const [approvalLine, setApprovalLine] = useState<Employee[]>([]); // 결재자 리스트
  const [favoriteLine, setFavoriteLine] = useState<{ name: string; employees: Employee[] }[]>([]); // 즐겨찾기 리스트
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);
  const [favoriteName, setFavoriteName] = useState(""); // 즐겨찾기 명
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [refresh, setRefresh] = useState(false); //새로고침 트리거
  const refreshFavoritList = () => {
    setRefresh(prev => !prev);
  }

const selectFavoriteForApprovalLine = (favorite: { name: string; employees: Employee[] }) => {
  const updatedEmployees = favorite.employees.map(emp => ({
    ...emp,
    USER_NO: emp.USER_NO,
    approvalLineType: emp.approvalType// 해당 리스트 타입 유지
  }));
  setApprovalLine(updatedEmployees); // 선택한 즐겨찾기 내의 결재자 목록으로 결재라인 교체
}

// Redux에서 user 정보 가져오기
const userNo = useSelector((state: any) => state.user.userNo);

  useEffect(() => {
    axios.get(`http://localhost:8003/workly/api/approval/getFavoriteLines/${userNo}`)
         .then((response) => {

          // 데이터를 FAVORITE_NAME 기준으로 그룹화
          const groupedFavorites = groupBy(response.data, "FAVORITE_NAME");

          // 백엔드에서 받은 데이터를 적절한 형식으로 변환
          const formattedFavorites = Object.keys(groupedFavorites).map((favName) => ({
            name: favName, // 즐겨찾기 이름
            employees: groupedFavorites[favName].map((emp) => ({
              USER_NO : emp.USER_NO,
              USER_NAME: emp.USER_NAME,
              DEPT_NAME: emp.DEPT_NAME,
              POSITION_NAME: emp.POSITION_NAME,
              approvalType: emp.APPROVAL_TYPE,
              type: '결재자',
              approvalLevel: emp.LEVEL,  
              approvalLineType: emp.APPROVAL_LINE_TYPE,
            })),
          }));

          console.log("즐겨찾기 선택 후 결재라인:", formattedFavorites); // ✅ 확인용 로그

          setFavoriteLine(formattedFavorites); // 상태 업데이트
         })
         .catch((error) => console.error("즐겨찾기 가져오기 실패:", error));
  }, [userNo, refresh]); // userNo가 변경될때마다 실행

  // ✅ 백엔드에서 직원 목록 가져오기 (axios 사용)
  useEffect(() => {
    axios
      .get<Employee[]>("http://localhost:8003/workly/api/approval/approvalLineList")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("데이터 가져오기 실패:", error));
  }, []);

  // ✅ 검색어 적용된 직원 목록 필터링
  const filteredEmployees = employees.filter((emp) =>
    emp.USER_NAME.includes(searchTerm)
  );

  // 즐겨찾기 추가
  const saveFavoriteLine  = () => {
    if(favoriteName.trim() === ""){
      alert("즐겨찾기 명을 입력해주세요!");
      return;
    }
    if(approvalLine.length === 0){
      alert("추가할 결재자가 없습니다.");
      return;
    }

    setFavoriteLine([...favoriteLine, {name: favoriteName, employees: approvalLine}]);
    setShowFavoriteModal(false); // 모달 닫기
    setFavoriteName(""); // 입력 값 초기화
  }

  // 즐겨찾기 삭제
  const removeFavoriteLine = (favoriteName: string) => {

    axios.delete(`http://localhost:8003/workly/api/approval/deleteFavoriteLine`,{
      params: {
        userNo,
        favoriteName: encodeURIComponent(favoriteName)
      }
    })
    .then(() => {
      console.log(`'${favoriteName}' 즐겨찾기 삭제 완료`);
      alert("즐겨찾기 삭제 완료");
      refreshFavoritList(); // 삭제 후 목록 새로고침
    })
    .catch((error) => {
      console.log("즐겨찾기 삭제 실패:", error);
      alert("삭제에 실패했습니다.");
    });
  };
    
  const handleSaveApprovalLine = () => {
    console.log("결재라인 저장 전 데이터:",  approvalLine);
    setApprovalData((prevData) => ({
      ...prevData,
      approvalLine: approvalLine.map((person, index) => ({
        ...person,
        USER_NO: person.USER_NO,
        APPROVAL_LINE_TYPE: person.approvalType,
        approvalLevel: index + 1, // ✅ 레벨을 다시 1부터 순차적으로 설정
      })), // ✅ approvalData 내부에 approvalLine 속성 추가
    }));
    onClose();
  };
  

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // ✅ 반투명한 배경 추가
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

    <div
      style={{
        width: 750,
        height: 500,
        background: "white",
        borderRadius: 8,
        border: "1px solid black",
        padding: 15,
        position: "fixed", // 화면 중앙 정렬을 위해 fixed 사용
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)", // 가로 세로 중앙 정렬
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // 살짝 그림자 추가 (선택 사항)
      }}
  >

      {/* X 닫기 버튼 */}
      <button
        onClick={onClose}
        style={{
          background: "transparent",
          border: "none",
          fontSize: 9,
          cursor: "pointer",
        }}
      >
        <svg width="10" height="15" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="10" height="15" fill="white" />
          <path d="M14.25 5.5L4.75 16.5M4.75 5.5L14.25 16.5" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <h2 style={{ fontSize: 16, fontWeight: 700, color: "#202224", marginBottom: "10px" }}>결재라인</h2>

      <div style={{ display: "flex", gap: 15 }}>
        {/* 왼쪽: 결재자 목록 */}
        <div
          style={{
            width: 320,
            height: 380,
            border: "1px solid #404040",
            borderRadius: 4,
            padding: 8,
          }}
        >
          {/* 검색창과 검색 버튼 추가 */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
            <input
              type="text"
              placeholder="이름 입력"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "65%",
                padding: 4,
                fontSize: 11,
                borderRadius: 20,
                border: "0.6px solid #D5D5D5",
                background: "#F5F6FA",
              }}
            />
            {/* 검색 버튼 추가 */}
            <button
              onClick={() => console.log("검색어:", searchTerm)}
              style={{
                marginLeft: "8px",
                padding: "5px 10px",
                fontSize: 11,
                borderRadius: 8,
                border: "1px solid black",
                background: "white",
                cursor: "pointer",
              }}
            >
              검색
            </button>
          </div>

          {/* 📌 테이블 스크롤 추가 (기능 정상 유지)*/}
          <div
            style={{
              width: "100%",
              maxHeight: 330, // 최대 높이 지정
              overflowY: "auto", // 스크롤 활성화
              border: "1px solid #ddd",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                tableLayout: "fixed", // 📌 컬럼 크기 고정 (정렬 유지)
                textAlign: "left",
                fontSize: 11,
              }}
            >
               <thead style={{ position: "sticky", top: 0, background: "#f5f5f5" }}>
                <tr>
                <th style={{ borderBottom: "2px solid #979797", padding: "6px", width: "50%" }}>부서</th>
                <th style={{ borderBottom: "2px solid #979797", padding: "6px", width: "50%" }}>사원</th>
                <th style={{ borderBottom: "2px solid #979797", padding: "6px", width: "50%" }}>직급</th>
                </tr>
            </thead>
             <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((emp, index) => (
                    <tr 
                    key={index}
                    onClick={() => {
                      if(!approvalLine.some(person => person.USER_NAME === emp.USER_NAME)){
                        setApprovalLine((prevApprovalLine) => [
                          ...prevApprovalLine,
                          {
                            id: Date.now(), // 고유한 id 추가
                            USER_NAME: emp.USER_NAME,
                            DEPT_NAME: emp.DEPT_NAME,
                            POSITION_NAME: emp.POSITION_NAME,
                            approvalType: "승인", // 기본 타입 설정
                            type: '결재자',
                            approvalLevel: prevApprovalLine.length + 1, // ✅ 최신 상태 반영
                            USER_NO: emp.USER_NO,
                          }
                        ]);
                      }
                    }}
                    style={{cursor: "pointer"}} // 마우스 커서 변경(클릭 가능 표시)
                    >
                      <td style={{ padding: "6px", borderBottom: "1px solid #ddd" }}>{emp.DEPT_NAME}</td>
                      <td style={{ padding: "6px", borderBottom: "1px solid #ddd" }}>{emp.USER_NAME}</td>
                      <td style={{ padding: "6px", borderBottom: "1px solid #ddd" }}>{emp.POSITION_NAME}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} style={{ textAlign: "center", padding: "10px", color: "gray" }}>
                      데이터 없음
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 오른쪽: 결재라인 & 즐겨찾기 */}
        <div style={{ width: 350, display: "flex", flexDirection: "column", gap: 8}}>
          {/* 즐겨찾기 박스 */}
          <h2 style={{ fontSize: 12, fontWeight: 700, marginBottom: "2px" }}>즐겨찾기</h2>

          <div
            style={{
              width: "100%",
              height: 100,
              border: "1px solid #404040",
              borderRadius: 4,
              padding: 8,
              overflowY: "auto",
              maxHeight: 150, // 최대 높이 설정 (초과 시 스크롤)
            }}
          >
            <ul style={{ listStyle: "none", padding: 0, fontSize: 11 }}>
              {favoriteLine.map((fav, index) => (
                <li key={fav.name || index} 
                  style={{
                    display: "flex",
                    flexDirection: "column", // ✅ 세로 정렬
                    borderBottom: "1px solid #ddd",
                    paddingBottom: "6px",
                    marginBottom: "6px",
                    cursor: "pointer",
                  }}

                  onClick={() => selectFavoriteForApprovalLine(fav)} // 클릭 시 해당 즐겨찾기 리스트를 결재라인으로 교체 

                >
                  <strong>{fav.name}</strong>
                  <ul style={{ paddingLeft: "10px", marginTop: "4px"}}>
                    {(fav.employees || []).map((emp, empIndex) => (
                      <li key={emp.USER_NO || empIndex}>
                        {emp.USER_NAME} ({emp.DEPT_NAME} - {emp.POSITION_NAME})
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => removeFavoriteLine(fav.name)} // 즐겨찾기 삭제 호출
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      marginLeft: "auto",
                    }}
                  >
                    <svg
                      width="30"
                      height="16"
                      viewBox="0 0 35 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="34"
                        height="19"
                        rx="10"
                        fill="white"
                        stroke="black"
                      />
                      <line x1="10" y1="10" x2="25" y2="10" stroke="black" strokeWidth="2" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>


           {/* 결재자 설정 */}
           <h3 style={{ fontSize: 12, fontWeight: 700, marginTop: "17px"}}>결재자 설정</h3>
           <div
            style={{
              width: "100%",
              height: 208,
              border: "1px solid #404040",
              borderRadius: 3,
              padding: 6,
              display: "flex",
              flexDirection: "column", // 세로 정렬   
          }}
            >

            {/* 📌 결재자 리스트 부분 (스크롤 적용) */}
            <div
              style={{
                flexGrow: 1, // 리스트가 남은 공간을 차지하도록 설정
                overflowY: "auto", // 📌 스크롤 적용
                maxHeight: "1000px", // 최대 높이 지정 (버튼을 고려하여 조정)
                paddingRight: "5px", // 스크롤바 공간 확보
              }}
            >
            
            <ol style={{ fontSize: 10, paddingLeft: 10 }}>
                {approvalLine.map((person, index) => (
                <li
                    key={person.USER_NO}
                    style={{
                    display: "flex",
                    gap: 6,
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 4,
                    borderBottom: "1px solid #ddd",
                    }}
                >
                    <select
                    value={person.approvalType}
                    onChange={(e) => {
                      setApprovalLine(approvalLine.map((item) =>
                        item.USER_NO === person.USER_NO ? { ...item, approvalType: e.target.value } : item
                      ));
                    }}
                    style={{
                        padding: "3px 8px",
                        fontSize: 10,
                        borderRadius: 3,
                        border: "1px solid black",
                    }}
                    > 
                    <option value="승인">승인</option>
                    <option value="수신">수신</option>
                    </select>
                    <span style={{ fontSize: 10 }}>{person.DEPT_NAME}</span>
                    <span style={{ fontSize: 10 }}>{person.USER_NAME}</span>
                    <span style={{ fontSize: 10 }}>{person.POSITION_NAME}</span>
                    <button
                    onClick={() =>
                        setApprovalLine(approvalLine.filter((_, i) => i !== index))
                    }
                    style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                    }}
                    >
                    <svg
                        width="30" 
                        height="16"
                        viewBox="0 0 35 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                        x="0.5"
                        y="0.5"
                        width="34"
                        height="19"
                        rx="10"
                        fill="white"
                        stroke="black"
                        />
                        <line x1="10" y1="10" x2="25" y2="10" stroke="black" strokeWidth="2" />
                    </svg>
                    </button>
                </li>
                ))}
            </ol>
            </div>
              {/* 즐겨찾기 추가 버튼 */}
              <button
              onClick={() => setShowFavoriteModal(true)}
              disabled={approvalLine.length === 0} // 결재라인이 없으면 버튼 비활성화
              style={{
                width: "79%",
                padding: 5,
                border: approvalLine.length === 0 ? "2px solid gray" : "2px solid #4880FF", // 비활성화 시 회색
                borderRadius: 14,
                background: approvalLine.length === 0 ? "#ccc" : "white", // 비활성화 시 배경색 변경
                fontSize: 12,
                fontWeight: 500,
                cursor: approvalLine.length === 0 ? "not-allowed" : "pointer", // 비활성화 시 클릭 방지
                marginLeft: "40px",
                marginTop: "40px",
                color: approvalLine.length === 0 ? "#888" : "black", // 비활성화 시 글씨색 변경
                
              }}
            >
              즐겨찾기 추가
            </button>
          </div>

            {/* 결재라인 저장 버튼 */}
            <button
            onClick={handleSaveApprovalLine}
            style={{
            width: "80%",
            padding: 8,
            background: "#4880FF",
            color: "white",
            fontSize: 12,
            fontWeight: 600,
            borderRadius: 14,
            border: "none",
            cursor: "pointer",
            marginTop: 8,
            marginLeft: "45px",
          }}>
            결재라인 저장
          </button>
          </div>
        </div>
      {/* 즐겨찾기 모달 추가 */}
      {showFavoriteModal && (
        <ApprovalFavoriteLineModal 
        onClose={() => setShowFavoriteModal(false)} 
        favoriteName={favoriteName}
        setFavoriteName={setFavoriteName}
        saveFavoriteLine={saveFavoriteLine}
        approvalLines={approvalLine}
        refreshFavoriteList={refreshFavoritList}
        userNo={userNo}
        />
      )}
      </div>
    </div>
  );
};

export default ApprovalLineModal;
