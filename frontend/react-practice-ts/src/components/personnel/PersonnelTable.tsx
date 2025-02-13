import styles from './PersonnelTable.module.css'

const PersonnelTable = () => {

    return (
        <div>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.headerRow}>
                        <th className={styles.thStyle}>사번</th>
                        <th className={styles.thStyle}>이름</th>
                        <th className={styles.thStyle}>이메일</th>
                        <th className={styles.thStyle}>내선번호</th>
                        <th className={styles.thStyle}>연락처</th>
                        <th className={styles.thStyle}>부서</th>
                        <th className={styles.thStyle}>직급</th>
                        <th className={styles.thStyle}>입사일</th>
                        <th className={styles.thStyle}>퇴사일</th>
                        <th className={styles.thStyle}>연차</th>
                        <th className={styles.thStyle}>주소</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <tr key={index} className={styles.rowStyle}>
                            <td className={styles.tdStyle}>20050{index}</td>
                            <td className={styles.tdStyle}>홍길동</td>
                            <td className={styles.tdStyle}>example{index}@naver.com</td>
                            <td className={styles.tdStyle}>511{index}</td>
                            <td className={styles.tdStyle}>010-1234-5555</td>
                            <td className={styles.tdStyle}>총무팀</td>
                            <td className={styles.tdStyle}>팀장</td>
                            <td className={styles.tdStyle}>2005-05-13</td>
                            <td className={styles.tdStyle}>{index % 2 === 0 ? "-" : "2024-12-31"}</td>
                            <td className={styles.tdStyle}>3</td>
                            <td className={styles.tdStyle}>서울특별시 송파구 가락로 5길 7</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PersonnelTable;