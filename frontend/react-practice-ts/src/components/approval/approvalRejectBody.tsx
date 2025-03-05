import { useEffect, useState } from "react";
import { ApprovalMark } from "./approvalMark";
import { useSelector } from "react-redux";
import axios from "axios";
import { format, addHours } from "date-fns";
import { ko } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

interface ApprovalRejectBodyProps {
  selectedPosts: number[];
  setSelectedPosts: (posts: number[]) => void;
  filteredPosts: any[];
  setFilteredPosts: (posts: any[]) => void;
  currentPage: number;
  postsPerPage: number;
  onDelete: () => void;
}

export const ApprovalRejectBody = ({ 
  selectedPosts,
  setSelectedPosts,
  filteredPosts,
  setFilteredPosts,
  currentPage,
  postsPerPage,
  onDelete
}: ApprovalRejectBodyProps) => {
  const userNo = useSelector((state: any) => state.user.userNo);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchApprovalPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8003/workly/api/approval/rejectList/${userNo}`);
        const filterdPosts = response.data
          .filter((post: any) => post.approvalStatus === 3)
          .map((post: any) => ({
            ...post,
            startDate: formatKST(post.startDate)
          }));
        setPosts(filterdPosts);
        setFilteredPosts(filterdPosts);
      } catch (error) {
        console.error("결재 반려 목록을 불러오는 데 실패했습니다", error);
      }
    };
    
    if(userNo) {
      fetchApprovalPosts();
    }
  }, [userNo, setFilteredPosts]);

  // 현재 페이지의 게시물만 표시 (배열 체크 추가)
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Array.isArray(filteredPosts) 
    ? filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
    : [];

  // 체크박스 핸들러
  const handleCheckbox = (approvalNo: number) => {
    setSelectedPosts(prev => {
      if (prev.includes(approvalNo)) {
        return prev.filter(id => id !== approvalNo);
      } else {
        return [...prev, approvalNo];
      }
    });
  };

  // 전체 선택 핸들러
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedPosts(posts.map(post => post.approvalNo));
    } else {
      setSelectedPosts([]);
    }
  };

  // 삭제 핸들러
  const handleDelete = async () => {
    if (selectedPosts.length === 0) {
      alert("삭제할 문서를 선택해주세요.");
      return;
    }

    const isConfirmed = window.confirm("선택한 문서를 삭제하시겠습니까?");
    if (!isConfirmed) return;

    try {
      await Promise.all(
        selectedPosts.map(approvalNo => 
          axios.delete(`http://localhost:8003/workly/api/approval/deleteApproval/${approvalNo}`)
        )
      );
      alert("선택한 문서가 삭제되었습니다.");
      // 목록 새로고침
      window.location.reload();
    } catch (error) {
      console.error("문서 삭제 실패:", error);
      alert("문서 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleRowClick = (approvalNo: number, event: React.MouseEvent) => {
    // 체크박스 클릭 시 상세페이지로 이동하지 않음
    if ((event.target as HTMLElement).tagName === 'INPUT') return;
    window.location.href = `/ApprovalRejectDetailPage/${approvalNo}`;
  }

  return (
    <>
      <div style={containerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>
                <input 
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={posts.length > 0 && selectedPosts.length === posts.length}
                />
              </th>
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
                  onClick={(e) => handleRowClick(post.approvalNo, e)}
                >
                  <td style={tdIconStyle}>
                    <input
                      type="checkbox"
                      checked={selectedPosts.includes(post.approvalNo)}
                      onChange={() => handleCheckbox(post.approvalNo)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td style={tdStyle}>{post.approvalType}</td>
                  <td style={tdStyle}>{`기안-${post.approvalNo}`}</td>
                  <td style={tdStyle}>{post.userName}</td>
                  <td style={tdTitleStyle}>{post.approvalTitle}</td>
                  <td style={tdStyle}>{post.startDate}</td>
                  <td style={tdStyle}>
                    <span style={getStatusStyle(post.approvalStatus)}>
                      {getStatusText(post.approvalStatus)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '20px' }}>
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-end',
        padding: '20px',
        gap: '10px',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <button
          style={{
            width: 75,
            height: 30,
            background: "#4880FF",
            borderRadius: 14,
            border: "0.30px solid #B9B9B9",
            color: "white",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}
          onClick={() => navigate('/ApprovalWritePage')}
        >
          작성하기
        </button>
        <button
          style={{
            width: 75,
            height: 30,
            background: "#FF5C5C",
            borderRadius: 14,
            border: "0.30px solid #B9B9B9",
            color: "white",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}
          onClick={onDelete}
        >
          삭제
        </button>
      </div>
    </>
  );
};

const emptyRowStyle = {
  padding: "20px",
  textAlign: "center" as const,
  fontSize: "14px",
  color: "#888",
};

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
    textAlign: "center",
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