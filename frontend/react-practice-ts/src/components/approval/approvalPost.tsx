import { useState, useEffect } from "react";
import { ApprovalMark } from "./approvalMark";
import axios from 'axios';
import { ApprovalFooter } from "./approvalFooter";

interface Post {
  approvalNo: number;
  userNo: number;
  approvalType: string;
  approvalStatus: string;
  approvalTitle: string;
  approvalContent: string;
  startDate: string;
  endDate: string;
  approvalUser: string;
}

export const ApprovalPost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8003/workly/api/approval/list');
        console.log("서버 응답 데이터:", response.data);
        setPosts(response.data);
      } catch (error) {
        console.error('결재 목록을 불러오는데 실패했습니다:', error);
      }
    };

    fetchPosts();
  }, []);

  // 현재 페이지에 해당하는 데이터 가져오기
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

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
          {currentPosts.map((post) => (
            <tr key={post.approvalNo} style={rowStyle}>
              <td style={tdIconStyle}>
                <ApprovalMark isUnread={post.approvalStatus === '미확인'} />
              </td>
              <td style={tdStyle}>{post.approvalType}</td>
              <td style={tdStyle}>{`기안-${post.approvalNo}`}</td>
              <td style={tdStyle}>{post.approvalUser}</td>
              <td style={tdTitleStyle}>{post.approvalTitle}</td>
              <td style={tdStyle}>{new Date(post.startDate).toLocaleString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })}</td>
              <td style={tdStyle}>
                <span style={getStatusStyle(post.approvalStatus)}>{post.approvalStatus}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ApprovalFooter totalPosts={posts.length} postsPerPage={postsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};


const containerStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
};

const tableStyle:any = {
    width: "90%",
    borderCollapse: "collapse",
    textAlign: "center",
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

const tdIconStyle:any = {
  width: "20px",
  textAlign: "center",
};
