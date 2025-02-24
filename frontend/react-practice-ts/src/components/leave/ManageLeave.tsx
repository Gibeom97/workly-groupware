import styles from './ManageLeave.module.css'
import search from '../../assets/images/icon/search.png';

const ManageLeave = () => {
    const userName = '김덕춘';
    const department = '총무팀';
    const position = '사원';       // 예시로 들어간 텍스트
    const joinDate = '2024-01-13';
    const remainingLeave = 16;
    const totalUsedLeave = 5;

    // 간단한 예시 데이터
    const dummyData = [
        { id: 1, category: '연차', startDate: '2025-01-02', endDate: '2025-01-03', days: 2 },
        { id: 2, category: '연차', startDate: '2025-01-15', endDate: '2025-01-16', days: 1 },
        { id: 3, category: '오후반차', startDate: '2025-02-07', endDate: '2025-02-07', days: 0.5 },
        { id: 4, category: '오후반차', startDate: '2025-02-28', endDate: '2025-02-28', days: 0.5 },
        { id: 5, category: '연차', startDate: '2025-03-14', endDate: '2025-03-14', days: 1 },
        { id: 6, category: '오전반차', startDate: '2025-04-15', endDate: '2025-04-15', days: 0.5 },
    ];

    return (
        <div className={styles.vacationPageContainer}>
            <div className={styles.searchContainer}>
                <input type="text" className={styles.input} placeholder="사원 검색" />
                <button className={styles.searchButton}><img src={search} alt='search' /></button>
            </div>
            {/* 프로필 섹션 */}
            <div className={styles.profileContainer}>
                <div className={styles.profileHeader}>
                    <div>
                        <h1 className={styles.profileName}>{userName}</h1>
                        <div className={styles.profileSubInfo}>
                            <span>{department}</span>
                            <span>{position}</span>
                            <span className={styles.hireDate}>
                                <span>입사일</span>  
                                <span>{joinDate}</span>
                            </span>
                        </div>
                    </div>
                    <div className={styles.annualLeaveContainer}>
                        <span className={styles.annualLeaveLabel}>잔여 연차</span>
                        <span className={styles.usedLeaveCount}>{remainingLeave - totalUsedLeave}</span>
                        <span>/</span>
                        <span>
                            <input className={styles.annualLeaveCount} type="number" name="" id="" value={remainingLeave} /> 
                        </span>
                        <button className={styles.editButton}>수정</button>
                    </div>
                </div>
            </div>
            {/* 휴가내역 테이블 */}
            <table className={styles.table}>
                <thead>
                    <tr className={styles.headerRow}>
                        <th className={styles.thStyle}>No</th>
                        <th className={styles.thStyle}>휴가구분</th>
                        <th className={styles.thStyle}>시작일</th>
                        <th className={styles.thStyle}>종료일</th>
                        <th className={styles.thStyle}>휴가일수</th>
                        <th className={styles.thStyle}>상태</th>
                    </tr>
                </thead>
                {<tbody>
                    {dummyData.map((vacation, i) => (
                        <tr key={i} className={styles.rowStyle}>
                            <td className={styles.tdStyle}>{i + 1}</td>
                            <td className={styles.tdStyle}>{vacation.category}</td>
                            <td className={styles.tdStyle}>{vacation.startDate}</td>
                            <td className={styles.tdStyle}>{vacation.endDate}</td>
                            <td className={styles.tdStyle}>{vacation.days}</td>
                            <td className={styles.tdStyle}>{vacation.days}</td>
                        </tr>
                    ))}
                </tbody>}
            </table>
        </div>
    )
}

export default ManageLeave;