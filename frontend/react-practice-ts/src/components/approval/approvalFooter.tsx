import { useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination"; // 🔥 경로 확인 후 수정

interface ApprovalFooterProps {
  pageInfo: {
    listCount: number;
    currentPage: number;
    pageLimit: number;
    contentsLimit: number;
    startPage?: number;
    endPage?: number;
    maxPage: number;
  };
  setCurrentPage: (page: number) => void;
}

export const ApprovalFooter: React.FC<ApprovalFooterProps> = ({ pageInfo, setCurrentPage }) => {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "40px" }}>
      {/* ✅ 작성하기 버튼 */}
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", marginRight: "100px" }}>
        <button
          onClick={() => navigate('/ApprovalWritePage')}
          style={{
            padding: "8px 16px",
            backgroundColor: "#4880FF",
            color: "white",
            border: "none",
            borderRadius: "14px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          작성하기
        </button>
      </div>

      {/* ✅ 페이지네이션 추가 */}
      <Pagination pageInfo={pageInfo} setCurrentPage={setCurrentPage} />
    </div>
  );
};
