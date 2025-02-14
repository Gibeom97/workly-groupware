import { useState } from "react";
import { ApprovalMark } from "./approvalMark";

export const ApprovalReferencePost = () => {
  // 게시글 목록 (isUnread: true인 경우 안 읽은 게시글)
  const [posts, setPosts] = useState([
    { id: 5, type: "지출결의서", approvalId: "기안-20240125-1997", approver: "김줼리 사원", title: "[지출] 성동구청 이벤트 진행을 위한 지출 요청의 건", createdAt: "2025-02-04 09:10", isUnread: true },
  ]);

  return (
    <div style={containerStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}></th>
            <th style={thStyle}>구분</th>
            <th style={thStyle}>기안번호</th>
            <th style={thStyle}>기안자</th>
            <th style={thStyle}>제목</th>
            <th style={thStyle}>기안일</th>
            <th style={thStyle}>상태</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr key={post.id} style={rowStyle}>
              <td style={tdIconStyle}>
                <ApprovalMark isUnread={post.isUnread} />
              </td>
              <td style={tdStyle}>{post.type}</td>
              <td style={tdStyle}>{post.approvalId}</td>
              <td style={tdStyle}>{post.approver}</td>
              <td style={tdTitleStyle}>{post.title}</td>
              <td style={tdStyle}>{post.createdAt}</td>
              <td style={tdStyle}>
                <span style={getStatusStyle(post.status)}>{post.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const containerStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  };
  
  // ✅ 테이블 스타일 (오른쪽으로 이동 & 폭 넓힘)
  const tableStyle = {
    width: "90%", // ✅ 기존 90% → 95%로 넓힘
    borderCollapse: "collapse",
    textAlign: "center",
    justifyContent: "center",
    height: "30vh", // (예시) 전체 화면 기준으로 중앙 정렬
};

const thStyle = {
  padding: "12px",
  borderBottom: "2px solid #202224",
  fontSize: "13px",
  fontWeight: 700,
};

const rowStyle = {
  borderBottom: "1px solid #E0E0E0",
};

const tdStyle = {
  padding: "10px",
  fontSize: "12px",
  color: "#202224",
};

const tdTitleStyle = {
  ...tdStyle,
  textAlign: "left",
};

// 상태 스타일
const getStatusStyle = (status) => {
  let baseStyle = {
    padding: "5px 10px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: 700,
    minWidth: "60px",
    display: "inline-block",
    textAlign: "center",
  };

  switch (status) {
    case "완료":
      return { ...baseStyle, background: "#3E7BE6", color: "white" };
    case "진행중":
      return { ...baseStyle, background: "#157137", color: "white" };
    case "반려":
      return { ...baseStyle, background: "#EB0909", color: "white" };
    default:
      return { ...baseStyle, background: "#E0E0E0", color: "#202224", opacity: 0.3 };
  }
};

// 아이콘을 위한 셀 스타일 (왼쪽 정렬)
const tdIconStyle = {
  width: "20px", // 아이콘 크기 조정
  textAlign: "center",
};