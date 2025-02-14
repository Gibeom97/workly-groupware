import { useState } from "react";
import styles from "./CreateEmployee.module.css";
import profile from "../../assets/images/icon/default-profile.png"

const CreateEmployee = () => {
    const [formData, setFormData] = useState({
        department: "",
        position: "",
        name: "",
        password: "",
        phone: "",
        address: "",
        email: "",
        extension: "",
        joinDate: "2025-02-06",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.container}>
            <div className={styles.profileContainer}>
                <div><img src={profile} alt="Profile" className={styles.profileImage} /></div>
                <div>
                    <button className={styles.changeProfile}>프로필 변경</button>
                    <input type="file" name="" id="upfile" className={styles.inputProfile}/>
                </div>
            </div>
            <div className={styles.formContainer}>
                <div className={styles.row}>
                    <label className={styles.label}>부서 / 직급</label>
                    <select name="department" className={styles.input} onChange={handleChange}>
                        <option>부서명</option>
                        <option>인사팀</option>
                        <option>경영지원팀</option>
                        <option>마케팅팀</option>
                        <option>보안팀</option>
                        <option>법무법인팀</option>
                        <option>디자인팀</option>
                        <option>개발운영팀</option>
                        <option>서비스운영팀</option>
                    </select>
                    <select name="position" className={styles.input} onChange={handleChange}>
                        <option>직급명</option>
                        <option>팀장</option>
                        <option>과장</option>
                        <option>차장</option>
                        <option>대리</option>
                        <option>사원</option>
                    </select>
                </div>
                <div className={styles.row}><label className={styles.label}>이름</label><input type="text" name="name" className={styles.input} onChange={handleChange} /></div>
                <div className={styles.row}><label className={styles.label}>비밀번호</label><input type="password" name="password" className={styles.input} onChange={handleChange} /></div>
                <div className={styles.row}><label className={styles.label}>연락처</label><input type="text" name="phone" className={styles.input} onChange={handleChange} /></div>
                <div className={styles.row}><label className={styles.label}>주소</label><input type="text" name="address" className={styles.input} onChange={handleChange} /></div>
                <div className={styles.row}><label className={styles.label}>이메일</label><input type="email" name="email" className={styles.input} onChange={handleChange} /></div>
                <div className={styles.row}><label className={styles.label}>내선번호</label><input type="text" name="extension" className={styles.input} onChange={handleChange} /></div>
                <div className={styles.row}><label className={styles.label}>입사일</label><input type="date" name="hiredate" className={styles.input} onChange={handleChange} /></div>
                <button className={styles.submitButton}>생성</button>
            </div>
        </div>
    );
};

export default CreateEmployee;
