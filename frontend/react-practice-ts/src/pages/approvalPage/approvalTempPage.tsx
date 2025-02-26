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
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const postsPerPage = 10;

  const userNoFromRedux = useSelector((state: any) => state.user.userNo);
  const userNoFromSession = sessionStorage.getItem("userNo");
  
  const userNo = userNoFromRedux || userNoFromSession;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // URL 확인
        console.log("API 요청 URL:", `http://localhost:8003/workly/api/approvalTemp/list/${userNo}`);
        
        const response = await axios.get(
          `http://localhost:8003/workly/api/approvalTemp/list/${userNo}`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        console.log("응답 데이터:", response.data);
        
        if (Array.isArray(response.data)) {
          setFilteredPosts(response.data);
          setIsLoading(false);
        } else {
          console.error("❌ 응답 데이터가 배열이 아님:", response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("임시저장 목록 조회 실패:", error);
        setIsLoading(false);
      }
    };

    if (userNo) {
      fetchData();
    }
  }, [userNo]);

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
              contentsLimit: 10,
              maxPage: Math.ceil(filteredPosts.length / 10),
              startPage: Math.floor((currentPage - 1) / 5) * 5 + 1,
              endPage: Math.min(
                Math.floor((currentPage - 1) / 5) * 5 + 5,
                Math.ceil(filteredPosts.length / 10)
              ),
            }}
            setCurrentPage={setCurrentPage}
            selectedPosts={selectedPosts}
            setSelectedPosts={setSelectedPosts}
            setFilteredPosts={setFilteredPosts}
          />
        </div>
      </div>
    </div>
  );
};
