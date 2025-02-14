import React from "react";

interface ChatDropdownProps {
  selectedStatus: string; // 선택된 상태
  setSelectedStatus: (status: string) => void; // 상태 변경 함수
  isOpen: boolean; // 드롭다운 열림 여부
}

const ChatDropdown: React.FC<ChatDropdownProps> = ({ selectedStatus, setSelectedStatus, isOpen }) => {
  const statuses = ["활성화", "비활성화", "회의중", "자리비움"];

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* 드롭다운이 열렸을 때만 SELECT 박스 표시 */}
      {isOpen ? (
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)} // 선택한 값 상태 변경
          style={{
            fontSize: "11px",
            fontWeight: "500",
            color: "#202224",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "2px 6px",
            background: "white",
            cursor: "pointer",
          }}
        >
          {statuses.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
      ) : (
        // 드롭다운이 닫혔을 때 현재 선택된 상태 표시
        <div
          style={{
            fontSize: "11px",
            fontWeight: "500",
            color: "#B3B3B3",
            cursor: "pointer",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "2px 6px",
            background: "white",
          }}
        >
          {selectedStatus}
        </div>
      )}
    </div>
  );
};

export default ChatDropdown;
