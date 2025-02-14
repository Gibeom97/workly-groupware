import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const ApprovalHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleButtonClick = (index: number, path: string) => {
    setActiveIndex(index);
    navigate(path); // ✅ 페이지 이동
  };

  return (
    <header style={headerStyle}>
      {buttons.map((button, index) => {
        const isActive = location.pathname === button.path; // ✅ 현재 URL과 버튼 path 비교
        return (
          <button
            key={index}
            onClick={() => handleButtonClick(index, button.path)}
            style={isActive ? activeButtonStyle : buttonStyle} // ✅ 현재 URL과 일치하면 활성화 스타일 적용
            onMouseOver={(e) => (e.currentTarget.style.background = isActive ? "#4880FF" : "#E0E0E0")}
            onMouseOut={(e) => (e.currentTarget.style.background = isActive ? "#4880FF" : "white")}
          >
            {button.label}
          </button>
        );
      })}
    </header>
  );
};

// ✅ 버튼 목록 (경로 지정)
const buttons = [
  { label: "내 문서함", path: "/approvalMain" },
  { label: "임시저장", path: "/approvalTempPage" },
  { label: "결재진행", path: "/ApprovalProgressPage" },
  { label: "결재완료", path: "/ApprovalFinishPage" },
  { label: "결재요청", path: "/ApprovalRequestPage" },
  { label: "결재참조", path: "/ApprovalReferencePage" },
  { label: "결재반려", path: "/approvalRejectPage" },
];

// ✅ 스타일 정의
const headerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "10vh",
  gap: 40,
  borderRadius: 10,
};

const buttonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 100,
  height: 50,
  background: "white",
  borderRadius: 14,
  border: "0.3px solid #B9B9B9",
  cursor: "pointer",
  textDecoration: "none",
  color: "black",
  fontSize: "16px",
  fontWeight: "bold",
  transition: "0.3s",
  padding: "0 15px",
};

const activeButtonStyle = {
  ...buttonStyle,
  background: "#4880FF",
  color: "white",
  border: "0.3px solid #4880FF",
};
