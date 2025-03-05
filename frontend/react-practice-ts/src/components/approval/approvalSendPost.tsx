import { useNavigate } from "react-router-dom";
import { addHours, format } from "date-fns";
import { ko } from "date-fns/locale";
import { ApprovalMark } from "./approvalMark";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import axios from "axios";

interface ApprovalSendPostProps {
  filteredPosts: any[];
  currentPage: number;
  postsPerPage: number;
  setCurrentPage: (page: number) => void;
}

export const ApprovalSendPost = ({
  filteredPosts,
  currentPage,
  postsPerPage,
  setCurrentPage,
}: ApprovalSendPostProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userNo = useSelector((state: RootState) => state.user.userNo);

  // ✅ 현재 페이지의 게시글만 표시
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // ✅ 13자리 숫자를 한국 시간(KST) 형식으로 변환하는 함수 (중복 제거)
  const formatKST = (timestamp: number | string) => {
    if (!timestamp || isNaN(new Date(timestamp).getTime())) {
      console.error("⛔ Invalid timestamp:", timestamp);
      return "N/A"; // 날짜가 유효하지 않으면 기본값 반환
    }
  
    let ts = Number(timestamp);
    if (ts.toString().length === 10) {
      ts *= 1000; // 초 단위(10자리) → 밀리초(13자리) 변환
    }
  
    const date = addHours(new Date(ts), 9); // UTC → KST 변환 (9시간 추가)
    return format(date, "yyyy. MM. dd. a hh:mm", { locale: ko });
  };
  

  // ✅ 게시글 클릭 시 읽음 처리 & 페이지 이동 (중복 제거)
  const handleRowClick = async (approvalNo: number, event: React.MouseEvent) => {
    if ((event.target as HTMLElement).tagName === "INPUT") return; // 체크박스 클릭 시 무시

    if (!userNo) {
      console.error("❌ 로그인된 사용자 정보 없음");
      return;
    }

    try {
      await axios.post(`http://localhost:8003/workly/notifications/read`, null, {
        params: { approvalNo, userNo },
      });

      // ✅ Redux 상태 업데이트 (알림 개수 줄이기)
      // dispatch(markNotificationAsRead({ approvalNo, userNo }));

      // ✅ 페이지 이동
      navigate(`/approvalCompletePage/${approvalNo}`);
    } catch (error) {
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
                style={{ borderBottom: "1px solid #E0E0E0", cursor: "pointer" }}
                onClick={(e) => handleRowClick(post.approvalNo, e)}
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
                수신된 결재 리스트가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// ✅ 상태 텍스트 변환 함수 (중복 제거)
const getStatusText = (status: number) => {
  switch (status) {
    case 1: return "진행중";
    case 2: return "완료";
    case 3: return "반려";
    default: return "알 수 없음";
  }
};

// ✅ 상태 스타일 함수 (중복 제거)
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

// ✅ 스타일 정의 (중복 제거)
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
  justifyContent: "center",
};

const thStyle = {
  padding: "12px",
  borderBottom: "2px solid #202224",
  fontSize: "13px",
  fontWeight: 700,
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

const emptyRowStyle = {
  padding: "20px",
  textAlign: "center" as const,
  fontSize: "14px",
  color: "#888",
};
