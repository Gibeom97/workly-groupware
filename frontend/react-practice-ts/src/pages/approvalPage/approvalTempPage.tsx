import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ApprovalHeader } from "../../components/approval/approvalHeader";
import { ApprovalSearchBar } from "../../components/approval/approvalSearchBar";
import { ApprovalTempBody } from "../../components/approval/approvalTempBody";
import { ApprovalTempFooter } from "../../components/approval/approvalTempFooter";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";
import axios from "axios";

export const ApprovalTempPage = () => {
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const postsPerPage = 10;

  const userNoFromRedux = useSelector((state: any) => state.user?.userNo);
  const userNoFromSession = sessionStorage.getItem("userNo");
  const userNo = userNoFromRedux || userNoFromSession;

  const fetchData = async () => {
    if (!userNo) return;
    try {
      console.log("✅ API 요청 URL:", `http://localhost:8003/workly/api/approvalTemp/list/${userNo}`);
      
      const response = await axios.get(`http://localhost:8003/workly/api/approvalTemp/list/${userNo}`, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ 응답 데이터:", response.data);
      if (Array.isArray(response.data)) {
        setPosts(response.data);
        setFilteredPosts(response.data);
      } else {
        console.error("❌ 응답 데이터가 배열이 아님:", response.data);
      }
    } catch (error) {
      console.error("🚨 임시저장 목록 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userNo]);

  // ✅ 삭제 후 데이터 새로 불러오기
  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div className="mainpageContainer">
      <Sidebar />
      <div className="componentContainer">
        <Header />
        <div className="componentContainer1">
          <ApprovalHeader />
          <ApprovalSearchBar />
          <ApprovalTempBody
            selectedPosts={selectedPosts}
            setSelectedPosts={setSelectedPosts}
            filteredPosts={filteredPosts}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            postsPerPage={postsPerPage}
            isLoading={isLoading}
          />
          <ApprovalTempFooter
            pageInfo={{
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
            }}
            setCurrentPage={setCurrentPage}
            selectedPosts={selectedPosts}
            setSelectedPosts={setSelectedPosts}
            handleRefresh={handleRefresh} // ✅ 삭제 후 새로고침 함수 전달
          />
        </div>
      </div>
    </div>
  );
};
