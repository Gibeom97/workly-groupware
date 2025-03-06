import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ApprovalHeader } from "../../components/approval/approvalHeader";
import { ApprovalSearchBar } from "../../components/approval/approvalSearchBar";
import { ApprovalPost } from "../../components/approval/approvalPost";
import { ApprovalFooter } from "../../components/approval/approvalFooter";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";
import { format, addHours } from "date-fns";
import { ko } from "date-fns/locale";

export const ApprovalMain = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // ✅ 로그인한 유저 정보 가져오기
  const userNo = useSelector((state: any) => state.user.userNo);

  useEffect(() => {
    const fetchApprovalPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8003/workly/api/approval/list/${userNo}`);

        if (!response.data || response.data.length === 0) {
          console.warn("✅ 가져온 문서가 없습니다.");
          setPosts([]);
          setFilteredPosts([]);
          return;
        }

        console.log("✅ 가져온 문서 목록:", response.data);

        const formattedData = response.data.map((post: any) => ({
          ...post,
          startDate: post.startDate ? formatKST(post.startDate) : "날짜 없음",
        }));

        setPosts(formattedData);
        setFilteredPosts(formattedData);
      } catch (error: any) {
        console.error("🚨 문서 목록을 불러오는 데 실패했습니다", error);
      }
    };

    if (userNo) {
      fetchApprovalPosts();
    }
  }, [userNo]);

  // ✅ formatKST 함수 추가 (date-fns 사용)
  const formatKST = (timestamp: number | string) => {
    if (!timestamp) return "N/A";
    let ts = Number(timestamp);
    if (ts.toString().length === 10) {
      ts *= 1000;
    }
    const date = addHours(new Date(ts), 9); // UTC → KST 변환 (9시간 추가)
    return format(date, "yyyy. MM. dd. a hh:mm", { locale: ko });
  };

  // ✅ 검색 필터링 기능
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
          <ApprovalPost 
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


