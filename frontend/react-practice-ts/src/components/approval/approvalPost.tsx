import { useState } from "react";
import { ApprovalMark } from "./approvalMark";

// 📌 `Post` 타입 정의
interface Post {
  id: number;
  type: string;
  approvalId: string;
  approver: string;
  title: string;
  createdAt: string;
  isUnread: boolean;
  status?: string; // ✅ 선택적 속성
}

export const ApprovalPost = () => {
  // 게시글 목록 (isUnread: true인 경우 안 읽은 게시글)
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, type: "일반", approvalId: "기안-20240205-1628", approver: "최웡카 과장", title: "[기안] 2025 사내 이벤트 추진의 건", createdAt: "2025-02-07 16:22", isUnread: true },
    { id: 2, type: "일반", approvalId: "기안-20240203-1625", approver: "최웡카 과장", title: "[공문] 경기도청 3월 환급 요청의 건", createdAt: "2025-02-06 09:21", isUnread: false },
    { id: 3, type: "일반", approvalId: "기안-20240202-1601", approver: "최웡카 과장", title: "[기안] 인천광역시청 3월 직원복지(꽃꽂이이벤트) 업무요청의 건", createdAt: "2025-02-05 14:15", isUnread: true },
    { id: 4, type: "휴가", approvalId: "휴가-20240128-1599", approver: "최웡카 과장", title: "휴가원", createdAt: "2025-02-05 10:03", isUnread: false },
    { id: 5, type: "지출결의서", approvalId: "기안-20240125-1997", approver: "김줼리 사원", title: "[지출] 성동구청 이벤트 진행을 위한 지출 요청의 건", createdAt: "2025-02-04 09:10", isUnread: true },
    { id: 6, type: "휴가", approvalId: "휴가-20240101-1595", approver: "최웡카 과장", title: "휴가원", createdAt: "2025-02-02 17:30", isUnread: false },
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
  const tableStyle:any = {
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

const tdStyle:any = {
  padding: "10px",
  fontSize: "12px",
  color: "#202224",
};

const tdTitleStyle = {
  ...tdStyle,
  textAlign: "left",
};

// 상태 스타일
const getStatusStyle:any = (status:any) => {
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
const tdIconStyle:any = {
  width: "20px", // 아이콘 크기 조정
  textAlign: "center",
};