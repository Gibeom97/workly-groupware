import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ApprovalHeader } from "../../components/approval/approvalHeader";
import { ApprovalSearchBar } from "../../components/approval/approvalSearchBar";
import { ApprovalFinishPost } from "../../components/approval/approvalFinishPost";
import { ApprovalFooter } from "../../components/approval/approvalFooter";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";

export const ApprovalFinishPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const userNo = useSelector((state: any) => state.user.userNo);

  useEffect(() => {
    const fetchApprovalPosts = async () => {
      try{
        const response = await axios.get(`http://localhost:8003/workly/api/approval/finishList/${userNo}`);

        // 필터링: userNo가 포함된 결재라인 + 진행 중(STATUS=2)인 항목만
        const filterdPosts = response.data.filter((post: any) => post.approvalStatus === 2)
                                        .map((post: any) => ({
                                          ...post,
                                          startDate: formatKST(post.startDate) // ✅ 한국시간 변환 적용
                                        }));

        setPosts(filterdPosts); 
      } catch (error) {
        console.error("결재 요청 목록을 불러오는 데 실패했습니다")
      }
    };
    
    if(userNo){
      fetchApprovalPosts();
    }
  }, [userNo]);

  // 게시글 클릭 시 상세 페이지로 이동하는 함수
  const handleRowClick = (approvalNo: number) => {
    window.location.href = `/ApprovalCompletePage2/${approvalNo}`;
  }

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
          <ApprovalFinishPost 
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