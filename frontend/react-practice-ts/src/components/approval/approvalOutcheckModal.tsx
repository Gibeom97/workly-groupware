import React from "react";
import { useNavigate } from "react-router-dom";

const ApprovalOutcheckModal = ({ onClose, onGoBack }) => {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/approvalMain');  // 결재 메인 페이지로 이동
    onClose();  // 모달 닫기
  };

  return (
    <div style={modalOverlay}>
      <div style={modalContainer}>
        {/* 모달 헤더 */}
        <div style={modalHeader}>
          <span style={modalTitle}>알림</span>
          <button style={closeButton} onClick={onClose}>✖</button>
        </div>

        {/* 본문 메시지 */}
        <div style={messageContainer}>
          <p style={mainMessage}>작성중인 내용이 있습니다.<br />나가시겠습니까?</p>
          <p style={subMessage}>임시저장하지 않고 페이지를 벗어날 경우,<br />지금까지 작성한 내용이 사라집니다.</p>
        </div>

        {/* 버튼 컨테이너 */}
        <div style={buttonContainer}>
          <button style={backButton} onClick={onGoBack}>뒤로가기</button>
          <button style={exitButton} onClick={handleExit}>저장하지 않고 나가기</button>
        </div>
      </div>
    </div>
  );
};

// ✅ **스타일 정의**
const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContainer = {
  width: "500px",
  background: "white",
  borderRadius: "8px",
  border: "1px solid black",
  padding: "20px",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const modalHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  marginBottom: "20px",
};

const modalTitle = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#202224",
};

const closeButton = {
  position: "absolute",
  top: "10px",
  right: "15px",
  fontSize: "13px",
  cursor: "pointer",
  background: "none",
  border: "none",
  color: "black",
};

const messageContainer = {
  textAlign: "center",
  marginBottom: "20px",
};

const mainMessage = {
  fontSize: "15px",
  fontWeight: "700",
  color: "#202224",
  marginBottom: "15px",
};

const subMessage = {
  fontSize: "12px",
  fontWeight: "400",
  color: "#202224",
};

const buttonContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  width: "100%",
};

const backButton = {
  width: "220px",
  height: "45px",
  background: "#4880FF",
  borderRadius: "12px",
  border: "2px solid #4880FF",
  color: "white",
  fontSize: "13px",
  fontWeight: "600",
  cursor: "pointer",
  textAlign: "center",
};

const exitButton = {
  width: "220px",
  height: "45px",
  background: "white",
  borderRadius: "12px",
  border: "3px solid #4880FF",
  color: "#202224",
  fontSize: "13px",
  fontWeight: "600",
  cursor: "pointer",
  textAlign: "center",
};

export default ApprovalOutcheckModal;
