import styles from './ManageLeave.module.css'
import search from '../../assets/images/icon/search.png';
import { useEffect, useState } from 'react';
import MemberSearchModal from './MemberSearchModal';
import axios from '../../utils/CustomAxios';
import { format } from 'date-fns';

const ManageLeave = () => {
    const [openModal, setOpenModal] = useState(false); // 모달창 열기
    const [memberList, setMemberList] = useState([]); // 모달창 사원 리스트
    const [year, setYear] = useState(new Date().getFullYear()); // 선택 연도
    const [updateLeave, setUpdateLeave] = useState(1); // 총 연차 변경 state
    const [annualLeave, setAnnualLeave] = useState({}); // 해당 사원의 연도별 휴가 수
    const [leaveHistory, setleaveHistory] = useState([]); // 해당 사원의 연도별 휴가 내역
    const [user, setUser] = useState({ // header의 사원 정보
        userNo: 1,
        userName: "",
        deptName: "",
        positionName: "",
        status: "",
        hireDate: ""
    });

    const handleChange = (e) => {
        const newYear = e.target.name === 'minus' ? year - 1 : year + 1; 

        if(user.userName) {
            const hireYear = new Date(user.hireDate).getFullYear();
            
            if(newYear < hireYear) {
                alert("입사일 이전 기간으로 이동할 수 없습니다.");
                return;
            }
        }
        setYear(newYear);
    }

    const handleModal = () => {
        axios.get("http://localhost:8003/workly/memberSearch")
            .then((response) => {
                setMemberList(response.data);
            })
            .catch(() => {
                setMemberList([]);
            })
        setOpenModal(true);
    }

    const handleLeaveDetail = () => {
        axios.get("http://localhost:8003/workly/leaveDetail", {
            params: {
                userNo: user.userNo,
                year
            }
        })
            .then((response) => {
                setAnnualLeave(response.data[0].annualLeave);
                setleaveHistory(response.data);
                setUpdateLeave(response.data[0].annualLeave.totalAnnualLeave);
            })
            .catch((error) => {
                setAnnualLeave({
                    totalAnnualLeave: 0,
                    usedAnnualLeave: 0
                });
                setleaveHistory([]);
                setUpdateLeave(0);
            })
    }

    const handleUpdateLeave = () => {
        axios.put("http://localhost:8003/workly/updateLeave", null, {
            params: {
                userNo: user.userNo,
                year,
                updateLeave
            }})
             .then((response) => {
                handleLeaveDetail();
                alert(response.data.msg);
             })
             .catch((error) => {
                handleLeaveDetail();
                alert(error.response.data.msg)
             })
    }

    useEffect(() => {
        handleLeaveDetail();
    }, [user, year])

    return (
        <div className={styles.vacationPageContainer}>
            {openModal && (
                <MemberSearchModal setYear={setYear} setUser={setUser} memberList={memberList} setOpenModal={setOpenModal} />
            )}
            <div className={styles.searchContainer} onClick={handleModal}>
                <input type="text" className={styles.input} placeholder="사원 검색" />
                <button className={styles.searchButton} ><img src={search} alt='search' /></button>
            </div>
            {/* 프로필 섹션 */}
            <div className={styles.profileContainer}>
                <div className={styles.profileHeader}>
                    {user.userName !== "" && (
                        <div>
                            <h1 className={styles.profileName}>{user.userName}</h1>
                            <div className={styles.profileSubInfo}>
                                <span>{user.deptName}</span>
                                <span>{user.positionName}</span>
                                <span className={styles.hireDate}>
                                    <span>입사일</span>
                                    <span>{format(new Date(user.hireDate), 'yyyy-MM-dd')}</span>
                                </span>
                                <span>{user.status === "Y" ? "재직" : (user.status === "X" ? "퇴직" : "휴직")}</span>
                            </div>
                        </div>
                    )}
                    {user.userName === "" && (
                        <div>
                            <h1 className={styles.tmpName}>이름</h1>
                            <div className={styles.profileSubInfo}>
                                <span>부서명</span>
                                <span>직급명</span>
                                <span className={styles.hireDate}>
                                    <span>입사일</span>
                                    <span></span>
                                </span>
                                <span>재직상태</span>
                            </div>
                        </div>
                    )}
                    <div className={styles.infoContainer}>
                        <div className={styles.annualLeaveLabel}>{year}년 잔여 연차</div>
                        <div className={styles.annualLeaveContainer}>
                            <span className={styles.usedLeaveCount}>{annualLeave.totalAnnualLeave - annualLeave.usedAnnualLeave}</span>
                            <span>/</span>
                            <span>
                                <input className={styles.annualLeaveCount} type="number" onChange={(e) => {setUpdateLeave(e.target.value)}} value={updateLeave} />
                            </span>
                            <button className={styles.editButton} onClick={handleUpdateLeave}>수정</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* 연도 변경 */}
            <div className={styles.dateSection}>
                <div>
                    <button onClick={handleChange} className={styles.button} name='minus'>&lt;</button>
                </div>
                <div onClick={() => setYear(new Date().getFullYear())} className={styles.date}>{year}
                    <input type="date" className={styles.calendar} />
                </div>
                <div>
                    <button onClick={handleChange} className={styles.button} name='plus'>&gt;</button>
                </div>
            </div>
            {/* 휴가내역 테이블 */}
            <div className={styles.listContainer}>
                <table className={styles.table}>
                    <thead className={styles.stickyHeader}>
                        <tr className={styles.headerRow}>
                            <th className={styles.thStyle}>No</th>
                            <th className={styles.thStyle}>휴가구분</th>
                            <th className={styles.thStyle}>시작일</th>
                            <th className={styles.thStyle}>종료일</th>
                            <th className={styles.thStyle}>휴가일수</th>
                            <th className={styles.thStyle}>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveHistory.length > 0 && leaveHistory[0].leaveHistory !== null && leaveHistory.map((e, i) => (
                            <tr key={i} className={styles.rowStyle}>
                                <td className={styles.tdStyle}>{i + 1}</td>
                                <td className={styles.tdStyle}>{e.leaveHistory.leaveType}</td>
                                <td className={styles.tdStyle}>{new Date(e.leaveHistory.startDate).toISOString().split("T")[0]}</td>
                                <td className={styles.tdStyle}>{new Date(e.leaveHistory.endDate).toISOString().split("T")[0]}</td>
                                <td className={styles.tdStyle}>{e.leaveHistory.leaveDays}</td>
                                <td className={styles.tdStyle}>{e.leaveHistory.approvalStatus === 1 ? "신청" : (e.leaveHistory.approvalStatus === 2 ? "승인" : "반려")}</td>
                            </tr>
                        ))}
                        {leaveHistory.length === 0 && user.userName === "" &&
                            <tr className={styles.rowStyle}>
                                <td className={styles.tdStyle} colSpan={6}>사원을 검색해주세요.</td>
                            </tr>
                        }
                        {(leaveHistory.length === 0 || (leaveHistory.length > 0 && leaveHistory[0].leaveHistory === null)) && user.userName !== "" && 
                            <tr className={styles.rowStyle}>
                                <td className={styles.tdStyle} colSpan={6}>휴가 사용 내역이 없습니다. 연도를 클릭하여 현재연도로 이동할 수 있습니다.</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageLeave;