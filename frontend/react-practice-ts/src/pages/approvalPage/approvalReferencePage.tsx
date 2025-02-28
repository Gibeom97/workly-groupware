import { useState } from "react";
import { ApprovalFooter } from '../../components/approval/approvalFooter';
import { ApprovalHeader } from '../../components/approval/approvalHeader';
import { ApprovalReferencePost } from '../../components/approval/approvalReferencePost';
import { ApprovalSearchBar } from '../../components/approval/approvalSearchBar';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';

export const ApprovalReferencePage = () => {
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("전체");
  const postsPerPage = 10;

  return (
    <div className="mainpageContainer">
      <Sidebar />
      <div className="componentContainer">
        <Header/>
        <div className="componentContainer1">
          <ApprovalHeader />
          <ApprovalSearchBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchType={searchType}
            setSearchType={setSearchType}
            setFilteredPosts={setFilteredPosts}
          />
          <ApprovalReferencePost 
            filteredPosts={filteredPosts}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            postsPerPage={postsPerPage}
            searchTerm={searchTerm}
            searchType={searchType}
          />
          <ApprovalFooter 
            selectedPosts={selectedPosts}
            setSelectedPosts={setSelectedPosts}
          />
        </div>
      </div>
    </div>
  );
}