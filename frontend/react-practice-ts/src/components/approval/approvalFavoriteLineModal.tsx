import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ApprovalFavoriteLineModal = ({ onClose, approvalLines, refreshFavoriteList, userNo }) => {
  const [favoriteName, setFavoriteName] = useState("");
  const [loading, setLoading] = useState(false)


  // 백엔드API 요청 (저장 가능)
  const saveFavoriteLine = async () => {
    if (!favoriteName.trim()){
      alert("즐겨찾기 이름을 입력해주세요");
      return;
    }

      setLoading(true);

    try {
      // 즐겨찾기 정보 저장
      const favoriteResponse = await axios.post(
        "http://localhost:8003/workly/api/approval/saveFavoriteInfo",
        {favoriteName, userNo},
        {headers: { "Content-Type":"application/json"}}
      );

      console.log("서버 응답:", favoriteResponse); // 응답 전체 확인
      console.log("서버에서 받은 데이터:", favoriteResponse.data); // 데이터 확인인
      // 서버에서 생성된 LINE_NO 받아오기
      const lineNo = favoriteResponse.data;

      if(!lineNo){
        throw new Error("LINE_NO를 받지 못했습니다.");
      }

      console.log("생성된 LINE_NO:", lineNo);

      // 결재라인에 포함된 사람들 저장
      if (!approvalLines || !Array.isArray(approvalLines)) {
        console.error("approvalLines가 존재하지 않거나 배열이 아닙니다.", approvalLines);
        return;
    }
      const approvalLineData = approvalLines.map(emp => ({
        lineNo, // 받아온 LINE_NO사용
        userNo: emp.USER_NO, // 결재라인에 포함된 사람
        approvalType: emp.approvalType,
        type: emp.type,
        level: emp.level,
      }));

      console.log("전송할 결재라인 데이터:", approvalLineData);

      await axios.post(
        "http://localhost:8003/workly/api/approval/saveFavoriteLine",
        approvalLineData,
        {headers: {"Content-Type":"application/json"}}
      );

      if (refreshFavoriteList) {
        refreshFavoriteList(); // 저장된 즐겨찾기 리스트 바로 화면에 출력
      }

      console.log("즐겨찾기 결재라인 저장 완료!");
      alert("즐겨찾기 저장 완료")
      onClose();
    }catch(error){
      console.error("즐겨찾기 저장 실패:", error);
      alert("즐겨찾기 저장에 실패했습니다.");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div style={modalOverlay}>
      <div style={modalContainer}>
        <div style={modalHeader}>
          <span style={modalTitle}>즐겨찾기 명</span>
          <button style={closeButton} onClick={onClose}>×</button>
        </div>

        {/* 입력 필드 */}
        <input
          type="text"
          placeholder="결재라인 즐겨찾기 명 입력"
          value={favoriteName}
          onChange={(e) => setFavoriteName(e.target.value)}
          style={inputStyle}
        />

        {/* 저장 버튼 */}
        <button style={saveButton} onClick={saveFavoriteLine} disabled={loading}>
          {loading ? "저장 중..." : "저장"}</button>
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
