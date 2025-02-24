import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ApprovalProgressPost = ({ setFilteredPosts, currentPage }) => {
  const user = useSelector((state) => state.user);
  const [approvalList, setApprovalList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApprovalData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8003/workly/api/approvalLine/progress/${user.userNo}`
        );
        setApprovalList(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error('결재 진행 데이터를 불러오는 데 실패했습니다.', error);
      }
    };

    fetchApprovalData();
  }, [user.userNo, setFilteredPosts]);

  // 게시글 클릭 시 작성 페이지로 이동
  const handlePostClick = (approvalNo) => {
    navigate(`/ApprovalWritePage/${approvalNo}`);
  };

  // 페이지네이션 적용
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = approvalList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="approval-post-container">
      <table className="approval-table">
        <thead>
          <tr>
            <th>구분</th>
            <th>기안번호</th>
            <th>기안자</th>
            <th>제목</th>
            <th>기안일</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((approval) => (
              <tr key={approval.approvalNo} onClick={() => handlePostClick(approval.approvalNo)} style={{ cursor: 'pointer' }}>
                <td>{approval.approvalType}</td>
                <td>{`기안-${approval.approvalNo}`}</td>
                <td>{approval.approvalUser}</td>
                <td>{approval.approvalTitle}</td>
                <td>{new Date(approval.startDate).toLocaleString()}</td>
                <td>{approval.approvalStatus}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-approvals">
                진행 중인 결재 문서가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovalProgressPost;
