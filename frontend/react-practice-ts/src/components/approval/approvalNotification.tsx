import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
const NotificationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationType, setNotificationType] = useState<string | null>(null);
  const navigate = useNavigate(); // ✅ 페이지 이동을 위한 Hook 추가
  // ✅ Redux에서 현재 알림 상태 가져오기
  const approvalRequest = useSelector((state: RootState) => state.notifications.approvalRequest);
  const approvalSend = useSelector((state: RootState) => state.notifications.approvalSend);
  const approvalReference = useSelector((state: RootState) => state.notifications.approvalReference);
  const approvalFinish = useSelector((state: RootState) => state.notifications.approvalFinish);
  const approvalReject = useSelector((state: RootState) => state.notifications.approvalReject);
  useEffect(() => {
    let previousState;
    try {
      previousState = JSON.parse(sessionStorage.getItem("latestNotification") || "{}");
    } catch (error) {
      console.error("❌ JSON 파싱 오류:", error);
      previousState = {}; // 기본값 설정
    }
  
    // ✅ 각 알림 유형별 증가량 계산
    const changes = {
      "결재 요청": approvalRequest - (previousState.approvalRequest || 0),
      "결재 수신": approvalSend - (previousState.approvalSend || 0),
      "결재 참조": approvalReference - (previousState.approvalReference || 0),
      "결재 완료": approvalFinish - (previousState.approvalFinish || 0),
      "결재 반려": approvalReject - (previousState.approvalReject || 0),
    };
  
    // ✅ 가장 큰 증가량을 가진 알림 유형 찾기
    const maxChangeType = Object.keys(changes).reduce((a, b) =>
      changes[a] > changes[b] ? a : b
    );
  
    // ✅ 증가량이 0보다 클 때만 알림 표시
    if (changes[maxChangeType] > 0) {
      setNotificationType(maxChangeType);
      setIsModalOpen(true);
  
      sessionStorage.setItem(
        "latestNotification",
        JSON.stringify({
          approvalRequest,
          approvalSend,
          approvalReference,
          approvalFinish,
          approvalReject,
        })
      );
  
      // ✅ 5초 후 자동으로 모달 닫기
      const timer = setTimeout(() => {
        setIsModalOpen(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [approvalRequest, approvalSend, approvalReference, approvalFinish, approvalReject]);
  // ✅ 모달 클릭 시 페이지 이동
  const handleModalClick = () => {
    let targetPage = "/approvalMain"; // 기본 경로
    switch (notificationType) {
      case "결재 요청":
        targetPage = "/ApprovalRequestPage";
        break;
      case "결재 수신":
        targetPage = "/ApprovalSendPage";
        break;
      case "결재 참조":
        targetPage = "/ApprovalReferencePage";
        break;
      case "결재 완료":
        targetPage = "/ApprovalFinishPage";
        break;
      case "결재 반려":
        targetPage = "/approvalRejectPage";
        break;
      default:
        targetPage = "/approvalMain";
    }
    navigate(targetPage);
    setIsModalOpen(false); // ✅ 모달 닫기
  };
  return (
    <>
      {isModalOpen && notificationType && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "350px",
            height: "150px",
            background: "rgba(255, 255, 255, 0.95)",
            padding: "15px",
            borderRadius: "12px",
            textAlign: "center",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#333",
            animation: "slideIn 0.5s ease-out",
            border: "1px solid #202224",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(8px)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            cursor: "pointer", // ✅ 클릭 가능하도록 커서 변경
          }}
          onClick={handleModalClick} // ✅ 클릭 시 페이지 이동
        >
          {/* ✅ X 버튼 (모달 내부 우측 상단) */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // ✅ 모달 클릭과 X 버튼 클릭이 겹치지 않도록 방지
              setIsModalOpen(false);
            }}
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              width: "24px",
              height: "24px",
              background: "transparent",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              color: "#202224",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            x
          </button>
          📢 새로운 {notificationType} 문서가 도착했습니다
        </div>
      )}
      {/* ✅ 모달 애니메이션 효과 */}
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateY(100px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </>
  );
};
export default NotificationModal;