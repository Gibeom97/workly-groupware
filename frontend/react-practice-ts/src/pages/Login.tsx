import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Login.module.css'
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/userSlice";

const Login = () => {
    const [userNo, setUserNo] = useState("");
    const [userPwd, setUserPwd] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        const userNoAsInt = Number(userNo);

        axios.post("http://localhost:8003/workly/login", {
            userNo: userNoAsInt,
            userPwd
        })
            .then((response) => {
                if (response.data) {
                    dispatch(loginUser(response.data));
                    navigate("/main");
                } else {
                    alert('사원 정보가 없습니다.');
                    setUserPwd('');
                }
            }).catch(error => {
                alert(error.response.data.msg);
                setUserPwd('')
            })
    }

    useEffect(() => {
        document.body.classList.add(styles.myBodyStyle);
        return () => {
            document.body.classList.remove(styles.myBodyStyle);
        };
    }, []);

    return (
        <>
            <div className={styles.loginContainer}>
                <div className={styles.loginWrapper}>
                    <h1 className={styles.logo}>Workly</h1>
                    <form onSubmit={handleLogin}>
                        <label htmlFor="userNo" className={styles.labelText}>ID</label>
                        <input
                            type="text"
                            id="userNo"
                            value={userNo}
                            className={styles.inputField}
                            placeholder="사원번호"
                            onChange={(e) => {
                                setUserNo(e.target.value)
                            }}
                        />
                        <label htmlFor="userPw" className={styles.labelText}>비밀번호</label>
                        <input
                            type="password"
                            id="userPw"
                            value={userPwd}
                            className={styles.inputField}
                            placeholder="비밀번호"
                            onChange={(e) => {
                                setUserPwd(e.target.value)
                            }}
                        />
                        <div className={styles.saveContainer}>
                            <input type="checkbox" id="saveId" className={styles.saveId} />
                            <label htmlFor="saveId"  className={styles.saveLabel}>아이디 저장</label>
                        </div>
                        <button type="submit" className={styles.loginBtn}>로그인</button>
                        <p className={styles.notice}>
                            비밀번호 분실 시 인사팀에 문의해주세요
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;