import React from "react";

interface ApprovalMarkProps {
  isUnread: boolean;
}

export const ApprovalMark: React.FC<ApprovalMarkProps> = ({ isUnread }) => {
  if (!isUnread) return null; // 읽은 게시글이면 아무것도 표시하지 않음

  return <div style={markStyle} />;
};

// ✅ `position: absolute` 제거하여 `td` 안에서 자연스럽게 정렬되도록 변경
const markStyle = {
  width: 10,
  height: 10,
  background: "#4880FF",
  borderRadius: "50%",
  marginRight: "8px", // 글자와 간격 조정
};

export default ApprovalMark;
