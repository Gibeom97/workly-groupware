import { useState, useEffect } from "react";
import axios from "axios";
import { format, addHours } from "date-fns";
import { ko } from "date-fns/locale";
import { ApprovalSearchBar } from "../../components/approval/approvalSearchBar";
import { ApprovalFooter2 } from "./approvalFooter2";
import { useNavigate } from "react-router-dom"; // ✅ 페이지 이동을 위한 Hook 추가

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
  setSelectedPosts: React.Dispatch<React.SetStateAction<number[]>>;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  postsPerPage: number;
}

export const ApprovalTempBody: React.FC<ApprovalTempBodyProps> = ({
  selectedPosts,
  setSelectedPosts,
  currentPage,
  setCurrentPage,
  postsPerPage,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const navigate = useNavigate(); // ✅ 페이지 이동을 위한 훅 사용

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const response = await axios.get<Post[]>("http://localhost:8003/workly/api/approval/drafts");
        setPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error("임시저장된 결재 문서를 불러오는데 실패했습니다:", error);
      }
    };
    fetchDrafts();
  }, []);

  // 체크박스 상태 변경 함수
  const handleCheckboxChange = (approvalNo: number) => {
    setSelectedPosts((prev) =>
      prev.includes(approvalNo) ? prev.filter((id) => id !== approvalNo) : [...prev, approvalNo]
    );
  };

  // 게시글 클릭 시 작성 페이지로 이동
  const handlePostClick = (approvalNo: number) => {
    navigate(`/ApprovalWritePage/${approvalNo}`);
  };

  // 검색 필터링
  const handleSearch = (searchParams: SearchParams) => {
    let result = [...posts];

    if (searchParams.approvalType) {
      result = result.filter((post) => post.approvalType === searchParams.approvalType);
    }

    if (searchParams.year) {
      result = result.filter((post) => {
        const postDate = new Date(parseInt(post.startDate));
        return postDate.getFullYear().toString() === searchParams.year;
      });
    }

    if (searchParams.searchText) {
      const searchLower = searchParams.searchText.toLowerCase().trim();
      result = result.filter((post) => {
        return (
          post.approvalTitle?.toLowerCase().includes(searchLower) ||
          post.approvalNo.toString().includes(searchLower) ||
          post.approvalUser?.toLowerCase().includes(searchLower)
        );
      });
    }

    setFilteredPosts(result);
  };

  // 날짜 포맷
  const formatDate = (timestamp: string) => {
    try {
      const date = new Date(parseInt(timestamp));
      const kstDate = addHours(date, 9);
      return format(kstDate, "yyyy. MM. dd a hh:mm", { locale: ko });
    } catch (error) {
      console.error("날짜 포맷 오류:", error);
      return "-";
    }
  };

  // 페이지네이션 처리
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <ApprovalSearchBar onSearch={handleSearch} />
      <div style={{ width: "100%", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <table style={{ width: "90%", borderCollapse: "collapse", textAlign: "center" }}>
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
              <tr
                key={post.approvalNo}
                style={clickableRowStyle}
                onClick={() => handlePostClick(post.approvalNo)}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedPosts.includes(post.approvalNo)}
                    onChange={() => handleCheckboxChange(post.approvalNo)}
                  />
                </td>
                <td style={tdStyle}>{post.approvalType}</td>
                <td style={tdStyle}>{`기안-${post.approvalNo}`}</td>
                <td style={tdStyle}>{post.approvalUser || "-"}</td>
                <td style={tdTitleStyle}>{post.approvalTitle}</td>
                <td style={tdStyle}>{formatDate(post.startDate)}</td>
                <td style={tdStyle}>-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

// ✅ 스타일 정의
const thStyle = {
  padding: "12px",
  borderBottom: "2px solid #202224",
  fontSize: "13px",
  fontWeight: 700,
};

const clickableRowStyle = {
  borderBottom: "1px solid #E0E0E0",
  cursor: "pointer", // ✅ 커서 포인터
  transition: "background-color 0.2s",
};

const tdStyle = {
  padding: "10px",
  fontSize: "12px",
};

const tdTitleStyle = {
  ...tdStyle,
  textAlign: "left",
};
