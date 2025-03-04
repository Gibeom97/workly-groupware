import changePwd from '../../assets/images/icon/changePwd.png';
import down from '../../assets/images/icon/down.png';
import logout from '../../assets/images/icon/logout.png';
import mypage from '../../assets/images/icon/mypage.png';
import profileImg from '../../assets/images/icon/profile.png';
import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/userSlice';

function Header() {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [preview, setPreview] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  
  const url = "http://localhost:8003/workly/uploads/profile/";
  
  useEffect(() => {
    setPreview(user.changeName);
  }, []);

  let title = "";
  if (pathname.includes("approval")) {
    title = "전자결재";
  } else if (pathname.includes("Approval")) {
    title = "전자결재";
  } else if (pathname.includes("personnel")) {
    title = "인사관리";
  } else if (pathname.includes("calendar")) {
    title = "캘린더";
  } else if (pathname.includes("form")) {
    title = "결재양식관리";
  } else if (pathname.includes("leave")) {
    title = "연차관리"
  } else if (pathname.includes("myPage")) {
    title = "마이페이지"
  } else if (pathname.includes("AIAssistant")){
    title = "회사규정Q&A"
  } else if (pathname.includes("AdminPolicyManager")){
    title = "회사규정Q&A 관리"
  } else {
    title = "";
  }

  const toggleDown = () => {
    setDropDownOpen((prev) => !prev);
  }

  let user = useSelector((state) => {
    return state.user;
  });

  const handleLogout = () => {
    if(confirm("로그아웃하시겠습니까?")) {
      dispatch(logoutUser());
      navigate("/");
    }
  }

  return (
    <header >
      <div className={styles.header}>
        <div className={styles.profileArea}>
        {!preview && <img src={profileImg} alt="profile" className={styles.profileImage} />}
        {preview && <img src={url + preview} alt="preview" className={styles.profileImage} />}
          <div className={styles.profileInfo}>
            <div className={styles.profileName}>{user.userName}</div>
            <div className={styles.infoSection}>
              <div className={styles.profileRole}>{user.deptName}</div>
              <div className={styles.profileRole}>{user.positionName}</div>
            </div>
          </div>
          <button className={styles.dropdownButton}>
            <div>
              <img src={down} alt="드롭다운" onClick={toggleDown}/>
            </div>
          </button>
          {dropDownOpen && (
            <div className={styles.dropdownMenu}>
              <div className={styles.menuItem} onClick={() => navigate("/myPage")}>
                <img src={mypage} alt="마이 페이지" />
                <span>마이 페이지</span>
              </div>
              <div className={styles.menuItem}>
                <img src={changePwd} alt="비밀번호 변경" />
                <span>비밀번호 변경</span>
              </div>
              <div className={styles.menuItem} onClick={handleLogout}>
                <img src={logout} alt="로그아웃" />
                <span>로그아웃</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <h2 className={styles.category}>{title}</h2>
      </div>
    </header>
  );
}
export default Header;