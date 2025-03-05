import { useEffect, useState } from "react";
import { ApprovalMark } from "./approvalMark";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useNavigate } from "react-router-dom";


interface ApprovalReferencePostProps {
  filteredPosts: any[];
  currentPage: number;
  postsPerPage: number;
  setCurrentPage: (page: number) => void;
}

export const ApprovalReferencePost = ({
  filteredPosts,
  currentPage,
  postsPerPage,
  setCurrentPage
}: ApprovalReferencePostProps) => {
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleRowClick = (approvalNo: number) => {
    window.location.href = `/ApprovalReferencePage/${approvalNo}`;

//export const ApprovalReferencePost = () => {
//   const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 10;
//   const navigate = useNavigate();

  // 로그인한 유저의 userNO
  const userNo = useSelector((state: any) => state.user.userNo);
  // 게시글 목록
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchApprovalPosts = async () => {
      try{
        const response = await axios.get(`http://localhost:8003/workly/api/approval/referenceList/${userNo}`);

        // 필터링: userNo가 포함된 참조 + 진행 중, 완료인 항목만
        const filterdPosts = response.data.filter((post: any) => post.approvalStatus === 1 || post.approvalStatus === 2)
                                        .map((post: any) => ({
                                          ...post,
                                          startDate: formatKST(post.startDate) // ✅ 한국시간 변환 적용
                                        }));


        setPosts(filterdPosts); 
        setFilteredPosts(filterdPosts);
      } catch (error) {
        console.error("결재 요청 목록을 불러오는 데 실패했습니다")
      }
    };
    
    if(userNo){
      fetchApprovalPosts();
    }
  }, [userNo]);

  // 게시글 클릭 시 상세 페이지로 이동, 읽음처리리하는 함수
  const handleRowClick = async (approvalNo: number) => {
    if (!userNo) {
      console.error("❌ 로그인된 사용자 정보 없음");
      return;
    }

    try{
      await axios.post(`http://localhost:8003/workly/notifications/read`, null, {
        params: {approvalNo: approvalNo, userNo: userNo},
      });
      navigate(`/ApprovalCompletePage2/${approvalNo}`);
    }catch (error) {
      console.error("❌ 읽음 처리 API 호출 중 오류 발생:", error);
    }
  };

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
              <td colSpan={7} style={emptyRowStyle}>
                참조된 결재 리스트가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const emptyRowStyle = {
  padding: "20px",
  textAlign: "center" as const,
  fontSize: "14px",
  color: "#888",
};

const formatKST = (timestamp: number | string) => {
  if (!timestamp) return "N/A";

  let ts = Number(timestamp);
  if (ts.toString().length === 10) {
    ts *= 1000;
  }

  const date = addHours(new Date(ts), 9);
  return format(date, "yyyy. MM. dd. a hh:mm", { locale: ko });
};

const getStatusText = (status: number) => {
  switch (status) {
    case 1: return "진행중";
    case 2: return "완료";
    case 3: return "반려";
    default: return "알 수 없음";
  }
};

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
      return { ...baseStyle, background: "#4c93ff", color: "white" };
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
  
const tableStyle = {
    width: "90%",
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

const tdIconStyle = {
  width: "20px",
  textAlign: "center",
};