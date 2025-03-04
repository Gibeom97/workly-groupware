import { useState } from 'react';
import styles from './PolicyModal.module.css'
import axios from '../../utils/CustomAxios';

const PolicyModal = ({setOpenModal, policy, policyDetail, fetchPolicy}) => {
    const [detail, setDetail] = useState(policy[policyDetail]);

    const changeLeaveDays = (e) => {
        setDetail({
            ...detail,
            leaveDays: Number(e.target.value)
        })
    }

    const handleUpdate = () => {
        console.log(detail);

        axios.put("http://localhost:8003/workly/updatePolicy", {   
                policyNo: detail.policyNo,
                minYear : detail.minYear,
                maxYear : detail.maxYear,
                leaveDays: detail.leaveDays
            }, {headers: {
                    "Content-Type": "application/json"
                }
            })
             .then((response) => {
                alert(response.data.msg);
             })
             .catch((error) => {
                console.log(error.data);
             })
             .finally(() => {
                 fetchPolicy();
                 setOpenModal(false)
             })
    }
    
    return (
        <div className={styles.modalContainer}>
            <div className={styles.sectionContainer}>
                <h3 className={styles.h3}>기본 연차 변경</h3>
                <div className={styles.dateSection}>
                    <div className={styles.dateLabel}>근로기간</div>
                    <div className={styles.inputContainer}>
                        <input type="number" placeholder="근로기간 입력" value={detail.minYear} className={styles.dateInput} readOnly/>
                        <div className={styles.space}>~</div>
                        <input type="number" placeholder="근로기간 입력"  value={detail.maxYear} className={styles.dateInput} readOnly/>
                    </div>
                </div>
                <div className={styles.leaveSection}>
                    <label className={styles.label}>기본연차</label>
                    <input type="number" placeholder="기본연차 입력" onChange={changeLeaveDays} value={detail.leaveDays} className={styles.input} />
                </div>
                <div className={styles.buttonSection}>
                    <button className={styles.update} onClick={handleUpdate}>수정</button>
                    <button className={styles.cancle} onClick={() => setOpenModal(false)}>취소</button>
                </div>
            </div>
        </div>
    )
}

export default PolicyModal;