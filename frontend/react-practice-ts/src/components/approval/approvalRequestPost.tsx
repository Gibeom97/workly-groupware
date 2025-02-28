import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format, addHours } from "date-fns";
import { ko } from "date-fns/locale";
import { ApprovalMark } from "./approvalMark";

interface ApprovalRequestPostProps {
  filteredPosts: any[];
  currentPage: number;
  postsPerPage: number;
}

export const ApprovalRequestPost = ({
  filteredPosts,
  currentPage,
  postsPerPage
}: ApprovalRequestPostProps) => {
  const navigate = useNavigate();

  // ✅ 13자리 숫자를 한국 시간(KST) 형식으로 변환하는 함수
  const formatKST = (timestamp: number | string) => {
    if (!timestamp) return "N/A";

    let ts = Number(timestamp);
    if (ts.toString().length === 10) {
      ts *= 1000; // 초 단위(10자리) → 밀리초(13자리) 변환
    }

    const date = addHours(new Date(ts), 9); // UTC → KST 변환 (9시간 추가)
    return format(date, "yyyy. MM. dd. a hh:mm", { locale: ko });
  };

  // 현재 페이지의 게시물 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // 기존 handleRowClick 함수 유지
  const handleRowClick = (approvalNo: number) => {
    window.location.href = `/ApprovalConfirmPage/${approvalNo}`;
  }

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
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <tr 
                key={post.approvalNo} 
                style={{ ...rowStyle, cursor: "pointer" }}
                onClick={() => handleRowClick(post.approvalNo)}
              >
                <td style={tdIconStyle}>
                  <ApprovalMark isUnread={post.isUnread} />
                </td>
                <td style={tdStyle}>{post.approvalType}</td>
                <td style={tdStyle}>{`기안-${post.approvalNo}`}</td>
                <td style={tdStyle}>{post.userName}</td>
                <td style={tdTitleStyle}>{post.approvalTitle}</td>
                <td style={tdStyle}>{formatKST(post.startDate)}</td>
                <td style={tdStyle}>
                  <span style={getStatusStyle(post.approvalStatus)}>
                    {getStatusText(post.approvalStatus)}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} style={emptyRowStyle}>
                요청된 결재 리스트가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// ✅ 스타일 정의
const containerStyle = {
  width: "100%",
  padding: "20px",
  backgroundColor: "#fff",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse" as const,
  marginTop: "10px",
};

const thStyle = {
  padding: "12px",
  borderBottom: "2px solid #202224",
  fontSize: "13px",
  fontWeight: "bold",
  textAlign: "center" as const,
};

const tdStyle = {
  padding: "12px",
  fontSize: "12px",
  color: "#202224",
  textAlign: "center" as const,
};

const tdTitleStyle = {
  ...tdStyle,
  textAlign: "left" as const,
};

const tdIconStyle = {
  ...tdStyle,
  width: "20px",
};

const rowStyle = {
  borderBottom: "1px solid #E0E0E0",
};

const emptyRowStyle = {
  padding: "20px",
  textAlign: "center" as const,
  fontSize: "14px",
  color: "#888",
};

const paginationStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '5px',
  marginTop: '20px',
};

const paginationButtonStyle = {
  padding: '5px 10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  cursor: 'pointer',
};

// ✅ 상태 텍스트 변환 함수
const getStatusText = (status: number) => {
  switch (status) {
    case 1: return "진행중";
    case 2: return "완료";
    case 3: return "반려";
    default: return "알 수 없음";
  }
};

// ✅ 상태 스타일 함수
const getStatusStyle = (status: number) => {
  let baseStyle = {
    padding: "5px 10px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: 700,
    minWidth: "60px",
    display: "inline-block",
    textAlign: "center" as const,
  };

  switch (status) {
    case 2:
      return { ...baseStyle, background: "#3E7BE6", color: "white" };
    case 1:
      return { ...baseStyle, background: "#ffa500", color: "white" };
    case 3:
      return { ...baseStyle, background: "#EB0909", color: "white" };
    default:
      return { ...baseStyle, background: "#E0E0E0", color: "#202224", opacity: 0.3 };
  }
};

