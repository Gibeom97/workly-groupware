import { useState, useEffect } from "react";
import { ApprovalMark } from "./approvalMark";
import axios from 'axios';
import { ApprovalFooter } from "./approvalFooter";
import { format, addHours } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ApprovalSearchBar } from "./approvalSearchBar";

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

interface SearchParams {
  approvalType: string;
  year: string;
  searchText: string;
}

export const ApprovalPost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [filters, setFilters] = useState({
    approvalType: "",
    year: "",
    searchText: ""
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8003/workly/api/approval/list');
        setPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error('결재 목록을 불러오는데 실패했습니다:', error);
      }
    };
    fetchPosts();
  }, []);

  const applyFilters = (currentFilters: typeof filters) => {
    let result = [...posts];

    if (currentFilters.approvalType) {
      result = result.filter(post => 
        post.approvalType === currentFilters.approvalType
      );
    }

    if (currentFilters.year) {
      result = result.filter(post => {
        const postDate = new Date(parseInt(post.startDate));
        return postDate.getFullYear().toString() === currentFilters.year;
      });
    }

    if (currentFilters.searchText) {
      const searchLower = currentFilters.searchText.toLowerCase().trim();
      result = result.filter(post => {
        const titleMatch = post.approvalTitle?.toLowerCase().includes(searchLower);
        const approvalNoMatch = post.approvalNo.toString().includes(searchLower) || 
                              `기안-${post.approvalNo}`.toLowerCase().includes(searchLower);
        const userMatch = post.approvalUser?.toLowerCase().includes(searchLower);
        return titleMatch || approvalNoMatch || userMatch;
      });
    }

    setFilteredPosts(result);
  };

  const handleSearch = (searchParams: { approvalType: string; year: string; searchText: string }) => {
    const newFilters = {
      ...filters,
      ...searchParams
    };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const formatDate = (timestamp: string) => {
    try {
      const date = new Date(parseInt(timestamp));
      const kstDate = addHours(date, 9);
      return format(kstDate, 'yyyy. MM. dd. a hh:mm', { locale: ko });
    } catch (error) {
      console.error('날짜 포맷팅 오류:', error);
      return timestamp;
    }
  };

  const getAvailableYears = () => {
    const years = new Set<number>();
    posts.forEach(post => {
      const postDate = new Date(parseInt(post.startDate));
      years.add(postDate.getFullYear());
    });
    return Array.from(years).sort((a, b) => b - a);
  };

  return (
    <>
      <ApprovalSearchBar onSearch={handleSearch} />
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
                <td style={tdStyle}>{formatDate(post.startDate)}</td>
                <td style={tdStyle}>
                  <span style={getStatusStyle(post.approvalStatus)}>{post.approvalStatus}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ApprovalFooter 
          pageInfo={{ 
            listCount: filteredPosts.length, 
            currentPage, 
            pageLimit: 5, 
            contentsLimit: postsPerPage,
            maxPage: Math.ceil(filteredPosts.length / postsPerPage) || 1, // ✅ maxPage 추가
          }} 
          setCurrentPage={setCurrentPage} 
        />

      </div>
    </>
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
