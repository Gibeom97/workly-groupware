import { FormEvent, useRef, useState } from "react";
import styles from "./CreateEmployee.module.css";
import defaultImg from "../../assets/images/icon/default-profile.png"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddressForm from "./AddressForm";
import DeptPositionSelect from "./DeptPositionSelect";

const CreateEmployee = () => {
    const [member, setMember] = useState({
        deptNo: 0, // int
        positionNo: 0, //int
        userName: "",
        userPwd: "",
        phone: "",
        address: "",
        addressDetail: "",
        email: "",
        extension: "",
        hireDate: "", // Date
    });
    
    const [addressApi, setAddressApi] = useState("");
    const [profileImg, setProfileImg] = useState(null); // 프로필 이미지
    const [preview, setPreview] = useState(null); // 프로필 이미지 미리보기
    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if(file.size > 3 * 1024 * 1024) {
            alert("최대 3MB의 파일까지 전송 가능합니다.");
            return;
        }

        setProfileImg(file);
        setPreview(URL.createObjectURL(file));
    }

    const handleFileCancle = (e) => {
        setPreview(null);
        setProfileImg(null);
    }

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleChange = (e) => {
        setMember({
            ...member, 
            [e.target.name]: e.target.value 
            });
    };

    const handleInsert = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

        const updateMember = {
            ...member,
            hireDate : new Date(member.hireDate).toISOString().split("T")[0], // 날짜 string -> Date로 변환
            address : addressApi,
        };

        setMember(updateMember);

        const memberBlob = new Blob([JSON.stringify(updateMember)], {type: "application/json"});

        formData.append("member", memberBlob);

        if(profileImg) {
            formData.append("fileImg", profileImg);
        }

        await axios.post("http://localhost:8003/workly/enroll", formData)
             .then(response => {
                navigate("/personnel");
                alert(response.data.msg);
            })
             .catch(error => {
                navigate("/personnel");
                alert(error.response.data.msg);
             });
    };

    return (
        <form className={styles.container} onSubmit={handleInsert}>
            <div className={styles.profileContainer}>
                <div>
                    {!preview && <img src={defaultImg} alt="profile" onClick={handleImageClick} className={styles.profileImage} />}
                    {preview && <img src={preview} alt="preview" onClick={handleImageClick} className={styles.profileImage} />}
                </div>
                <label htmlFor="uploadFile">
                    <span className={styles.changeProfile} ref={fileInputRef} >파일 선택</span>
                </label>
                { profileImg && <div><span className={styles.cancleProfile} onClick={handleFileCancle}>{profileImg.name} &times;</span></div> }
                <input type="file" id="uploadFile" className={styles.inputProfile} onChange={handleFileChange} />
            </div>
            <div className={styles.formContainer}>
                <div className={styles.row}>
                    <label className={styles.label}>부서 / 직급</label>
                    <DeptPositionSelect positionNo={0} deptNo={0} handleChange={handleChange}/>
                </div>
                <div className={styles.row}><label className={styles.label}>이름</label><input type="text" name="userName" className={styles.input} onChange={handleChange} required/></div>
                <div className={styles.row}><label className={styles.label}>비밀번호</label><input type="password" name="userPwd" className={`${styles.input} ${styles.pwInput}`} onChange={handleChange} required /></div>
                <div className={styles.row}><label className={styles.label}>연락처</label><input type="number" name="phone" className={styles.input} onChange={handleChange} placeholder="숫자만 입력해주세요(- 제외)" required/></div>
                <div className={styles.row} >
                    <label className={styles.label}>주소</label>
                    <input type="text" name="address" value={addressApi} className={styles.input} onChange={handleChange} readOnly required/>
                    <AddressForm setAddressApi={setAddressApi}/>
                </div>
                <div className={styles.row}><label className={styles.label}></label><input type="text" name="addressDetail" className={styles.input} placeholder="상세 주소" onChange={handleChange} required/></div>
                <div className={styles.row}><label className={styles.label}>이메일</label><input type="email" name="email" className={styles.input} onChange={handleChange} required/></div>
                <div className={styles.row}><label className={styles.label}>내선번호</label><input type="number" name="extension" className={styles.input} onChange={handleChange} placeholder="숫자만 입력해주세요(- 제외)" /></div>
                <div className={styles.row}><label className={styles.label}>입사일</label><input type="date" name="hireDate" className={styles.input} onChange={handleChange} required/></div>
                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.submitButton}>생성</button>
                    <button type="button" className={styles.cancleButton} onClick={() => navigate("/personnel")}>취소</button>
                </div>
            </div>
        </form>
    );
};

export default CreateEmployee;