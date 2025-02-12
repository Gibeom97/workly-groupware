import { useState } from 'react';
import styles from './Header.module.css'; // 변경: 일반 CSS 대신 module.css 사용

function Header() {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const toggleDown = () => {
    setDropDownOpen((prev) => !prev);
  }

  return (
    <header className={styles.header}>
      {/* 우측 프로필 영역 */}
      <div className={styles.profileArea}>
        <img
          className={styles.profileImage}
          src="../../public/images/icon/passion.jpg"
          alt="프로필이미지"
        />
        <div className={styles.profileInfo}>
          <div className={styles.profileName}>최웡카</div>
          <div className={styles.profileRole}>과장</div>
        </div>
        <button className={styles.dropdownButton}>
          <div>
            <img
              src="../../public/images/icon/down.png"
              alt="드롭다운"
              onClick={toggleDown}
            />
          </div>
        </button>
        {/* 드롭다운 영역: isOpen이 true일 때만 표시 */}
        {dropDownOpen && (
          <div className={styles.dropdownMenu}>
            <div className={styles.menuItem}>
              <img src="../../public/images/icon/mypage.png" alt="마이 페이지" />
              <span>마이 페이지</span>
            </div>
            <div className={styles.menuItem}>
              <img src="../../public/images/icon/changePwd.png" alt="비밀번호 변경" />
              <span>비밀번호 변경</span>
            </div>
            <div className={styles.menuItem}>
              <img src="../../public/images/icon/logout.png" alt="로그아웃" />
              <span>로그아웃</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
