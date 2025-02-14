import { useState } from 'react';
import styles from './PersonnelTable.module.css'

const PersonnelTable = ({personnelList}) => {

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
                { <tbody>
                    {personnelList.map((e, i) => (
                        <tr key={i} className={styles.rowStyle}>
                            <td className={styles.tdStyle}>{e.userNo}</td>
                            <td className={styles.tdStyle}>{e.userName}</td>
                            <td className={styles.tdStyle}>{e.email}</td>
                            <td className={styles.tdStyle}>{e.extension}</td>
                            <td className={styles.tdStyle}>{e.phone}</td>
                            <td className={styles.tdStyle}>{e.deptNo}</td>
                            <td className={styles.tdStyle}>{e.positionNo}</td>
                            <td className={styles.tdStyle}>{e.hireDate}</td>
                            <td className={styles.tdStyle}>{e.hireDate}</td>
                            <td className={styles.tdStyle}>{e.totalLeaveDays}</td>
                            <td className={`${styles.tdStyle} ${styles.address}`}>{e.address}</td>
                        </tr>
                    ))}
                </tbody> }
            </table>
        </div>
    )
}

export default PersonnelTable;