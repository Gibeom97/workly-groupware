import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface ApprovalPostProps {
  filteredPosts: any[];
  currentPage: number;
  postsPerPage: number;
  setCurrentPage: (page: number) => void;
}

export const ApprovalSendPost = ({
  filteredPosts,
  currentPage,
  postsPerPage,
  setCurrentPage
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

  const thStyle = {
    padding: "12px",
    borderBottom: "2px solid #202224",
    fontSize: "13px",
    fontWeight: "bold",
    textAlign: "center" as const,
  };

  const thTitleStyle = {
    ...thStyle,
    textAlign: "left" as const,
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

  return (
    <div style={{ width: "100%", padding: "20px", backgroundColor: "#fff" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr>
            <th style={thStyle}>구분</th>
            <th style={thStyle}>기안번호</th>
            <th style={thStyle}>기안자</th>
            <th style={thStyle}>제목</th>
            <th style={thStyle}>기안일</th>
            <th style={thStyle}>상태</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <tr
                key={post.approvalNo}
                style={{ borderBottom: "1px solid #E0E0E0", cursor: "pointer" }}
                onClick={() => navigate(`/approvalCompletePage/${post.approvalNo}`)}
              >
                <td style={tdStyle}>{post.approvalType}</td>
                <td style={tdStyle}>{`기안-${post.approvalNo}`}</td>
                <td style={tdStyle}>{post.userName}</td>
                <td style={tdTitleStyle}>{post.approvalTitle}</td>
                <td style={tdStyle}>{formatDate(post.startDate)}</td>
                <td style={tdStyle}>{post.approvalStatus}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: "20px", fontSize: "14px", color: "#888" }}>
                수신된 결재 리스트가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
