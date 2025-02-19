import React, { useState } from 'react';
import { ApprovalHeader } from '../../components/approval/approvalHeader';
import { ApprovalPost } from '../../components/approval/approvalPost';
import { ApprovalFooter } from '../../components/approval/approvalFooter';
import Pagination from '../../components/common/Pagination';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';

export const ApprovalMain: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const pageInfo = {
    listCount: filteredPosts.length,
    currentPage,
    pageLimit: 5,
    contentsLimit: 10,
    maxPage: Math.ceil(filteredPosts.length / 10),
    startPage: Math.floor((currentPage - 1) / 5) * 5 + 1,
    endPage: Math.min(
      Math.floor((currentPage - 1) / 5) * 5 + 5,
      Math.ceil(filteredPosts.length / 10)
    )
  };

  return (
    <div className="mainpageContainer">
      <Sidebar />
      <div className="componentContainer">
        <Header />
        <div style={{ padding: '20px' }}>
          <ApprovalHeader />
          <ApprovalPost 
            setFilteredPosts={setFilteredPosts}
            currentPage={currentPage}
          />
          {/* <div style={{ marginTop: '40px' }}>
            <ApprovalFooter />
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              marginTop: '20px',
              marginBottom: '40px'
            }}>
              <Pagination 
                pageInfo={pageInfo}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
