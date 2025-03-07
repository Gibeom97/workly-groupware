import { useState } from 'react';
import styles from '../../styles/myPage/ChangePwdModal.module.css';
import { useSelector } from 'react-redux';
import axios from '../../utils/CustomAxios';
// import axios from 'axios';

const ChangePwdModal = ({ setOpenModal }) => {
    const [currentPwd, setCurrentPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [pwdErrorMessage, setPwdErrorMessage] = useState("");
    const [regErrorMessage, setRegErrorMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

    let user = useSelector((state) => {
        return state.user;
    });

    const handleUpdate = () => {
        setRegErrorMessage("");
        setErrorMessage("");

        // 새 비밀번호 유효성 검사
        if (!passwordRegex.test(newPwd)) {
            setRegErrorMessage("영문, 숫자, 특수문자 를 포함하여 8~20자로 입력해주세요.");
            setNewPwd("");
            setConfirmPwd("");
            return;
        }

        // 새 비밀번호와 확인 비밀번호 일치 여부 확인
        if (newPwd !== confirmPwd) {
            setErrorMessage("새 비밀번호가 일치하지 않습니다.");
            setConfirmPwd("");
            return;
        }
        if (confirm("비밀번호를 변경하시겠습니까?")) {

            axios.put("http://localhost:8003/workly/changePwd", {
                userNo: user.userNo,
                currentPwd,
                newPwd
            })
                .then((response) => {
                    console.log("response: ", response);
                    alert(response.data.msg);
                    setOpenModal(false)
                })
                .catch((error) => {
                    setPwdErrorMessage(error.response.data.msg);
                    setCurrentPwd("");
                })
        }
    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.sectionContainer}>
                <h3 className={styles.h3}>비밀번호 변경</h3>
                <div className={styles.mainSection}>
                    <div className={styles.changePwd}>
                        <label className={styles.label}>현재 비밀번호</label>
                        <input
                            type="password" placeholder="현재 비밀번호 입력" className={styles.input}
                            value={currentPwd}
                            onChange={(e) => setCurrentPwd(e.target.value)} />
                    </div>
                    {pwdErrorMessage && <p className={styles.error}>{pwdErrorMessage}</p>}
                    <div className={styles.changePwd}>
                        <label className={styles.label}>새 비밀번호</label>
                        <input
                            type="password" placeholder="영문, 숫자, 특수문자 포함 8~20자 입력" className={styles.input}
                            value={newPwd}
                            onChange={(e) => setNewPwd(e.target.value)}
                        />
                    </div>
                    {regErrorMessage && <p className={styles.error}>{regErrorMessage}</p>}
                    <div className={styles.changePwd}>
                        <label className={styles.label}>새 비밀번호 확인</label>
                        <input
                            type="password" placeholder="새 비밀번호 확인" className={styles.input}
                            value={confirmPwd}
                            onChange={(e) => setConfirmPwd(e.target.value)}
                        />
                    </div>
                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                </div>
                <div className={styles.buttonSection}>
                    <button className={styles.update} onClick={handleUpdate}>수정</button>
                    <button className={styles.cancle} onClick={() => setOpenModal(false)}>취소</button>
                </div>
            </div>
        </div>
    )
}

export default ChangePwdModal;