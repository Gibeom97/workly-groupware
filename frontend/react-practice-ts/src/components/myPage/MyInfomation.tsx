import { useEffect, useRef, useState } from 'react';
import styles from './MyInfomation.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import defaultImg from "../../assets/images/icon/profile.png"
import axios from 'axios';
import { useSelector } from 'react-redux';
import AddressForm from '../personnel/AddressForm';

const MyInfomation = () => {
    let user = useSelector((state) => {
        return state.user;
    });

    const [member, setMember] = useState({
        deptNo: 0,
        positionNo: 0,
        userNo: user.userNo,
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

    const [addressApi, setAddressApi] = useState("");
    const [profileImg, setProfileImg] = useState(null); // 프로필 이미지
    const [preview, setPreview] = useState(""); // 프로필 이미지 미리보기
    const fileInputRef = useRef(null);
    const url = "http://localhost:8003/workly/uploads/profile/";

    const navigate = useNavigate();

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileCancle = (e) => {
        setPreview("");
        setProfileImg(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file.size > 3 * 1024 * 1024) {
            alert("최대 3MB의 파일까지 전송 가능합니다.");
            return;
        }

        setProfileImg(file);
        setPreview(URL.createObjectURL(file));
    }

    const handleChange = (e) => {
        setMember({ ...member, [e.target.name]: e.target.value });
        console.log(member);
    };


    const handleUpdate = async (e) => {
        e.preventDefault();

        if (confirm("내 정보를 수정하시겠습니까?")) {
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
                    navigate("/myPage")
                    alert(response.data.msg);
                })
                .catch(error => {
                    alert(error.data.msg);
                });
        }

        return;
    }

    useEffect(() => {
        axios.get("http://localhost:8003/workly/personnelDetail/" + member.userNo)
            .then((response) => {
                const r = response.data.member

                setMember({
                    deptNo: r.deptNo,
                    positionNo: r.positionNo, //int
                    userNo: Number(member.userNo),
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
            .finally(() => console.log(member));
    }, [member.userNo]);

    return (
        <form className={styles.container} onSubmit={handleUpdate}>
            <div className={styles.mainSection}>
                <div className={styles.leftSection}>
                    <div className={styles.profileContainer}>
                        <div className={styles.image}>
                            {!preview && <img src={defaultImg} alt="profile" onClick={handleImageClick} className={styles.profileImage} />}
                            {preview && <img src={preview} alt="preview" onClick={handleImageClick} className={styles.profileImage} />}
                        </div>
                        <label htmlFor="uploadFile">
                            <span className={styles.changeProfile} ref={fileInputRef} >프로필 변경</span>
                        </label>
                        {profileImg && <div><span className={styles.cancleProfile} onClick={handleFileCancle}>{profileImg.name} &times;</span></div>}
                        <input type="file" id="uploadFile" className={styles.inputProfile} onChange={handleFileChange} />
                    </div>
                    <div className={styles.fixedInfoContainer}>
                        <table className={styles.profileInfo}>
                            <tbody>
                                <tr>
                                    <th>사번</th>
                                    <td>{member.userNo}</td>
                                </tr>
                                <tr>
                                    <th>부서</th>
                                    <td>{user.deptName}  </td>
                                </tr>
                                <tr>
                                    <th>이름/직급</th>
                                    <td>{user.userName} / {user.positionName}</td>
                                </tr>
                                <tr>
                                    <th>입사일</th>
                                    <td>{member.hireDate}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={styles.rightSection}>
                    <div className={styles.formContainer}>
                        <div className={styles.row}>
                            <label className={styles.label}>연락처</label>
                            <input type="number" name="phone" value={member.phone} className={styles.input} onChange={handleChange} placeholder="숫자만 입력해주세요(- 제외)" required />
                        </div>
                        <div className={styles.row} >
                            <label className={styles.label}>주소</label>
                            <input type="text" name="address" value={addressApi} className={styles.input} onChange={handleChange} readOnly required />
                            <AddressForm setAddressApi={setAddressApi} />
                        </div>
                        <div className={styles.row}>
                            <label className={styles.label}></label>
                            <input type="text" value={member.addressDetail} name="addressDetail" className={styles.input} onChange={handleChange} placeholder="상세 주소" required />
                        </div>
                        <div className={styles.row}>
                            <label className={styles.label}>이메일</label>
                            <input type="email" value={member.email} name="email" className={styles.input} onChange={handleChange} required pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" />
                        </div>
                        <div className={styles.row}>
                            <label className={styles.label}>내선번호</label>
                            <input type="number" value={member.extension} name="extension" className={styles.input} onChange={handleChange} placeholder="숫자만 입력해주세요(- 제외)" />
                        </div>
                        <div className={styles.chagnePwd} style={{ cursor: "pointer" }}>비밀번호 변경</div>
                    </div>
                </div>
            </div>
            <div className={styles.submitSection}>
                <button className={styles.submitButton} style={{ cursor: "pointer" }} onClick={() => handleUpdate}>정보 변경</button>
            </div>
        </form>
    )
}
export default MyInfomation;