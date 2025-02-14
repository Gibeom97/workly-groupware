import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ApprovalTempFooter = () => {
  const navigate = useNavigate();

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
    <footer style={footerContainerStyle}>
      {/* 페이지네이션 영역 */}
      <div style={paginationContainerStyle}>
        
        {/* Previous 버튼 */}
        <button onClick={handlePrevious} style={prevNextButtonStyle} disabled={currentPage === 1}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6666 8.00004H3.33331M3.33331 8.00004L7.99998 12.6667M3.33331 8.00004L7.99998 3.33337" stroke="#1E1E1E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={prevNextTextStyle}>Previous</span>
        </button>

        {/* 페이지 번호 버튼 */}
        <div style={pageNumbersStyle}>
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

      {/* 버튼 그룹 (작성하기 & 삭제) */}
      <div style={buttonGroupStyle}>
        <button style={writeButtonStyle} onClick={() => navigate('/ApprovalWritePage')}>
          작성하기
        </button>
        <button style={deleteButtonStyle}>
          삭제
        </button>
      </div>
    </footer>
  );
};

// ✅ 스타일 정의
const footerContainerStyle = {
  width: "100%",
  paddingTop: "20px",
  marginBottom: "60px",
};

const paginationContainerStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 8,
  marginTop: "60px",
};

const prevNextButtonStyle = {
  padding: "8px",
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  gap: 8,
  background: "transparent",
  border: "none",
  cursor: "pointer",
};

const prevNextTextStyle = {
  color: "#1E1E1E",
  fontSize: 10,
  fontWeight: 400,
};

const pageNumbersStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 8,
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
  background: "#1E1E1E",
  color: "#F5F5F5",
};

const dotsStyle = {
  color: "#1E1E1E",
  fontSize: 10,
  fontWeight: 700,
};

// ✅ 버튼 그룹 스타일
const buttonGroupStyle = {
  display: "flex",
  gap: 10,
  marginRight: "90px",
  marginTop: "-90px",
  float: "right", // 오른쪽 정렬
};

// ✅ 작성하기 버튼 스타일
const writeButtonStyle = {
  width: 75,
  height: 30,
  background: "#4880FF",
  borderRadius: 14,
  border: "none",
  color: "white",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

// ✅ 삭제 버튼 스타일
const deleteButtonStyle = {
  width: 75,
  height: 30,
  background: "#FF5C5C",
  borderRadius: 14,
  border: "none",
  color: "white",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
