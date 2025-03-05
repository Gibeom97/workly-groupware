import Pagination from "../common/Pagination"; // body에 삭제버튼 들어가야하는 경우 사용하는 푸터
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface ApprovalFooterProps {
  pageInfo: {
    listCount: number;
    currentPage: number;
    pageLimit: number;
    contentsLimit: number;
    startPage?: number;
    endPage?: number;
    maxPage: number;
  };
  setCurrentPage: (page: number) => void;
}

export const ApprovalFooter2: React.FC<ApprovalFooterProps> = ({ 
  pageInfo, 
  setCurrentPage
}) => {
  return (
    <div style={{ 
      width: "100%", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      marginTop: "40px" 
    }}>
      <Pagination pageInfo={pageInfo} setCurrentPage={setCurrentPage} />
    </div>
  );
};
