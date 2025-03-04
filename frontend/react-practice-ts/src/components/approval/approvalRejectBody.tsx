import { useEffect, useState } from "react";
import { ApprovalMark } from "./approvalMark";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { format, addHours } from "date-fns";
import { ko } from "date-fns/locale";
import { isNil } from "lodash";
import { useNavigate } from "react-router-dom";
import { fetchApprovalStatus } from "../../features/approvalNotificationsSlice";

export const ApprovalRejectBody = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 로그인한 유저의 userNO
  const userNo = useSelector((state: any) => state.user.userNo);
  // 게시글 목록
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchApprovalPosts = async () => {
      try{
        const response = await axios.get(`http://localhost:8003/workly/api/approval/rejectList/${userNo}`);

        // 반려(STATUS=3)인 항목만
        const filterdPosts = response.data.filter((post: any) => post.approvalStatus === 3)
                                        .map((post: any) => ({
                                          ...post,
                                          startDate: formatKST(post.startDate) // ✅ 한국시간 변환 적용
                                        }));


        setPosts(filterdPosts); 
      } catch (error) {
        console.error("결재 반려 목록을 불러오는 데 실패했습니다")
      }
    };
    
    if(userNo){
      fetchApprovalPosts();
    }
  }, [userNo]);

  // 게시글 클릭 시 읽음 처리 & 상세 페이지로 이동하는 함수
  const handleRowClick = async (approvalNo: number) => {
    if(!userNo) {
      console.log("❌ 로그인된 사용자 정보 없음");
      return;
    }

    try{
      await axios.post(`http://localhost:8003/workly/notifications/read2`, null, {
        params: {approvalNo: approvalNo, userNo: userNo},
      });

      dispatch(fetchApprovalStatus(userNo) as any); // 🚀 Redux 상태 즉시 반영

      navigate(`/ApprovalRejectDetailPage/${approvalNo}`);
    }catch (error){
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
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <tr 
                  key={index} 
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
                  <span style={getStatusStyle(post.approvalStatus)}>{getStatusText(post.approvalStatus)}</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} style={emptyRowStyle}>
                반려된 결재 리스트가 없습니다.
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