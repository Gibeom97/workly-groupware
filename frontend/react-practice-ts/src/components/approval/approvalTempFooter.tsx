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
}

export const ApprovalTempFooter: React.FC<ApprovalTempProps> = ({ 
  pageInfo, 
  setCurrentPage, 
  selectedPosts, 
  setSelectedPosts 
}) => {
  const navigate = useNavigate();

  // 선택한 게시글 삭제 함수
  const handleDelete = async () => {
    if (selectedPosts.length === 0) {
      alert("삭제할 항목을 선택해주세요.");
      return;
    }
  
    try {
      const response = await axios.delete(
        "http://localhost:8003/workly/api/approvalTemp/delete",
        {
          data: selectedPosts,  // 배열을 data 속성으로 전달
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("✅ 삭제 완료:", response.data);
      alert("선택한 항목이 삭제되었습니다.");
      // 삭제 후 목록 새로고침
      window.location.reload();
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };
  

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
      <div style={{ width: "90%", margin: "auto", display: "flex", justifyContent: "flex-end", paddingTop: "20px" }}>
        <button
          onClick={() => navigate("/ApprovalWritePage")}
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
