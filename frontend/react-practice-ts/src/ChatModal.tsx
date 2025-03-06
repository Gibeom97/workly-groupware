import React, { useRef } from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ChatModal = ({ isOpen, onClose, children }: ChatModalProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Draggable nodeRef={nodeRef} handle=".chat-drag-handle">
      <div
        ref={nodeRef}
        style={{
          position: "fixed",
          top: "100px",
          left: "100px",
          width: "391px",
          height: "598px",
          zIndex: 1000,
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          // flex 레이아웃으로 변경
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 상단 영역 (드래그 핸들) */}
        <div
          className="chat-drag-handle"
          style={{
            padding: "18px",
            backgroundColor: "#E9EBF1",
            cursor: "move",
            display: "flex",
            justifyContent: "space-between",
            
            // 필요하다면 정확한 높이를 지정해도 됨 (예: height: '50px')
          }}
        >
          <div
            className="containerHeaderLogoWrapper"
            style={{
              position: "absolute",
              left: "12px",
              top: "7px",
              fontSize: "16px",
              fontFamily: "'Nunito Sans', sans-serif",
              fontWeight: 800,
              color: "#4880FF",
              display: "inline-block",
            }}
          >
            Workly
          </div>
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "9px",
              right: "10px",
              zIndex: 10,
              background: "transparent",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        {/* 실제 채팅 영역: flex: 1로 나머지 공간을 전부 사용하도록 함 */}
        <div style={{ flex: 1, }}>
          {children}
        </div>
      </div>
    </Draggable>,
    document.body
  );
};

export default ChatModal;
