import { useState, useEffect } from "react";
interface SearchBarProps {
  onSearch: (searchParams: SearchParams) => void;
}
interface SearchParams {
  approvalType: string;
  year: string;
  searchText: string;
}
export const ApprovalSearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchText, setSearchText] = useState("");
  const [approvalType, setApprovalType] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  // 년도 옵션 생성 (2021~2025년)
  const getYearOptions = () => {
    const endYear = 2025;
    const startYear = 2021;
    const years = [];
    for (let year = endYear; year >= startYear; year--) {
      years.push(year);
    }
    return years;
  };
  // 검색 실행
  const handleSearch = () => {
    onSearch({
      approvalType,
      year: selectedYear,
      searchText
    });
  };
  // 엔터키 검색 지원
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div style={containerStyle}>
      <div style={selectContainerStyle}>
        <select
          value={approvalType}
          onChange={(e) => {
            setApprovalType(e.target.value);
            onSearch({
              approvalType: e.target.value,
              year: selectedYear,
              searchText
            });
          }}
          style={selectBoxStyle}
        >
          <option value="">구분</option>
          <option value="일반">일반</option>
          <option value="휴가원">휴가원</option>
        </select>
        <select
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value);
            onSearch({
              approvalType,
              year: e.target.value,
              searchText
            });
          }}
          style={selectBoxStyle}
        >
          <option value="">년도</option>
          {getYearOptions().map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div style={searchContainerStyle}>
        <input
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            // 실시간 검색을 위해 onChange에서 바로 검색 실행
            onSearch({
              approvalType,
              year: selectedYear,
              searchText: e.target.value
            });
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onSearch({
                approvalType,
                year: selectedYear,
                searchText
              });
            }
          }}
          placeholder="문서 제목/기안 번호/기안자 입력"
          style={searchInputStyle}
        />
      </div>
    </div>
  );
};
// :흰색_확인_표시: 컨테이너 스타일 (가운데 정렬 및 좌우 배치)
const containerStyle = {
  display: "flex",
  justifyContent: "center", // :흰색_확인_표시: 왼쪽(셀렉트 박스)과 오른쪽(검색창) 정렬
  alignItems: "center",
  width: "100%", // 전체 폭 설정
  padding: "50px 0px 10px", // 위아래 패딩 추가
};
// :흰색_확인_표시: 왼쪽 셀렉트 박스 컨테이너
const selectContainerStyle = {
  display: "flex",
  gap: "10px", // :흰색_확인_표시: 셀렉트 박스 간 간격 조정
};
// :흰색_확인_표시: 검색 컨테이너 (오른쪽 배치)
const searchContainerStyle = {
  width: "220px",
  display: "flex",
  alignItems: "center",
  marginLeft: "60%",
};
// :흰색_확인_표시: 검색 입력 필드 스타일
const searchInputStyle = {
  width: "100%",
  height: "25px",
  paddingLeft: "35px", // 플레이스홀더 오른쪽 이동
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

// :흰색_확인_표시: 셀렉트 박스 스타일
const selectBoxStyle = {
  width: "80px", // :흰색_확인_표시: 버튼 크기에 맞게 조정
  height: "25px", // :흰색_확인_표시: 버튼 높이와 맞춤
  background: "white",
  border: "1px solid black",
  borderRadius: "4px",
  fontSize: "10px",
  padding: "5px",
  cursor: "pointer",
};