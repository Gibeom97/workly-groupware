import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ApprovalHeader } from "../../components/approval/approvalHeader";
import { ApprovalTempBody } from "../../components/approval/approvalTempBody";
import { ApprovalTempFooter } from "../../components/approval/approvalTempFooter";
import { ApprovalSearchBar } from "../../components/approval/approvalSearchBar";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";
import { useNavigate } from "react-router-dom";

const formatKST = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).replace(/\./g, "").replace(/\s+/g, " ");
};

export const ApprovalTempPage = () => {
  const userNo = useSelector((state) => state.user.userNo);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get(`http://localhost:8003/workly/api/approvalTemp/list/${userNo}`);
        const tempPosts = response.data
          .filter((post) => post.approvalStatus === 0) // 상태 0: 임시저장
          .map((post) => ({
            ...post,
            startDate: formatKST(post.startDate),
          }));
        setFilteredPosts(tempPosts);
      } catch (error) {
        console.error("임시저장 데이터 로드 실패:", error);
      }
    };
    if (userNo) fetchInitialData();
  }, [userNo]);

  const handleSearch = (params) => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:8003/workly/api/approvalTemp/list/${userNo}`);
        let result = response.data
          .filter((post) => post.approvalStatus === 0)
          .map((post) => ({
            ...post,
            startDate: formatKST(post.startDate),
          }));

        if (params.approvalType && params.approvalType !== "전체") {
          result = result.filter((post) => post.approvalType === Number(params.approvalType));
        }

        if (params.searchText && params.searchText.trim() !== "") {
          const searchLower = params.searchText.toLowerCase().trim();
          result = result.filter(
            (post) =>
              post.approvalTitle.toLowerCase().includes(searchLower) ||
              post.approvalNo.toString().includes(searchLower) ||
              post.userName.toLowerCase().includes(searchLower)
          );
        }
        setFilteredPosts(result);
        setCurrentPage(1);
      } catch (error) {
        console.error("검색 실패:", error);
      }
    };
    fetchSearchResults();
  };

  const handleDelete = async () => {
    if (selectedPosts.length === 0) {
      alert("삭제할 문서를 선택해주세요.");
      return;
    }

    const isConfirmed = window.confirm("선택한 문서를 삭제하시겠습니까?");
    if (!isConfirmed) return;

    try {
      await Promise.all(
        selectedPosts.map((approvalNo) => axios.delete(`http://localhost:8003/workly/api/approval/deleteApproval/${approvalNo}`))
      );
      alert("선택한 문서가 삭제되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error("문서 삭제 실패:", error);
      alert("문서 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="mainpageContainer">
      <Sidebar />
      <div className="componentContainer">
        <Header />
        <div className="componentContainer1">
          <ApprovalHeader />
          <ApprovalSearchBar onSearch={handleSearch} />
          <ApprovalTempBody
            selectedPosts={selectedPosts}
            setSelectedPosts={setSelectedPosts}
            filteredPosts={filteredPosts}
            setFilteredPosts={setFilteredPosts}
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            onDelete={handleDelete}
          />
          <ApprovalTempFooter
            pageInfo={{
              listCount: filteredPosts.length,
              currentPage,
              pageLimit: 5,
              contentsLimit: postsPerPage,
              maxPage: Math.ceil(filteredPosts.length / postsPerPage) || 1,
            }}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};
