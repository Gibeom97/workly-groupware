import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface ApprovalPostProps {
  selectedPosts: number[];
  setSelectedPosts: (posts: number[]) => void;
  filteredPosts: any[];
  currentPage: number;
  postsPerPage: number;
  isLoading: boolean;
}

export const ApprovalTempBody = ({
  selectedPosts,
  setSelectedPosts,
  filteredPosts,
  currentPage,
  postsPerPage,
  isLoading
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
          {isLoading ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: "20px" }}>⏳ 데이터 불러오는 중...</td>
            </tr>
          ) : currentPosts.length > 0 ? (
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
                <td style={tdStyle}>{post.createdAt ? formatDate(post.startDate) : "-"}</td>
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
  display: "flex",
  justifyContent: "center",
  padding: "20px",
};

// ✅ 테이블 스타일 (오른쪽으로 이동 & 폭 넓힘)
const tableStyle = {
  width: "90%", // ✅ 기존 90% → 95%로 넓힘
  borderCollapse: "collapse",
  textAlign: "center",
  justifyContent: "center"
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

// 아이콘을 위한 셀 스타일 (왼쪽 정렬)
const tdIconStyle = {
width: "20px", // 아이콘 크기 조정
textAlign: "center",
};

const statusStyle = {
  padding: "5px 10px",
  borderRadius: "4px",
  backgroundColor: "#ffa500",
  color: "#FFF",
  fontSize: "12px",
  fontWeight: "bold",
};
