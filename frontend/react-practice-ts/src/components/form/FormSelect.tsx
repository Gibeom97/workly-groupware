import Pagination from "../common/Pagination";
import styles from './FormSelect.module.css'
import search from '../../assets/images/icon/search.png';
import { Link } from "react-router-dom";

const FormSelect = () => {

    return (
        <div className={styles.formContainer}>
            <div className={styles.title}>결재양식조회</div>
            <div className={styles.searchContainer}>
                <div className={styles.search}>
                    <input type="text" className={styles.input} placeholder="양식명 검색" />
                    <button className={styles.searchButton}><img src={search} alt='search' /></button>
                </div>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.headerRow}>
                        <th className={styles.thStyle}>No</th>
                        <th className={styles.thStyle}>양식 제목</th>
                        <th className={styles.thStyle}>구분</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <tr key={index} className={styles.rowStyle}>
                            <td className={styles.tdStyle}>{index + 1}</td>
                            <td className={styles.tdStyle}>오전 연차 신청서</td>
                            <td className={styles.tdStyle}>연차</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.buttonContainer}>
                <button className={styles.button}>양식 등록</button>
            </div>
            <Pagination />
        </div>
    )
}

export default FormSelect;