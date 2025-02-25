import { useEffect, useState } from 'react';
import styles from './MyLeave.module.css'
import { useSelector } from 'react-redux';
import axios from 'axios';
import Pagination from '../common/Pagination';

const MyLeave = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [history, setHistory] = useState([]);
    const [annualLeave, setAnnualLeave] = useState({});
    const [pageInfo, setPageInfo] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    let user = useSelector((state) => {
        return state.user;
    });

    const handleReset = () => {
        setYear(new Date().getFullYear());
    }

    const handleChange = (e: { target: { name: string; }; }) => {
        e.target.name === 'minus' ? setYear(year - 1) : setYear(year + 1);
        setCurrentPage(1);
    }

    const fetchMyLeave = () => {
        axios.get("http://localhost:8003/workly/myLeave", {
            params: {
                year,
                userNo: user.userNo,
                cPage: currentPage
            }
        })
            .then((response) => {
                setHistory(response.data.list);
                setAnnualLeave(response.data.list[0].annualLeave);
                setPageInfo(response.data.pi);
            })
            .catch((error) => {
                setHistory([]);
                setAnnualLeave({
                    totalAnnualLeave : 0,
                    usedAnnualLeave: 0
                });
                setPageInfo({});
            })
    }

    useEffect(() => {
        fetchMyLeave();
        console.log("history: ", history);
        console.log("annualLeave: ", annualLeave)
        console.log("pi: ", pageInfo);
    }, [currentPage, year])

    return (
        <div>
            <div className={styles.header}>
                <div className={styles.dateSection}>
                    <div>
                        <button onClick={handleChange} className={styles.button} name='minus'>&lt;</button>
                    </div>
                    <div onClick={handleReset} className={styles.date}>{year}
                        <input type="date" className={styles.calendar} />
                    </div>
                    <div>
                        <button onClick={handleChange} className={styles.button} name='plus'>&gt;</button>
                    </div>
                </div>
                <div className={styles.infoSection}>
                    <div className={styles.content}>
                        <div className={styles.title}>잔여</div>
                        <span className={styles.rest}>{annualLeave.totalAnnualLeave - annualLeave.usedAnnualLeave} 일</span>
                        <div className={styles.title}>사용</div>
                        <span className={styles.rest}>{annualLeave.usedAnnualLeave} 일</span>
                        <div className={styles.title}>총 연차</div>
                        <span className={styles.total}>{annualLeave.totalAnnualLeave} 일</span>
                    </div>
                </div>
            </div>
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
                    {history.map((e, i) => (
                        <tr key={i} className={styles.rowStyle}>
                            <td className={styles.tdStyle}>{i + 1}</td>
                            <td className={styles.tdStyle}>{e.leaveHistory.leaveType === "1" ? "연차" : (e.leaveHistory.leaveType === "2" ? "오전 반차" : "오후 반차")}</td>
                            <td className={styles.tdStyle}>{new Date(e.leaveHistory.startDate).toISOString().split("T")[0]}</td>
                            <td className={styles.tdStyle}>{new Date(e.leaveHistory.endDate).toISOString().split("T")[0]}</td>
                            <td className={styles.tdStyle}>{e.leaveHistory.leaveDays}</td>
                            <td className={styles.tdStyle}>{e.leaveHistory.leaveStatus === "1" ? "대기" : (e.leaveHistory.leaveStatus === "2" ? "승인" : "반려")}</td>
                        </tr>
                    ))}
                </tbody>}
            </table>
            <Pagination pageInfo={pageInfo} setCurrentPage={setCurrentPage}/>
        </div>
    )
}

export default MyLeave;