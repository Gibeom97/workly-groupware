import React, { useState } from "react";

const ApprovalLineModal = ({ onClose }) => {
  const [approvalLine, setApprovalLine] = useState([
    { id: 1, name: "박삼이 이사", type: "승인" },
    { id: 2, name: "김기밤 대리", type: "승인" },
    { id: 3, name: "채소염 주임", type: "수신" },
  ]);

  const [favorites, setFavorites] = useState(["지출 결재라인"]);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가

  return (
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
          position: "absolute",
          top: 10,
          right: 10,
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

      <h2 style={{ fontSize: 16, fontWeight: 700, color: "#202224" }}>결재라인</h2>

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

          {/* 📌 테이블 스크롤 추가 (기능 정상 유지) */}
          <div
            style={{
              width: "100%",
              maxHeight: 340, // 최대 높이 지정
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
                </tr>
            </thead>
            <tbody>
                {[...Array(20)].map((_, index) => (
                <tr key={index}>
                    <td style={{ padding: "6px", borderBottom: "1px solid #ddd", width: "20%" }}>인사팀</td>
                    <td style={{ padding: "6px", borderBottom: "1px solid #ddd", width: "20%" }}>홍길동</td>
                </tr>
                ))}
            </tbody>
            </table>
          </div>
        </div>

     {/* 오른쪽: 결재라인 & 즐겨찾기 */}
     <div style={{ width: 350, display: "flex", flexDirection: "column", gap: 8 }}>
         {/* 즐겨찾기 박스 */}
         <h2 style={{ fontSize: 12, fontWeight: 700, marginTop: "-27px", marginBottom: "2px"}}>즐겨찾기</h2>
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
    {favorites.map((fav, index) => (
      <li
        key={index}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "4px 0",
          borderBottom: "1px solid #ddd",
        }}
      >
        {fav}
        <button
          onClick={() => setFavorites(favorites.filter((_, i) => i !== index))}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          <svg
            width="30" // 버튼 크기 줄이기
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
           <h3 style={{ fontSize: 12, fontWeight: 700, marginTop: "17px", marginBottom: "-5px" }}>결재자 설정</h3>
           <div
            style={{
                width: "100%",
                height: 220,
                border: "1px solid #404040",
                borderRadius: 3,
                padding: 6,
            }}
            >
            
            <ol style={{ fontSize: 10, paddingLeft: 10 }}>
                {approvalLine.map((person, index) => (
                <li
                    key={person.id}
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
                    value={person.type}
                    onChange={(e) => {
                        const newApprovalLine = [...approvalLine];
                        newApprovalLine[index].type = e.target.value;
                        setApprovalLine(newApprovalLine);
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
                    <span style={{ fontSize: 10 }}>{person.name}</span>
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
              {/* 즐겨찾기 추가 버튼 */}
              <button
              onClick={() => setFavorites([...favorites, "새 결재라인"])}
              style={{
                width: "79%",
                padding: 5,
                border: "2px solid #4880FF",
                borderRadius: 14,
                background: "white",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                marginLeft: "40px",
                marginTop: "40px",
              }}
            >
              즐겨찾기 추가
            </button>
          </div>

            {/* 결재라인 저장 버튼 */}
            <button style={{
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
    </div>
  );
};

export default ApprovalLineModal;
