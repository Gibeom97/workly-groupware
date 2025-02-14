import { FormEvent, useState } from "react";
import styles from "./CreateEmployee.module.css";
import profile from "../../assets/images/icon/default-profile.png"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
    const [member, setMember] = useState({
        deptNo: 0, // int
        positionNo: 0, //int
        userName: "",
        userPwd: "",
        phone: "",
        address: "",
        email: "",
        extension: "",
        hireDate: "", // Date
    });

    const [fileImg, setFileImg] = useState(profile);
    const [filePreview, setFilePreview] = useState(null);

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setFilePreview(URL.createObjectURL(file));
        }
        setFileImg(file);
    }
    
    const handleChange = (e) => {
        setMember({ ...member, [e.target.name]: e.target.value });
        console.log(fileImg);
    };

    const handleInsert = ((e: FormEvent) => {
        e.preventDefault();
        console.log(member);
        
        axios.post("http://localhost:8003/workly/createMember", {
            ...member,
            hireDate: new Date(member.hireDate).toISOString().split("T")[0] // 날짜 string -> Date로 변환
        })
             .then(response => console.log(response))
             .catch(error => {
                alert(error.response.data.msg);
             });
    })

    return (
        <form encType="multipart/form-data" className={styles.container} onSubmit={handleInsert}>
            <div className={styles.profileContainer}>
                <div>
                    {!filePreview && <img src={fileImg} alt="Profile" className={styles.profileImage} />}
                    {filePreview && <img src={filePreview} alt="preview" className={styles.profileImage} />}
                </div>
                <label htmlFor="uploadFile">
                    <span className={styles.changeProfile}>파일 선택</span>
                </label>
                <input type="file" id="uploadFile" className={styles.inputProfile} onChange={handleFileChange} />
            </div>
            <div className={styles.formContainer}>
                <div className={styles.row}>
                    <label className={styles.label}>부서 / 직급</label>
                    <select name="deptNo" defaultValue="0" className={styles.input} onChange={handleChange} required>
                        <option value="0" disabled >부서명</option>
                        <option value="1">인사팀</option>
                        <option value="2">경영지원팀</option>
                        <option value="3">마케팅팀</option>
                        <option value="4">보안팀</option>
                        <option value="5">법무법인팀</option>
                        <option value="6">디자인팀</option>
                        <option value="7">개발운영팀</option>
                        <option value="8">서비스운영팀</option>
                    </select>
                    <select name="positionNo" defaultValue="0"  className={styles.input} onChange={handleChange} required>
                        <option value="0" disabled>직급명</option>
                        <option value="1">팀장</option>
                        <option value="2">과장</option>
                        <option value="3">차장</option>
                        <option value="4">대리</option>
                        <option value="5">사원</option>
                    </select>
                </div>
                <div className={styles.row}><label className={styles.label}>이름</label><input type="text" name="userName" className={styles.input} onChange={handleChange} required/></div>
                <div className={styles.row}><label className={styles.label}>비밀번호</label><input type="password" name="userPwd" className={`${styles.input} ${styles.pwInput}`} onChange={handleChange} required /></div>
                <div className={styles.row}><label className={styles.label}>연락처</label><input type="number" name="phone" className={styles.input} onChange={handleChange} placeholder="숫자만 입력해주세요(- 제외)" required/></div>
                <div className={styles.row}><label className={styles.label}>주소</label><input type="text" name="address" className={styles.input} onChange={handleChange} required/></div>
                <div className={styles.row}><label className={styles.label}>이메일</label><input type="email" name="email" className={styles.input} onChange={handleChange} required/></div>
                <div className={styles.row}><label className={styles.label}>내선번호</label><input type="number" name="extension" className={styles.input} onChange={handleChange} placeholder="숫자만 입력해주세요(- 제외)" /></div>
                <div className={styles.row}><label className={styles.label}>입사일</label><input type="date" name="hireDate" className={styles.input} onChange={handleChange} required/></div>
                <button type="submit" className={styles.submitButton}>생성</button>
            </div>
        </form>
    );
};

export default CreateEmployee;
