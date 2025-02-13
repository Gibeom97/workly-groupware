import { useState } from "react";

export const ApprovalSearchBar = () => {
  const [searchText, setSearchText] = useState(""); // 검색어 상태
  const [firstOption, setFirstOption] = useState(""); // 첫 번째 셀렉트 박스 상태
  const [secondOption, setSecondOption] = useState(""); // 두 번째 셀렉트 박스 상태

  // 검색 버튼 클릭 시 동작
  const handleSearch = () => {
    console.log("검색어:", searchText);
    console.log("첫 번째 옵션:", firstOption);
    console.log("두 번째 옵션:", secondOption);
    alert(`검색: ${searchText}, 옵션1: ${firstOption}, 옵션2: ${secondOption}`);
  };

  return (
    <div style={containerStyle}>
      {/* 왼쪽 셀렉트 박스 */}
      <div style={selectContainerStyle}>
        <select
          value={firstOption}
          onChange={(e) => setFirstOption(e.target.value)}
          style={selectBoxStyle}
        >
          <option value="">구분</option>
          <option value="option1">일반</option>
          <option value="option2">휴가원</option>
        </select>

        <select
          value={secondOption}
          onChange={(e) => setSecondOption(e.target.value)}
          style={selectBoxStyle}
        >
          <option value="">년도</option>
          <option value="optionA">2025</option> {/* 당해년도 포함 5년 전까지 조회 */}
        </select>
      </div>

      {/* 검색창 */}
      <div style={searchContainerStyle}>
        {/* 검색 입력 필드 */}
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="문서 제목/기안 번호 입력"
          style={searchInputStyle}
        />

        {/* 검색 버튼 (돋보기 아이콘) */}
        <button onClick={handleSearch} style={searchButtonStyle}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.9788 10.2416C10.314 9.28445 11.4025 6.68284 10.41 4.43072C9.41763 2.17861 6.72009 1.12881 4.38492 2.08594C2.04976 3.04307 0.961254 5.64467 1.95367 7.89679C2.94609 10.1489 5.64363 11.1987 7.9788 10.2416Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.43018 9.29651L12.9933 12.7334"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

// ✅ 컨테이너 스타일 (가운데 정렬 및 좌우 배치)
const containerStyle = {
  display: "flex",
  justifyContent: "space-between", // ✅ 왼쪽(셀렉트 박스)과 오른쪽(검색창) 정렬
  alignItems: "center",
  width: "90%", // 전체 폭 설정
  maxWidth: "800px", // ✅ 검색창과 셀렉트 박스를 균형 있게 배치
  margin: "0 auto", // 가운데 정렬
  padding: "10px 0", // 위아래 패딩 추가
};

// ✅ 왼쪽 셀렉트 박스 컨테이너
const selectContainerStyle = {
  display: "flex",
  gap: "10px", // ✅ 셀렉트 박스 간 간격 조정
};

// ✅ 검색 컨테이너 (오른쪽 배치)
const searchContainerStyle = {
  position: "relative",
  width: "220px",
  display: "flex",
  alignItems: "center",
};

// ✅ 검색 입력 필드 스타일
const searchInputStyle = {
  width: "100%",
  height: "25px",
  paddingLeft: "40px", // 🔹 플레이스홀더 오른쪽 이동
  opacity: 0.8,
  color: "#202224",
  fontSize: "10px",
  fontFamily: "Nunito Sans",
  fontWeight: 400,
  borderRadius: "20px",
  border: "1px solid #D5D5D5",
  background: "#F5F6FA",
  outline: "none",
};

// ✅ 검색 버튼 스타일
const searchButtonStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  background: "transparent",
  border: "none",
  cursor: "pointer",
};

// ✅ 셀렉트 박스 스타일
const selectBoxStyle = {
  width: "80px", // ✅ 버튼 크기에 맞게 조정
  height: "25px", // ✅ 버튼 높이와 맞춤
  background: "white",
  border: "1px solid black",
  borderRadius: "4px",
  fontSize: "10px",
  padding: "5px",
  cursor: "pointer",
};
