import { FormEvent, useRef, useState } from "react";
import styles from "./CompanyEnroll.module.css";
import defaultImg from "../../assets/images/icon/default-profile.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeptPositionSelect from "../personnel/DeptPositionSelect";
import AddressForm from "../personnel/AddressForm";

const CompanyEnroll = () => {
    const [company, setCompany] = useState({
        companyName: "", 
        companyNum: "",  
    });

    const [member, setMember] = useState({
        deptNo: 2,
        positionNo: 0,
        userName: "",
        userPwd: "",
        phone: "",
        address: "",
        addressDetail: "",
        email: "",
        extension: "",
        hireDate: "",
        companyId: null, // ✅ 회사 ID 저장
    });

    const [addressApi, setAddressApi] = useState("");
    const [profileImg, setProfileImg] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file.size > 3 * 1024 * 1024) {
            alert("최대 3MB의 파일까지 전송 가능합니다.");
            return;
        }

        setProfileImg(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleFileCancle = () => {
        setPreview(null);
        setProfileImg(null);
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    // ✅ 회사 정보 입력 핸들러
    const handleCompanyChange = (e) => {
        setCompany({
            ...company,
            [e.target.name]: e.target.value,
        });
    };

    // ✅ 멤버 정보 입력 핸들러
    const handleChange = (e) => {
        setMember({
            ...member,
            [e.target.name]: e.target.value,
        });
    };

    // ✅ 회사 정보 등록 함수 (1)
    const submitCompanyInfo = async () => {

        console.log("전송하는 데이터:", company);
        
        try {
            const response = await axios.post("http://localhost:8003/workly/api/policies/enroll", company);
            console.log("백엔드 전체 응답:", response);
            console.log("백엔드 응답 데이터:", response.data);
            console.log("백엔드 응답의 companyId:", response.data?.companyId);

            return response.data.companyId; // 회사 ID 반환
        } catch (error) {
            alert(error.response?.data?.msg || "회사 정보 등록 실패");
            throw new Error("회사 등록 실패");
        }
    };

    // ✅ 멤버 정보 등록 함수 (2)
    const submitMemberInfo = async (companyId) => {
        console.log("전송되는 companyId:", companyId)

        const formData = new FormData();

        const updateMember = {
            ...member,
            hireDate: new Date(member.hireDate).toISOString().split("T")[0],
            address: addressApi,
            companyId: companyId, // ✅ 회사 ID 추가
        };

        console.log("전송되는 멤버 데이터:", updateMember); // ✅ 로그 추가

        const memberBlob = new Blob([JSON.stringify(updateMember)], { type: "application/json" });

        formData.append("member", memberBlob);

        if (profileImg) {
            formData.append("fileImg", profileImg);
        }

        await axios.post("http://localhost:8003/workly/enroll", formData)
            .then(response => {
                navigate("/");
                alert(response.data.msg);
            })
            .catch(error => {
                alert(error.response?.data?.msg || "멤버 정보 등록 실패");
            });
    };

    // ✅ 최종 등록 함수
    const handleInsert = async (e: FormEvent) => {
        e.preventDefault();

        try {
            // 1️⃣ 회사 정보 먼저 등록
            const companyId = await submitCompanyInfo();
            console.log("생성된 companyId:", companyId);

            // // 2️⃣ 멤버 정보에 companyId 설정
            // setMember((prevMember) => ({
            //     ...prevMember,
            //     companyId: companyId,
            // }));

            // 3️⃣ 멤버 등록 진행
            await submitMemberInfo(companyId);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.pageWrapper}>
            {/* ✅ 법인 회원가입 제목 추가 */}
            <h1 className={styles.title}>법인 회원가입</h1>
    
            <form className={styles.container} onSubmit={handleInsert}>
                <div className={styles.formWrapper}>
                    {/* ✅ 프로필 컨테이너 */}
                    <div className={styles.profileContainer}>
                        <div>
                            {!preview && <img src={defaultImg} alt="profile" onClick={handleImageClick} className={styles.profileImage} />}
                            {preview && <img src={preview} alt="preview" onClick={handleImageClick} className={styles.profileImage} />}
                        </div>
                        <label htmlFor="uploadFile">
                            <span className={styles.changeProfile} ref={fileInputRef}>파일 선택</span>
                        </label>
                        {profileImg && <div><span className={styles.cancleProfile} onClick={handleFileCancle}>{profileImg.name} &times;</span></div>}
                        <input type="file" id="uploadFile" className={styles.inputProfile} onChange={handleFileChange} />
                    </div>
    
                    {/* ✅ 입력 폼 컨테이너 */}
                    <div className={styles.formContainer}>
                        <div className={styles.row}>
                            <label className={styles.label}>회사 이름</label>
                            <input type="text" name="companyName" className={styles.input} onChange={handleCompanyChange} required />
                        </div>
    
                        <div className={styles.row}>
                            <label className={styles.label}>사업자 번호</label>
                            <input type="text" name="companyNum" className={styles.input} onChange={handleCompanyChange} required placeholder="숫자만 입력해주세요(- 제외)" />
                        </div>
    
                        <div className={styles.row}>
                            <label className={styles.label}>관리자 부서 / 직급</label>
                            <DeptPositionSelect positionNo={member.positionNo} deptNo={2} handleChange={handleChange} />
                        </div>
                        <div className={styles.row}>
                            <label className={styles.label}>관리자 이름</label>
                            <input type="text" name="userName" className={styles.input} onChange={handleChange} required />
                        </div>
                        <div className={styles.row}>
                            <label className={styles.label}>비밀번호</label>
                            <input type="password" name="userPwd" className={styles.input} onChange={handleChange} required />
                        </div>
                        <div className={styles.row}>
                            <label className={styles.label}>관리자 연락처</label>
                            <input type="number" name="phone" className={styles.input} onChange={handleChange} placeholder="숫자만 입력해주세요(- 제외)" required />
                        </div>
                        <div className={styles.row}>
                            <label className={styles.label}>회사 주소</label>
                            <input type="text" name="address" value={addressApi} className={styles.input} onChange={handleChange} readOnly required />
                            <AddressForm setAddressApi={setAddressApi} />
                        </div>
                        <div className={styles.row}>
                            <label className={styles.label}></label>
                            <input type="text" name="addressDetail" className={styles.input} placeholder="상세 주소" onChange={handleChange} required />
                        </div>
                        <div className={styles.row}>
                            <label className={styles.label}>관리자 이메일</label>
                            <input type="email" name="email" className={styles.input} onChange={handleChange} required />
                        </div>
                        <div className={styles.row}>
                            <label className={styles.label}>관리자 내선번호</label>
                            <input type="number" name="extension" className={styles.input} onChange={handleChange} placeholder="숫자만 입력해주세요(- 제외)" />
                        </div>
                        <div className={styles.row}>
                            <label className={styles.label}>입사일</label>
                            <input type="date" name="hireDate" className={styles.input} onChange={handleChange} required />
                        </div>
                        <div className={styles.buttonGroup}>
                            <button type="submit" className={styles.submitButton}>생성</button>
                            <button type="button" className={styles.cancleButton} onClick={() => navigate("/CompanyEnrollPage")}>취소</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
    
    
};

export default CompanyEnroll;
