import { useNavigate } from "react-router-dom";

export const ApprovalFooter = ({ totalPages, currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const pagesPerGroup = 10; // 한 번에 보여줄 페이지 개수

  // 현재 페이지 그룹의 시작 번호
  const startPage = Math.floor((currentPage - 1) / pagesPerGroup) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  // 이전 페이지 이동
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // 다음 페이지 이동
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <footer style={{ width: "100%", paddingTop: "40px" }}>
      {/* 페이지네이션 & 작성하기 버튼을 같은 줄에 정렬 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        {/* 페이지네이션 */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
          {/* Previous 버튼 */}
          <button onClick={handlePrevious} style={prevNextButtonStyle} disabled={currentPage === 1}>
            Previous
          </button>

          {/* 페이지 번호 */}
          {startPage > 1 && (
            <>
              <button onClick={() => setCurrentPage(1)} style={currentPage === 1 ? activePageStyle : pageButtonStyle}>1</button>
              <span style={dotsStyle}>...</span>
            </>
          )}

          {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={currentPage === page ? activePageStyle : pageButtonStyle}
            >
              {page}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              <span style={dotsStyle}>...</span>
              <button onClick={() => setCurrentPage(totalPages)} style={currentPage === totalPages ? activePageStyle : pageButtonStyle}>
                {totalPages}
              </button>
            </>
          )}

          {/* Next 버튼 */}
          <button onClick={handleNext} style={prevNextButtonStyle} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>

        {/* 작성하기 버튼 */}
        <button
          style={{
            width: 75,
            height: 30,
            background: "#4880FF",
            borderRadius: 14,
            border: "0.30px solid #B9B9B9",
            color: "white",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "100px",
          }}
          onClick={() => navigate('/ApprovalWritePage')}
        >
          작성하기
        </button>

      </div>
    </footer>
  );
};

// 스타일 정의
const prevNextButtonStyle = {
  padding: "8px",
  borderRadius: 8,
  background: "transparent",
  border: "none",
  cursor: "pointer",
};

const pageButtonStyle = {
  padding: "8px 12px",
  borderRadius: 8,
  background: "white",
  color: "#1E1E1E",
  fontSize: 10,
  fontWeight: 400,
  border: "0.3px solid #B9B9B9",
  cursor: "pointer",
};

const activePageStyle = {
  ...pageButtonStyle,
  background: "#1E1E1E",
  color: "#F5F5F5",
};

const dotsStyle = {
  color: "#1E1E1E",
  fontSize: 10,
  fontWeight: 700,
};
