import { useState } from "react";

export const ApprovalTempBody = () => {
  // 게시글 목록
  const [posts, setPosts] = useState([
    { id: 1, type: "일반", approvalId: "기안-20250201-1558", approver: "최웡카 과장", title: "[기안] 2025 외부 행사 추진의 건", createdAt: "2025-02-01 16:22" },
    { id: 2, type: "일반", approvalId: "기안-20250131-1622", approver: "최웡카 과장", title: "[공문] 서울시청 2월 환급 요청의 건", createdAt: "2025-01-31 09:21" },
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
              <td style={tdCheckboxStyle}>
                <input type="checkbox" />
              </td>
              <td style={tdStyle}>{post.type}</td>
              <td style={tdStyle}>{post.approvalId}</td>
              <td style={tdStyle}>{post.approver}</td>
              <td style={tdTitleStyle}>{post.title}</td>
              <td style={tdStyle}>{post.createdAt}</td>
              <td style={tdStyle}>-</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 스타일 정의
const containerStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
};

const tableStyle = {
  width: "90%",
  borderCollapse: "collapse",
  textAlign: "center",
};

const thStyle = {
  padding: "12px",
  borderBottom: "2px solid #202224",
  fontSize: "13px",
  fontWeight: "bold",
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

const tdCheckboxStyle = {
  width: "30px",
  textAlign: "center",
};
