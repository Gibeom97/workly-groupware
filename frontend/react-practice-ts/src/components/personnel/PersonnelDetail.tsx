import axios from 'axios';
import styles from './PersonnelDetail.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import defaultImg from "../../assets/images/icon/default-profile.png"
import AddressForm from './AddressForm';
import DeptPositionSelect from './DeptPositionSelect';

const PersonnelDetail = () => {
    const [member, setMember] = useState({
        deptNo: 0,
        positionNo: 0,
        userNo: 0,
        userName: "",
        phone: "",
        address: "",
        addressDetail: "",
        email: "",
        extension: "",
        hireDate: "", // Date
        updateDate: "", // Date
        status: ""
    });

    const { userNo } = useParams();
    const [addressApi, setAddressApi] = useState("");
    const [profileImg, setProfileImg] = useState(null); // 프로필 이미지
    const [preview, setPreview] = useState(""); // 프로필 이미지 미리보기
    const fileInputRef = useRef(null);
    const url = "http://localhost:8003/workly/uploads/profile/";

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8003/workly/personnelDetail/" + userNo)
            .then((response) => {
                const r = response.data.member

                setMember({
                    deptNo: r.deptNo,
                    positionNo: r.positionNo, //int
                    userNo: Number(userNo),
                    userName: r.userName,
                    phone: r.phone,
                    address: r.address,
                    addressDetail: r.addressDetail,
                    email: r.email,
                    extension: r.extension,
                    hireDate: new Date(r.hireDate).toISOString().split("T")[0],
                    updateDate: r.updateDate === null ? "" : new Date(r.updateDate).toISOString().split("T")[0],
                    status: r.status
                })
                setAddressApi(r.address);
                response.data.attachment === null ? setPreview("") : setPreview(url + response.data.attachment.changeName);
            })
            .catch((error) => {
                alert("사원 정보 조회에 실패하였습니다.");
                console.log(error);
            })
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file.size > 3 * 1024 * 1024) {
            alert("최대 3MB의 파일까지 전송 가능합니다.");
            return;
        }

        setProfileImg(file);
        setPreview(URL.createObjectURL(file));
    }

    const handleFileCancle = (e) => {
        setPreview("");
        setProfileImg(null);
    }

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleChange = (e) => {
        setMember({ ...member, [e.target.name]: e.target.value});
        console.log(member);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        const updateMember = {
            ...member,
            hireDate: new Date(member.hireDate).toISOString().split("T")[0], // 날짜 string -> Date로 변환
            address: addressApi
        };

        setMember(updateMember);

        const memberBlob = new Blob([JSON.stringify(updateMember)], { type: "application/json" });

        formData.append("member", memberBlob);

        if (profileImg) {
            formData.append("fileImg", profileImg);
        }

        await axios.put("http://localhost:8003/workly/memberUpdate", formData)
            .then(response => {
                navigate(`/personnel/${userNo}`)
                alert(response.data.msg);
            })
            .catch(error => {
                alert(error.data.msg);
            });
    };

    return (
        <>
            <form className={styles.container} onSubmit={handleUpdate}>
                <div className={styles.profileContainer}>
                    <div className={styles.image}>
                        {!preview && <img src={defaultImg} alt="profile" onClick={handleImageClick} className={styles.profileImage} />}
                        {preview && <img src={preview} alt="preview" onClick={handleImageClick} className={styles.profileImage} />}
                    </div>
                    <label htmlFor="uploadFile">
                        <span className={styles.changeProfile} ref={fileInputRef} >파일 선택</span>
                    </label>
                    {profileImg && <div><span className={styles.cancleProfile} onClick={handleFileCancle}>{profileImg.name} &times;</span></div>}
                    <input type="file" id="uploadFile" className={styles.inputProfile} onChange={handleFileChange} />

                </div>
                <div className={styles.formContainer}>
                    <div className={styles.row}>
                        <label className={styles.label}>부서 / 직급</label>
                        <DeptPositionSelect positionNo={member.positionNo} deptNo={member.deptNo} handleChange={handleChange}/>
                        <select name="status" value={member.status} className={styles.input} onChange={handleChange} required>
                            <option value="0" disabled>상태</option>
                            <option value="Y">재직</option>
                            <option value="X">퇴직</option>
                            <option value="Z">휴직</option>
                        </select>
                    </div>
                    <div className={styles.row}>
                        <label className={styles.label}>사번</label>
                        <input type="text" value={userNo} name="userNo" className={styles.input} onChange={handleChange} readOnly required />
                    </div>
                    <div className={styles.row}>
                        <label className={styles.label}>이름</label>
                        <input type="text" name="userName" value={member.userName} className={styles.input} onChange={handleChange} required />
                    </div>
                    <div className={styles.row}>
                        <label className={styles.label}>연락처</label>
                        <input type="number" name="phone" value={member.phone} className={styles.input} onChange={handleChange} placeholder="숫자만 입력해주세요(- 제외)" required/>
                    </div>
                    <div className={styles.row} >
                        <label className={styles.label}>주소</label>
                        <input type="text" name="address" value={addressApi} className={styles.input} onChange={handleChange} readOnly required />
                        <AddressForm setAddressApi={setAddressApi} />
                    </div>
                    <div className={styles.row}>
                        <label className={styles.label}></label>
                        <input type="text" value={member.addressDetail} name="addressDetail" className={styles.input} placeholder="상세 주소" onChange={handleChange} required />
                    </div>
                    <div className={styles.row}>
                        <label className={styles.label}>이메일</label>
                        <input type="email" value={member.email} name="email" className={styles.input} onChange={handleChange} required pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" />
                    </div>
                    <div className={styles.row}>
                        <label className={styles.label}>내선번호</label>
                        <input type="number" value={member.extension} name="extension" className={styles.input} onChange={handleChange} placeholder="숫자만 입력해주세요(- 제외)"/>
                    </div>
                    <div className={styles.row}>
                        <label className={styles.label}>입사일</label>
                        <input type="date" value={member.hireDate} name="hireDate" className={styles.input} onChange={handleChange} required />
                    </div>
                    <div className={styles.row}>
                        <label className={styles.label}>상태변경일</label>
                        <input type="date" value={member.updateDate} name="updateDate" className={styles.input} onChange={handleChange} />
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.submitButton}>수정</button>
                        <button type="button" className={styles.cancleButton} onClick={() => navigate("/personnel")}>취소</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default PersonnelDetail;