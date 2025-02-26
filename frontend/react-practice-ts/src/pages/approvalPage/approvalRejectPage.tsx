import { useState } from "react";
import { ApprovalHeader } from "../../components/approval/approvalHeader";
import { ApprovalSearchBar } from "../../components/approval/approvalSearchBar";
import { ApprovalTempBody } from "../../components/approval/approvalTempBody";
import { ApprovalTempFooter } from "../../components/approval/approvalTempFooter";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";

export const ApprovalRejectPage = () => {
  // 필요한 상태들 추가
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  return (
    <div className="mainpageContainer">
      <Sidebar />
      <div className="componentContainer">
        <Header/>
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
          />
          <ApprovalTempFooter 
            selectedPosts={selectedPosts}
            setSelectedPosts={setSelectedPosts}
          />
        </div>
      </div>
    </div>
  );
}