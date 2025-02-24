import { useState, useEffect } from "react";
import { ApprovalHeader } from "../../components/approval/approvalHeader";
import { ApprovalTempBody } from "../../components/approval/approvalTempBody";
import { ApprovalTempFooter } from "../../components/approval/approvalTempFooter";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";
import axios from "axios";

export const ApprovalTempPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState([]); // 필터링된 게시글
  const [selectedPosts, setSelectedPosts] = useState([]); // 선택된 게시글 (삭제용)

  // 🟢 DB에서 임시저장된 게시글 불러오기
  useEffect(() => {
    const fetchTempPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8003/workly/api/approval/drafts");
        setFilteredPosts(response.data);
      } catch (error) {
        console.error("임시저장된 결재 목록을 불러오는데 실패했습니다:", error);
      }
    };
    fetchTempPosts();
  }, []);

  // 🟢 페이지네이션 관련 데이터 설정
  const postsPerPage = 10; // 페이지당 게시글 수
  const pageInfo = {
    listCount: filteredPosts.length,
    currentPage,
    pageLimit: 5,
    contentsLimit: postsPerPage,
    maxPage: Math.ceil(filteredPosts.length / postsPerPage),
    startPage: Math.floor((currentPage - 1) / 5) * 5 + 1,
    endPage: Math.min(
      Math.floor((currentPage - 1) / 5) * 5 + 5,
      Math.ceil(filteredPosts.length / postsPerPage)
    ),
  };

  return (
    <div className="mainpageContainer">
      <Sidebar />
      <div className="componentContainer">
        <Header />
        <div className="componentContainer1">
          <ApprovalHeader />
          {/* 🟢 페이지네이션 연동을 위해 currentPage, setCurrentPage 전달 */}
          <ApprovalTempBody
            selectedPosts={selectedPosts}
            setSelectedPosts={setSelectedPosts}
            filteredPosts={filteredPosts} // 🟢 게시글 전달
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            postsPerPage={postsPerPage} // 🟢 페이지당 게시글 수 전달
          />
          <ApprovalTempFooter
            pageInfo={pageInfo}
            setCurrentPage={setCurrentPage}
            selectedPosts={selectedPosts}
            setSelectedPosts={setSelectedPosts}
          />
        </div>
      </div>
    </div>
  );
};
