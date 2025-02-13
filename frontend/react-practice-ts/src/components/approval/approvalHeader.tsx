import { useState } from "react";
import { Link } from "react-router-dom";

export const ApprovalHeader = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // 활성화된 버튼 상태

  return (
    <header style={headerStyle}>
      {buttons.map((button, index) => (
        <Link
          key={index}
          to={button.path}
          onClick={() => setActiveIndex(index)} // 클릭 시 활성화 상태 변경
          style={activeIndex === index ? activeButtonStyle : buttonStyle} // 활성 버튼 스타일 적용
          onMouseOver={(e) => (e.currentTarget.style.background = activeIndex === index ? "#4880FF" : "#E0E0E0")}
          onMouseOut={(e) => (e.currentTarget.style.background = activeIndex === index ? "#4880FF" : "white")}
        >
          {button.label}
        </Link>
      ))}
    </header>
  );
};

// ✅ `header`를 중앙에서 살짝 위로 정렬하고 버튼 간격 조정
const headerStyle = {
  display: "flex",
  gap: 25, // ✅ 버튼 간격을 더 넓힘
  alignItems: "center",
  padding: 10,
  background: "white",
  borderRadius: 10,
};

// 버튼 목록
const buttons = [
  { label: "내 문서함", path: "/내 문서함" },
  { label: "임시저장", path: "/임시저장" },
  { label: "결재진행", path: "/결재진행" },
  { label: "결재완료", path: "/결재완료" },
  { label: "결재요청", path: "/결재요청" },
  { label: "결재참조", path: "/결재참조" },
  { label: "결재반려", path: "/결재반려" },
];

// 기본 버튼 스타일
const buttonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 80, // ✅ 버튼 크기 줄임
  height: 40,
  background: "white",
  borderRadius: 14,
  border: "0.3px solid #B9B9B9",
  cursor: "pointer",
  textDecoration: "none",
  color: "black",
  fontSize: "12.5px",
  fontWeight: "bold", // ✅ 글자 두껍게 유지
  transition: "0.3s",
  padding: "0 15px", // ✅ 좌우 패딩도 줄여서 조정
};

// 활성 버튼 스타일 (파란색 버튼)
const activeButtonStyle = {
  ...buttonStyle,
  background: "#4880FF",
  color: "white",
  border: "0.3px solid #4880FF",
};
