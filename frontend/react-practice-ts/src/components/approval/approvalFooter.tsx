import { useState } from "react";

export const ApprovalFooter = () => {
  const totalPages = 68; // 전체 페이지 수
  const pagesPerGroup = 10; // 한 번에 보여줄 페이지 개수
  const [currentPage, setCurrentPage] = useState(1);

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
    <footer>
      <div style={{ width: "100%", justifyContent: "center", alignItems: "center", gap: 8, display: "flex",  marginLeft: "40%",marginRight: "-40%", paddingTop: "40px", }}>
        
        {/* Previous 버튼 */}
        <button onClick={handlePrevious} style={prevNextButtonStyle} disabled={currentPage === 1}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6666 8.00004H3.33331M3.33331 8.00004L7.99998 12.6667M3.33331 8.00004L7.99998 3.33337" stroke="#1E1E1E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={prevNextTextStyle}>Previous</span>
        </button>

        {/* 페이지 번호 버튼 */}
        <div style={{ justifyContent: 'center', alignItems: 'center', gap: 8, display: 'flex' }}>
          {/* 첫 페이지 표시 */}
          {startPage > 1 && (
            <>
              <button onClick={() => setCurrentPage(1)} style={currentPage === 1 ? activePageStyle : pageButtonStyle}>1</button>
              <span style={dotsStyle}>...</span>
            </>
          )}

          {/* 현재 그룹 내 페이지 */}
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={currentPage === page ? activePageStyle : pageButtonStyle}
            >
              {page}
            </button>
          ))}

          {/* 마지막 페이지 표시 */}
          {endPage < totalPages && (
            <>
              <span style={dotsStyle}>...</span>
              <button onClick={() => setCurrentPage(totalPages)} style={currentPage === totalPages ? activePageStyle : pageButtonStyle}>
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Next 버튼 */}
        <button onClick={handleNext} style={prevNextButtonStyle} disabled={currentPage === totalPages}>
          <span style={prevNextTextStyle}>Next</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.33331 8.00004H12.6666M12.6666 8.00004L7.99998 3.33337M12.6666 8.00004L7.99998 12.6667" stroke="#1E1E1E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>
    </footer>
  );
};

// 스타일 정의
const prevNextButtonStyle = {
  padding: "8px 12px",
  borderRadius: 8,
  justifyContent: "center",
  alignItems: "center",
  gap: 8,
  display: "flex",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  paddingTop: "10px",
};

const prevNextTextStyle = {
  color: "#1E1E1E",
  fontSize: 10,
  fontWeight: 400,
  lineHeight: "16px",
  paddingTop: "0px",
};

const pageButtonStyle = {
  padding: "8px 12px",
  borderRadius: 8,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "white",
  color: "#1E1E1E",
  fontSize: 10,
  fontWeight: 400,
  border: "0.3px solid #B9B9B9",
  cursor: "pointer",
};

const activePageStyle = {
  ...pageButtonStyle,
  background: "#2C2C2C",
  color: "#F5F5F5",
};

const dotsStyle = {
  color: "#1E1E1E",
  fontSize: 10,
  fontWeight: 700,
  lineHeight: "22.4px",
};
