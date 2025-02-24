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
    if (!selectedPosts || selectedPosts.length === 0) {
      alert("삭제할 문서를 선택해주세요.");
      return;
    }

    try {
      console.log("삭제 요청 보낼 데이터:", selectedPosts); // 🔥 디버깅용 콘솔 로그

      await axios.post("http://localhost:8003/workly/api/approval/delete", {
        approvalNos: selectedPosts // ✅ 배열로 전달
      });

      alert("선택한 문서가 삭제되었습니다.");
      setSelectedPosts([]); // 선택된 문서 초기화
      window.location.reload(); // 페이지 새로고침
    } catch (error: any) {
      console.error("문서 삭제 실패:", error);
      
      // 🔥 서버에서 받은 에러 메시지를 확인
      if (error.response) {
        console.error("서버 응답 데이터:", error.response.data);
        alert(`문서 삭제 중 오류 발생: ${error.response.data.message || "알 수 없는 오류"}`);
      } else {
        alert("문서 삭제 중 오류가 발생했습니다.");
      }
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
