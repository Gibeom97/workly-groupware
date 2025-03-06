import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination";

interface ApprovalTempProps {
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
  selectedPosts: number[];
  setSelectedPosts: React.Dispatch<React.SetStateAction<number[]>>;
  handleRefresh: () => void; // ✅ handleRefresh 추가
}

export const ApprovalTempFooter: React.FC<ApprovalTempProps> = ({ 
  pageInfo, 
  setCurrentPage, 
  selectedPosts, 
  setSelectedPosts,
  handleRefresh // ✅ handleRefresh 사용
}) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (selectedPosts.length === 0) {
      alert("삭제할 항목을 선택해주세요.");
      return;
    }

    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      for (const tempNo of selectedPosts) {
        await axios.delete(
          `http://localhost:8003/workly/api/approvalTemp/deleteApprovalTemp/${tempNo}`
        );
      }

      alert("✅ 선택한 항목이 삭제되었습니다.");
      setSelectedPosts([]);
      handleRefresh(); // ✅ 삭제 후 목록 새로고침
    } catch (error) {
      console.error("🚨 삭제 실패:", error);
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
      <div style={{ width: "90%", margin: "auto", display: "flex", justifyContent: "flex-end", paddingTop: "20px" }}>
        <button
          onClick={() => navigate("/approvalWritePage")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#4880FF",
            color: "white",
            border: "none",
            borderRadius: "14px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: 600,
            marginRight: "10px"
          }}
        >
          작성하기
        </button>

        <button
          onClick={handleDelete}
          style={{
            padding: "8px 16px",
            backgroundColor: "#FF4848",
            color: "white",
            border: "none",
            borderRadius: "14px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: 600
          }}
        >
          삭제
        </button>
      </div>

      <Pagination pageInfo={pageInfo} setCurrentPage={setCurrentPage} />
    </div>
  );
};
