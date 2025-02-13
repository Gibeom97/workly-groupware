import React, { useState } from "react";

const ApprovalFavoriteLineModal = ({ onClose }) => {
  return (
    <div style={modalOverlay}>
      <div style={modalContainer}>
        {/* 모달 헤더 */}
        <div style={modalHeader}>
          <span style={modalTitle}>즐겨찾기 명</span>
          <button style={closeButton} onClick={onClose}>×</button>
        </div>

        {/* 입력 필드 */}
        <input type="text" placeholder="결재라인 즐겨찾기 명 입력" style={inputStyle} />

        {/* 저장 버튼 */}
        <button style={saveButton}>저장</button>
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
  width: "459px",
  height: "205px",
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
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  marginBottom: "20px",
  position: "relative",
};

const modalTitle = {
  fontSize: "16px",
  fontWeight: "700",
  textAlign: "center",
};

const closeButton = {
  position: "absolute",
  top: "-10px",
  right: "-10px",
  background: "white",
  border: "none",
  cursor: "pointer",
  padding: "5px",
  fontSize: "24px",
  color: "#000",
  width: "30px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const inputStyle = {
  width: "90%",
  height: "34px",
  borderRadius: "4px",
  border: "1px solid black",
  padding: "8px",
  fontSize: "14px",
  textAlign: "center",
  marginBottom: "20px",
};

const saveButton = {
  width: "90%",
  height: "41px",
  background: "#4880FF",
  borderRadius: "14px",
  border: "3px solid #4880FF",
  color: "white",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  textAlign: "center",
};

export default ApprovalFavoriteLineModal;
