import { useState } from "react";
import styles from "./Pagination.module.css";

const Pagination = ({pageInfo, setCurrentPage}) => {
  if(!pageInfo) return null;

  const {listCount, currentPage, pageLimit, contentsLimit ,startPage, endPage, maxPage} = pageInfo;
  
  return (
    <div>
      <div className={styles.pagination}>
        <button 
          className={styles.moveButton} 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(currentPage - 1)}>
          &lt;
        </button>
        {Array.from({ length: maxPage }).map((_, index) => (
          <button
            key={index}
            className={`${styles.pageButton} ${currentPage === index + 1 ? styles.activePage : ""}`}
            onClick={() => {setCurrentPage(index + 1)
            }}
          >
            {index + 1}
          </button>
        ))}
        <button 
          className={styles.moveButton} 
          disabled={currentPage === maxPage} 
          onClick={() => setCurrentPage(currentPage + 1)}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
