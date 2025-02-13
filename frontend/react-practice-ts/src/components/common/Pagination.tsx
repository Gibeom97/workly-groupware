import { useState } from "react";
import styles from "./Pagination.module.css";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  return (
    <div>
      <div className={styles.pagination}>
        <button className={styles.moveButton} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          &lt;
        </button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`${styles.pageButton} ${currentPage === index + 1 ? styles.activePage : ""}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button className={styles.moveButton} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
