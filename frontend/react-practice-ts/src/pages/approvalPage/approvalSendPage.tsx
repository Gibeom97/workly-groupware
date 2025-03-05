import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ApprovalHeader } from "../../components/approval/approvalHeader";
import { ApprovalSearchBar } from "../../components/approval/approvalSearchBar";
import { ApprovalSendPost } from "../../components/approval/approvalSendPost";
import { ApprovalFooter } from "../../components/approval/approvalFooter";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";
export const ApprovalSendPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const userNo = useSelector((state: any) => state.user.userNo);
  useEffect(() => {
    if (!userNo) {
      console.error(":x: 로그인 정보가 없습니다.");
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8003/workly/api/approval/sendList/${userNo}`
        );
        console.log(":흰색_확인_표시: 기안함 응답 데이터:", response.data);
        if (Array.isArray(response.data)) {
          setPosts(response.data);
          setFilteredPosts(response.data);
        } else {
          console.error(":x: 응답 데이터가 배열이 아닙니다:", response.data);
        }
      } catch (error: any) {
        console.error(":경광등: 기안함 목록 조회 실패:", error?.response?.status, error?.response?.data);
      }
    };
    fetchData();
  }, [userNo]);
  const handleSearch = (searchParams: { approvalType: string; year: string; searchText: string }) => {
    let result = [...posts];
    if (searchParams.approvalType) {
      result = result.filter(post => post.approvalType === searchParams.approvalType);
    }
    if (searchParams.year) {
      result = result.filter(post => {
        const postDate = new Date(post.startDate);
        return postDate.getFullYear().toString() === searchParams.year;
      });
    }
    if (searchParams.searchText) {
      const searchLower = searchParams.searchText.toLowerCase().trim();
      result = result.filter(post =>
        post.approvalTitle?.toLowerCase().includes(searchLower) ||
        post.approvalNo.toString().includes(searchLower) ||
        `기안-${post.approvalNo}`.toLowerCase().includes(searchLower) ||
        post.approvalUser?.toLowerCase().includes(searchLower)
      );
    }
    setFilteredPosts(result);
  };
  return (
    <div className="mainpageContainer">
      <Sidebar />
      <div className="componentContainer">
        <Header />
        <div className="componentContainer1">
          <ApprovalHeader />
          <ApprovalSearchBar onSearch={handleSearch} />
          <ApprovalSendPost
            filteredPosts={filteredPosts}
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
          />
          <ApprovalFooter
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