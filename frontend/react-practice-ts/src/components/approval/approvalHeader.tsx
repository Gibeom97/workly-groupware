import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { showNotification } from "../../features/approvalNotificationsSlice";

export const ApprovalHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const counts = useSelector((state: any) => state.notifications);
  const userNo = useSelector((state: any) => state.user.userNo);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  
  const handleButtonClick = (index: number, path: string) => {
    setActiveIndex(index);
    navigate(path); // ✅ 페이지 이동
  };
  
   // 새로운 문서가 추가되면 모달 알림 표시
   useEffect(() => {
    Object.keys(counts).forEach((key) => {
      if (counts[key] > 0) {
        dispatch(showNotification(`새로운 ${key} 문서가 도착했습니다!`));
        setModalMessage(`📢 새로운 ${key} 문서가 도착했습니다!`);
        setShowModal(true);
      }
    });
  }, [counts, dispatch]);

  return (
    <>
      <header style={headerStyle}>
        {buttons.map((button, index) => {
          const isActive = location.pathname === button.path;
          const countKey = button.countKey;
          const count = countKey ? counts[countKey] || 0 : 0; 

          return (
            <div key={index} style={{ position: "relative" }}>
              <button
                onClick={() => handleButtonClick(index, button.path)}
                style={isActive ? activeButtonStyle : buttonStyle}
                onMouseOver={(e) => (e.currentTarget.style.background = isActive ? "#4880FF" : "#E0E0E0")}
                onMouseOut={(e) => (e.currentTarget.style.background = isActive ? "#4880FF" : "white")}
              >
                {button.label}
              </button>

              {/* 🔴 countKey가 있는 경우에만 개수 배지 표시 */}
              {countKey && count > 0 && <span style={badgeStyle}>{count}</span>}
            </div>
          );
        })}
      </header>

      {/* 📢 모달 알림 */}
      {showModal && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <p>{modalMessage}</p>
            <button onClick={() => setShowModal(false)} style={modalButton}>확인</button>
          </div>
        </div>
      )}
    </>
  );
};

// ✅ 버튼 목록 (경로 지정)
const buttons = [
  { label: "내 문서함", path: "/approvalMain" },
  { label: "임시저장", path: "/approvalTempPage" },
  { label: "결재진행", path: "/ApprovalProgressPage" },
  { label: "결재완료", path: "/ApprovalFinishPage", countKey: "approvalComplete" },
  { label: "결재요청", path: "/ApprovalRequestPage", countKey: "approvalRequest" },
  { label: "결재참조", path: "/ApprovalReferencePage", countKey: "approvalReference" },
  { label: "결재수신", path: "/ApprovalSendPage", countKey: "approvalReceive" },
  { label: "결재반려", path: "/approvalRejectPage", countKey: "approvalReject" },
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

// 🔴 알림 배지 스타일 (새로운 문서 개수 표시)
const badgeStyle = {
  position: "absolute",
  top: "-5px",
  right: "-10px",
  background: "red",
  color: "white",
  fontSize: "12px",
  fontWeight: "bold",
  borderRadius: "50%",
  width: "20px",
  height: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

// 📢 모달 스타일
const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modalContent = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  minWidth: "300px",
};

const modalButton = {
  marginTop: "10px",
  padding: "8px 12px",
  border: "none",
  backgroundColor: "#4880FF",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer",
};
