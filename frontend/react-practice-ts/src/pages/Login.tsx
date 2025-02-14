import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Login.module.css'
import axios from "axios";

const Login = () => {
    const [userNo, setUserNo] = useState("");
    const [userPwd, setUserPwd] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        const userNoAsInt = Number(userNo);
        
        axios.post("http://localhost:8003/workly/login", { 
            userNo: userNoAsInt, 
            userPwd })
            .then(
                response => navigate("/main")
            ).catch(error => {
                alert(error.response.data.msg);
            })
            .finally(() => {
                setUserNo(""),
                setUserPwd("")
            });
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
                        <div className={styles.saveId}>
                            <input type="checkbox" id="saveId" />
                            <label htmlFor="saveId">아이디 저장</label>
                        </div>
                        <button type="submit" className={styles.loginBtn}>로그인</button>
                        <p className={styles.notice}>
                            비밀번호 분실 시 인사팀에 문의하세요
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;