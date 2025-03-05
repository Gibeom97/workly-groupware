import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface ApprovalPostProps {
  selectedPosts: number[];
  setSelectedPosts: (posts: number[]) => void;
  filteredPosts: any[];
  currentPage: number;
  postsPerPage: number;
}

export const ApprovalTempBody = ({
  selectedPosts,
  setSelectedPosts,
  filteredPosts,
  currentPage,
  postsPerPage
}: ApprovalPostProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "yyyy.MM.dd a hh:mm", { locale: ko });
    } catch (error) {
      console.error("날짜 포맷팅 오류:", error);
      return dateString;
    }
  };

  // 현재 페이지의 게시글만 표시
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div style={containerStyle}>
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
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <tr key={post.tempNo} style={rowStyle}>
                <td style={tdStyle}>
                  <input
                    type="checkbox"
                    checked={selectedPosts.includes(post.tempNo)}
                    onChange={() =>
                      setSelectedPosts(prev =>
                        prev.includes(post.tempNo) ? prev.filter(item => item !== post.tempNo) : [...prev, post.tempNo]
                      )
                    }
                  />
                </td>
                <td style={tdStyle}>{post.approvalType}</td>
                <td style={tdStyle}>{`임시저장-${post.tempNo}`}</td>
                <td
                  style={{ ...tdTitleStyle, cursor: "pointer" }}
                  onClick={() => navigate(`/ApprovalWritePage?tempNo=${post.tempNo}`)}
                >
                  {post.approvalTitle}
                </td>
                <td style={tdStyle}>{post.startDate ? formatDate(post.startDate) : "-"}</td>
                <td style={tdStyle}>
                  <span style={statusStyle}>임시저장</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: "20px", fontSize: "14px", color: "#888" }}>
                문서가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// ✅ 스타일 추가
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
  cursor: "pointer",
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
  backgroundColor: "#ffa500",
  color: "#EEEEEE",
  fontSize: "12px",
  fontWeight: "bold",
};
