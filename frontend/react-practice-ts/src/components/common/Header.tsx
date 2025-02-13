import changePwd from '../../assets/images/icon/changePwd.png';
import down from '../../assets/images/icon/down.png';
import logout from '../../assets/images/icon/logout.png';
import mypage from '../../assets/images/icon/mypage.png';
import profileImg from '../../assets/images/icon/passion.jpg';
import { useState } from 'react';
import styles from './Header.module.css'; // 변경: 일반 CSS 대신 module.css 사용
function Header() {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const toggleDown = () => {
    setDropDownOpen((prev) => !prev);
  }
  return (
    <header >
      <div className={styles.header}>
        {/* 우측 프로필 영역 */}
        <div className={styles.profileArea}>
          <img
            className={styles.profileImage}
            src={profileImg}
            alt="프로필이미지"
          />
          <div className={styles.profileInfo}>
            <div className={styles.profileName}>최웡카</div>
            <div className={styles.profileRole}>과장</div>
          </div>
          <button className={styles.dropdownButton}>
            <div>
              <img
                src={down}
                alt="드롭다운"
                onClick={toggleDown}
              />
            </div>
          </button>
          {/* 드롭다운 영역: isOpen이 true일 때만 표시 */}
          {dropDownOpen && (
            <div className={styles.dropdownMenu}>
              <div className={styles.menuItem}>
                <img src={mypage} alt="마이 페이지" />
                <span>마이 페이지</span>
              </div>
              <div className={styles.menuItem}>
                <img src={changePwd} alt="비밀번호 변경" />
                <span>비밀번호 변경</span>
              </div>
              <div className={styles.menuItem}>
                <img src={logout} alt="로그아웃" />
                <span>로그아웃</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <h2 className={styles.category}>전자결재</h2>
      </div>
    </header>
  );
}
export default Header;