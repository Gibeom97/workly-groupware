import styles from "../../styles/common/Pagination.module.css";

const Pagination = ({ pageInfo, setCurrentPage }) => {
  if (!pageInfo) return null;

  const { currentPage, pageLimit, maxPage } = pageInfo;

  // 📌 표시할 페이지 범위 계산
  const startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
  const endPage = Math.min(maxPage, startPage + pageLimit - 1);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className={styles.pagination}>
        {/* ◀ 이전 버튼 */}
        {currentPage > 1 && (
          <button
            className={styles.moveButton}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            &lt;
          </button>
        )}

        {/* 📌 현재 페이지 그룹만 노출 */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`${styles.pageButton} ${
              currentPage === page ? styles.activePage : ""
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        {/* ▶ 다음 버튼 */}
        {currentPage < maxPage && (
          <button
            className={styles.moveButton}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;