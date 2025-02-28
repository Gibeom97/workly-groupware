import { useState, useEffect } from "react";
import axios from "axios";
import { format, addHours, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { ApprovalSearchBar } from "../../components/approval/approvalSearchBar";
import { ApprovalFooter2 } from "./approvalFooter2";
import { useNavigate } from "react-router-dom"; // :흰색_확인_표시: 페이지 이동을 위한 Hook 추가
interface Post {
  approvalNo: number;
  userNo?: number;
  approvalType: string;
  approvalStatus: number;
  approvalTitle: string;
  approvalContent?: string;
  startDate: string;
  endDate?: string;
  approvalUser?: string;
}
interface SearchParams {
  approvalType: string;
  year: string;
  searchText: string;
}
interface ApprovalTempBodyProps {
  selectedPosts: number[];
  setSelectedPosts: (posts: number[]) => void;
  filteredPosts: any[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  postsPerPage: number;
  isLoading: boolean;
}
export const ApprovalTempBody = ({
  selectedPosts,
  setSelectedPosts,
  filteredPosts,
  currentPage,
  setCurrentPage,
  postsPerPage,
  isLoading
}: ApprovalTempBodyProps) => {
  if (isLoading) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }
  // 현재 페이지의 게시글만 표시
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  // 체크박스 처리
  const handleCheckboxChange = (tempNo: number) => {
    setSelectedPosts(prev => {
      if (prev.includes(tempNo)) {
        return prev.filter(item => item !== tempNo);
      } else {
        return [...prev, tempNo];
      }
    });
  };
  const formatDate = (timestamp: number | null) => {
    try {
        if (!timestamp) {
            return '-';
        }
        const date = new Date(timestamp);
        // 'aa'를 사용하여 오전/오후 표시
        return format(date, 'yyyy. MM. dd aa hh:mm', {
            locale: ko
        });
    } catch (error) {
        console.error('날짜 포맷팅 오류:', error);
        return '-';
    }
  };
  return (
    <div style={containerStyle}>
      {currentPosts.length === 0 ? (
        <div>문서가 없습니다.</div>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPosts(currentPosts.map(post => post.tempNo));
                    } else {
                      setSelectedPosts([]);
                    }
                  }}
                  checked={currentPosts.length > 0 && selectedPosts.length === currentPosts.length}
                />
              </th>
              <th style={thStyle}>구분</th>
              <th style={thStyle}>기안번호</th>
              <th style={thStyle}>제목</th>
              <th style={thStyle}>기안일</th>
              <th style={thStyle}>상태</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post) => (
              <tr key={post.tempNo} style={rowStyle}>
                <td style={tdStyle}>
                  <input
                    type="checkbox"
                    checked={selectedPosts.includes(post.tempNo)}
                    onChange={() => handleCheckboxChange(post.tempNo)}
                  />
                </td>
                <td style={tdStyle}>{post.approvalType}</td>
                <td style={tdStyle}>{`임시저장-${post.tempNo}`}</td>
                <td style={tdTitleStyle}>{post.approvalTitle}</td>
                <td style={tdStyle}>
                  {post.createdAt ? formatDate(post.createdAt) : '-'}
                </td>
                <td style={tdStyle}>
                  <span style={statusStyle}>임시저장</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
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
const rowStyle = {
  borderBottom: "1px solid #E0E0E0",
  "&:hover": {
    backgroundColor: "#F8F9FA",
  },
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
const statusStyle = {
  padding: "5px 10px",
  borderRadius: "4px",
  backgroundColor: "#E0E0E0",
  color: "#202224",
  fontSize: "12px",
  fontWeight: "bold",
};