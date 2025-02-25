import styles from './MemberSearchModal.module.css'

const MemberSearchModal = ({setUser, setYear, memberList, setOpenModal }) => {

    const handleDetail = (userNo, userName, deptName, positionName, status, hireDate) => {
        setUser({userNo, userName, deptName, positionName, status, hireDate});
        setYear(new Date().getFullYear());
        setOpenModal(false);
    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.sectionContainer}>
                <button className={styles.closeButton} onClick={() => setOpenModal(false)}>&times;</button>
                <div className={styles.searchContainer}>
                    <input type="text" placeholder="이름 입력" className={styles.nameInput} />
                </div>
                <div className={styles.listContainer}>
                    <table className={styles.tableStyle}>
                        <thead className={styles.theadStyle}>
                            <tr>
                                <th className={styles.thStyle}>부서</th>
                                <th className={styles.thStyle}>직급</th>
                                <th className={styles.thStyle}>이름</th>
                                <th className={styles.thStyle}>상태
                                </th>
                            </tr>
                        </thead>
                        {<tbody>
                            { memberList.map((e, i) => (
                                    <tr key={i} className={styles.rowStyle}
                                    onClick={() => handleDetail(
                                        e.member.userNo,
                                        e.member.userName,
                                        e.department.deptName,
                                        e.position.positionName,
                                        e.member.status,
                                        e.member.hireDate
                                        )}>
                                        <td className={styles.tdStyle}>{e.department.deptName}</td>
                                        <td className={styles.tdStyle}>{e.position.positionName}</td>
                                        <td className={styles.tdStyle}>{e.member.userName}</td>
                                        <td className={styles.tdStyle}>{e.member.status === 'Y' ? "재직" : (e.member.status === 'X' ? '퇴직' : '휴직')}</td>
                                    </tr>
                            ))}
                        </tbody>}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MemberSearchModal;