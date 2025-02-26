import { useEffect, useState } from 'react'
import styles from './LeavePolicy.module.css'
import axios from 'axios'
import PolicyModal from './PolicyModal';

const LeavePolicy = () => {
    const [policy, setPolicy] = useState([]);
    const [openModal, setOpenModal] = useState(false); // 모달창 열기
    const [policyDetail, setPolicyDetail] = useState(0);

    const fetchPolicy = () => {
        axios.get("http://localhost:8003/workly/leavePolicy")
            .then((response) => {
                console.log(response.data);
                setPolicy(response.data);
            })
            .catch(() => {
                alert("기본 연차 조회에 실패하였습니다.")
                setPolicy([]);
            })
    }

    const handleModal = (i) => {
        setPolicyDetail(i);
        setOpenModal(true);
    }

    useEffect(() => {
        fetchPolicy();
    }, [])

    return (
        <div className={styles.policyContainer}>
            {openModal &&
                <PolicyModal setOpenModal={setOpenModal} policy={policy} policyDetail={policyDetail} fetchPolicy={fetchPolicy}/>
            }
            <table className={styles.table}>
                <thead className={styles.theadStyle}>
                    <tr className={styles.headerRow}>
                        <th className={styles.thStyle}>No</th>
                        <th className={styles.thStyle}>근로기간</th>
                        <th className={styles.thStyle}>기본 연차 일수</th>
                    </tr>
                </thead>
                {<tbody>
                    {policy.length > 0 && policy.map((e, i) => {
                        let displayDate;

                        if(i === 0) {
                            displayDate = `${e.minYear} 년차`;
                        } else if(i === policy.length - 1) {
                            displayDate = `${e.minYear} 년차 이상`;
                        } else {
                            displayDate = `${e.minYear} ~ ${e.maxYear} 년차`;
                        }
                        return (
                            <tr key={i} className={styles.rowStyle} onClick={() => handleModal(i)}>
                                <td className={styles.tdStyle}>{i+1}</td>
                                <td className={styles.tdStyle}>{displayDate}</td>
                                <td className={styles.tdStyle}>{e.leaveDays}일</td>
                            </tr>
                        )
                    })}
                    {policy.length === 0 &&
                    <tr>
                        <td  className={styles.tdStyle} colSpan={2}>조회된 내역이 없습니다.</td>
                    </tr>
                    }
                </tbody>}
            </table>
        </div>
    )
}

export default LeavePolicy