import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../styles/mainpage/Login.module.css';
import axios from "../utils/CustomAxios";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/userSlice";
import { getCookie, removeCookie, setCookie, setIdCookie } from "../utils/Cookie";

const Login = () => {
    const [userNo, setUserNo] = useState("");
    const [userPwd, setUserPwd] = useState("");
    const [rememberId, setRememberId] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        const userNoAsInt = Number(userNo);

        if(!userNo) {
            alert("아이디를 입력하세요.");
            return;
        }

        if(!userPwd) {
            alert("비밀번호를 입력하세요.");
            return;
        }

        if (rememberId) {
            setIdCookie('rememberId', userNo, 90);
        } else {
            removeCookie("rememberId");
        }

        axios.post("http://localhost:8003/workly/login", {
            userNo: userNoAsInt,
            userPwd
        })
            .then((response) => {
                console.log("로그인 성공 response: ", response.data);
                const jwtToken = response.data.jwtToken;
                const user = response.data.user;
                setCookie("accessToken", jwtToken);
                setCookie("user", JSON.stringify(user));

                dispatch(loginUser(response.data.user));

                console.log("cookie user확인: ", getCookie("user"));
                console.log("cookie token확인: ", getCookie("accessToken"));
                console.log("localStorage 확인: ", localStorage.getItem("user"));
                navigate("/main", {replace: true});
            }).catch((error) => {
                
                console.log(error.response.data);
                const failCount = error.response.data.failCount;
                if(failCount < 5) {
                    alert(`${error.response.data.msg} [${failCount}/5]`);
                } else {
                    alert(error.response.data.msg);
                }
            }).finally(() => setUserPwd(''))
    }

    useEffect(() => {
        console.log("cookie user확인: ", getCookie("user"));
        console.log("cookie token확인: ", getCookie("accessToken"));
        console.log("localStorage 확인: ", localStorage.getItem("user"));
        console.log("cookie rememberId확인: ", getCookie("rememberId"));

        const userNo = getCookie("rememberId");
        if (userNo) {
            setUserNo(userNo);
            setRememberId(true);
        }

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
                            type="text" id="userNo" className={styles.inputField} placeholder="사원번호"
                            value={userNo}
                            onChange={(e) => setUserNo(e.target.value)}
                        />
                        <label htmlFor="userPw" className={styles.labelText}>비밀번호</label>
                        <input
                            type="password"
                            id="userPw"
                            value={userPwd}
                            className={styles.inputField}
                            placeholder="비밀번호"
                            onChange={(e) => setUserPwd(e.target.value)}
                        />
                        <div className={styles.saveContainer}>
                            <input
                                type="checkbox" id="saveId" className={styles.saveId}
                                checked={rememberId}
                                onChange={() => setRememberId(!rememberId)} />
                            <label htmlFor="saveId" className={styles.saveLabel} >아이디 저장</label>
                        </div>
                        <button type="submit" className={styles.loginBtn}>로그인</button>
                        <div className={styles.footer}>
                            <p>
                                비밀번호 분실 시 인사팀에 문의해주세요
                            </p>
                            <label className={styles.notice}
                                onClick={() => navigate("/CompanyEnrollPage")}>
                                법인 회원가입
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;

