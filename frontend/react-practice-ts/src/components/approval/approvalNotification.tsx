import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";

const NotificationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationType, setNotificationType] = useState<string | null>(null);
  const navigate = useNavigate();

  // ✅ Redux에서 현재 알림 상태 가져오기
  const approvalRequest = useSelector((state: RootState) => state.notifications.approvalRequest);
  const approvalSend = useSelector((state: RootState) => state.notifications.approvalSend);
  const approvalReference = useSelector((state: RootState) => state.notifications.approvalReference);
  const approvalFinish = useSelector((state: RootState) => state.notifications.approvalFinish);
  const approvalReject = useSelector((state: RootState) => state.notifications.approvalReject);

  useEffect(() => {
    // ✅ 이전 알림 상태 가져오기
    let previousState = {
      approvalRequest: 0,
      approvalSend: 0,
      approvalReference: 0,
      approvalFinish: 0,
      approvalReject: 0,
    };

    try {
      const storedState = JSON.parse(localStorage.getItem("latestNotification") || "{}");
      if (storedState) previousState = storedState;
    } catch (error) {
      console.error("❌ JSON 파싱 오류:", error);
    }

    // ✅ 현재 Redux 상태 저장
    const currentState = {
      approvalRequest,
      approvalSend,
      approvalReference,
      approvalFinish,
      approvalReject,
    };

    // ✅ 변경된 알림 개수 확인
    const changes = {
      "결재 요청": currentState.approvalRequest - (previousState.approvalRequest || 0),
      "결재 수신": currentState.approvalSend - (previousState.approvalSend || 0),
      "결재 참조": currentState.approvalReference - (previousState.approvalReference || 0),
      "결재 완료": currentState.approvalFinish - (previousState.approvalFinish || 0),
      "결재 반려": currentState.approvalReject - (previousState.approvalReject || 0),
    };

    // ✅ 알림 우선순위 정의 (결재 참조가 결재 완료보다 우선)
    const priorityOrder = ["결재 요청", "결재 수신", "결재 참조", "결재 반려", "결재 완료"];

    // ✅ 증가한 알림 유형을 필터링하여 우선순위대로 정렬
    const updatedNotifications = Object.keys(changes)
      .filter(key => changes[key] > 0)
      .sort((a, b) => priorityOrder.indexOf(a) - priorityOrder.indexOf(b));

    // ✅ 알림이 증가한 경우, 가장 높은 우선순위의 알림 선택
    if (updatedNotifications.length > 0) {
      const highestPriority = updatedNotifications[0];
      console.log(`📢 새로운 알림: ${highestPriority}`); // ✅ 디버깅 로그 추가
      setNotificationType(highestPriority);
      setIsModalOpen(true);

      // ✅ 최신 알림 상태를 localStorage에 저장 (비동기 처리 오류 방지)
      setTimeout(() => {
        localStorage.setItem("latestNotification", JSON.stringify(currentState));
      }, 100);
    }

    // ✅ 5초 후 자동으로 모달 닫기
    const timer = setTimeout(() => {
      setIsModalOpen(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [approvalRequest, approvalSend, approvalReference, approvalFinish, approvalReject]);

  // ✅ 모달 클릭 시 페이지 이동
  const handleModalClick = () => {
    let targetPage = "/approvalMain";
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
    setIsModalOpen(false);
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
            cursor: "pointer",
          }}
          onClick={handleModalClick}
        >
          {/* ✅ X 버튼 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
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
    </>
  );
};

export default NotificationModal;
