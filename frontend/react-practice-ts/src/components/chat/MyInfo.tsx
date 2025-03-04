import { useEffect, useState } from "react";
import profileBig from "../../assets/Images/chat/profileBig.png";
import chatBig from "../../assets/Images/chat/chatBig.png";
import edit from "../../assets/Images/chat/edit.png";
import axios from "axios";

type MyInfo = {
  userNo: number;
  userName: string;
  positionNo?: number;
  deptNo?: number;
  status?: string;
  deptName: string;
  positionName: string;
  email?: string;
  phone?: string;
  extension?: string;
  profileImg?: string; // 추가된 프로필 이미지 필드
};

type MyInfoProps = {
  myinfo: MyInfo;
  onClose: () => void;
};

const MyInfo = ({ myinfo, onClose }: MyInfoProps) => {
 
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState(profileBig);

  // ✅ 서버에서 프로필 이미지 가져오기
  const fetchProfileImage = async () => {
    try {
      const response = await axios.get(`http://localhost:8003/workly/api/user/profile/${myinfo.userNo}`);
      console.log("📌 서버에서 받은 프로필 이미지:", response.data.profileImg);
  
      if (response.data.profileImg) {
        const imageUrl = response.data.profileImg.startsWith("http")
          ? response.data.profileImg
          : new URL(response.data.profileImg, "http://localhost:8003").href;
  
        setProfileImage(imageUrl);
      } else {
        setProfileImage(profileBig);
      }
    } catch (error) {
      console.error("❌ 프로필 이미지 불러오기 실패:", error);
      setProfileImage(profileBig);
    }
  };
  
  
  
  

  // ✅ 처음 렌더링될 때 DB에서 프로필 이미지 가져오기 (새로고침해도 유지됨)
  useEffect(() => {
    fetchProfileImage();
  }, [myinfo.userNo]);

  // ✅ 파일 선택 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // ✅ 프로필 이미지 업로드 핸들러
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("변경할 이미지를 선택하세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userNo", myinfo.userNo.toString());

    try {
      const response = await axios.post("http://localhost:8003/workly/api/user/uploadProfile", formData);
      console.log("📌 서버 응답:", response.data);

      if (response.data.profileImg) {
        
        setProfileImage(new URL(response.data.profileImg, "http://localhost:8003").href);


        alert("프로필 이미지가 변경되었습니다.");
      }
    } catch (error) {
      console.error("❌ 프로필 이미지 업로드 실패:", error);
      alert("프로필 이미지 업로드에 실패했습니다.");
    }
  };







  return (
    <div className="myinfo" style={{ width: 300, height: 500, backgroundColor: "white", paddingBottom: 16, marginLeft: "-10px", position: "relative" }}>
      {/* 닫기 버튼 */}
      <button onClick={onClose} style={{ position: "absolute", top: -45, right: 5, background: "transparent", border: "none", fontSize: 18, cursor: "pointer" }}>
        ✕
      </button>

      <div className="meminfo-profile" style={{ display: "flex", alignItems: "center", marginTop: 40, paddingLeft: 75 }}>
      <label htmlFor="profile-upload" style={{ cursor: "pointer" }}>
        <img
          style={{ width: 100, height: 100, borderRadius: "50%" }}
          src={profileImage}
          alt="profile"
          onError={(e) => { e.currentTarget.src = profileBig; }}
        />
      </label>
        <input id="profile-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
      </div>

      <div style={{ marginTop: 35, paddingLeft: 0, paddingRight: 16 }}>
        {[
          { label: "이름", value: myinfo.userName },
          { label: "부서", value: myinfo.deptName },
          { label: "직급", value: myinfo.positionName },
          { label: "이메일", value: myinfo.email },
          { label: "연락처", value: myinfo.phone },
          { label: "내선번호", value: myinfo.extension },
        ].map((item, index) => (
          <div key={index} style={{ display: "flex", marginBottom: 15 }}>
            <div style={{ width: 90, color: "#979797", fontSize: 16, fontWeight: "600", fontFamily: "Inter" }}>{item.label}</div>
            <div style={{ color: "#202224", fontSize: 16, fontWeight: "600", fontFamily: "Inter" }}>{item.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "35px", paddingTop: "35px", marginLeft: "27px", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img className="chatBig" style={{ width: 28, height: 28 }} src={chatBig} alt="chat icon" />
          <span style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "600", marginTop: "4px" }}>나와의 채팅</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} onClick={handleUpload}>
          <img className="edit" style={{ width: 28, height: 28 }} src={edit} alt="edit icon" />
          <span style={{ fontSize: "14px", fontFamily: "Inter", fontWeight: "600", marginTop: "4px" }}>이미지 저장</span>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
