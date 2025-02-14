import { useState } from 'react';
import styles from './PersonnelTable.module.css'

const PersonnelTable = ({personnelList}) => {
    const phoneFormat = (phone) => {
        return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    };

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
                            <td className={styles.tdStyle}>{e.member.eno}</td>
                            <td className={styles.tdStyle}>{e.member.userName}</td>
                            <td className={styles.tdStyle}>{e.member.email}</td>
                            <td className={styles.tdStyle}>{e.member.extension}</td>
                            <td className={styles.tdStyle}>{phoneFormat(e.member.phone)}</td>
                            <td className={styles.tdStyle}>{e.department.deptName}</td>
                            <td className={styles.tdStyle}>{e.position.positionName}</td>
                            <td className={styles.tdStyle}>{e.member.hireDate}</td>
                            <td className={styles.tdStyle}>{e.member.updateDate}</td>
                            <td className={styles.tdStyle}>{e.member.totalLeaveDays}</td>
                            <td className={`${styles.tdStyle} ${styles.address}`}>{e.member.address}</td>
                        </tr>
                    ))}
                </tbody> }
            </table>
        </div>
    )
}

export default PersonnelTable;