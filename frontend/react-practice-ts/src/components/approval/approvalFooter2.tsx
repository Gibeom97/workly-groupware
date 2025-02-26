import Pagination from "../common/Pagination"; // body에 삭제버튼 들어가야하는 경우 사용하는 푸터
import axios from 'axios';

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
  selectedPosts: number[];
  setSelectedPosts: React.Dispatch<React.SetStateAction<number[]>>;
}

export const ApprovalFooter2: React.FC<ApprovalFooterProps> = ({ pageInfo, setCurrentPage, selectedPosts, setSelectedPosts }) => {
  const handleDelete = async () => {
    try {
      if (selectedPosts.length === 0) {
        alert('삭제할 항목을 선택해주세요.');
        return;
      }

      const params = new URLSearchParams();
      selectedPosts.forEach(tempNo => {
        params.append('tempNos[]', tempNo.toString());
      });

      const response = await axios.delete(`/api/approvalTemp/delete?${params.toString()}`);

      if (response.status === 200) {
        alert('선택한 항목이 삭제되었습니다.');
        setSelectedPosts([]); // 선택 초기화
        // 목록 새로고침 로직 필요
        window.location.reload(); // 임시로 페이지 새로고침
      }
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "40px" }}>
      {/* ✅ 페이지네이션 추가 */}
      <Pagination pageInfo={pageInfo} setCurrentPage={setCurrentPage} />
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
};
