import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ApprovalHeader } from "../../components/approval/approvalHeader";
import { ApprovalRejectBody } from "../../components/approval/approvalRejectBody";
import { ApprovalRejectFooter } from "../../components/approval/approvalRejectFooter";
import { ApprovalSearchBar } from "../../components/approval/approvalSearchBar";
import { ApprovalFooter } from "../../components/approval/approvalFooter";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";
import { useNavigate } from "react-router-dom";
import { ApprovalFooter2 } from "../../components/approval/approvalFooter2";

// formatKST 함수를 직접 구현
const formatKST = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('ko-KR', { 
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).replace(/\./g, '').replace(/\s+/g, ' ');
};

export const ApprovalRejectPage = () => {
  const userNo = useSelector((state: any) => state.user.userNo);
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const navigate = useNavigate();

  // 초기 데이터 로드
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get(`http://localhost:8003/workly/api/approval/rejectList/${userNo}`);
        // 상태값이 3인 데이터만 필터링
        const rejectedPosts = response.data.filter((post: any) => post.approvalStatus === 3)
          .map((post: any) => ({
            ...post,
            startDate: new Date(post.startDate).toLocaleString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })
          }));
        setFilteredPosts(rejectedPosts);
      } catch (error) {
        console.error("초기 데이터 로드 실패:", error);
      }
    };

    if (userNo) {
      fetchInitialData();
    }
  }, [userNo]);

  // 검색 핸들러
  const handleSearch = (params: any) => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:8003/workly/api/approval/rejectList/${userNo}`);
        // 상태값이 3인 데이터만 필터링
        let result = response.data.filter((post: any) => post.approvalStatus === 3)
          .map((post: any) => ({
            ...post,
            startDate: new Date(post.startDate).toLocaleString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })
          }));

        // 구분(approvalType) 검색
        if (params.approvalType && params.approvalType !== '전체') {
          result = result.filter((post: any) => post.approvalType === Number(params.approvalType));
        }

        // 텍스트 검색
        if (params.searchText && params.searchText.trim() !== '') {
          const searchLower = params.searchText.toLowerCase().trim();
          result = result.filter((post: any) =>
            (post.approvalTitle && post.approvalTitle.toLowerCase().includes(searchLower)) ||
            (post.approvalNo && post.approvalNo.toString().includes(searchLower)) ||
            (post.userName && post.userName.toLowerCase().includes(searchLower))
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

  // 삭제 핸들러
  const handleDelete = async () => {
    if (selectedPosts.length === 0) {
      alert("삭제할 문서를 선택해주세요.");
      return;
    }

    const isConfirmed = window.confirm("선택한 문서를 삭제하시겠습니까?");
    if (!isConfirmed) return;

    try {
      await Promise.all(
        selectedPosts.map(approvalNo => 
          axios.delete(`http://localhost:8003/workly/api/approval/deleteApproval/${approvalNo}`)
        )
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
          <ApprovalRejectBody 
            selectedPosts={selectedPosts}
            setSelectedPosts={setSelectedPosts}
            filteredPosts={filteredPosts}
            setFilteredPosts={setFilteredPosts}
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            onDelete={handleDelete}
          />
          <ApprovalFooter2 
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
