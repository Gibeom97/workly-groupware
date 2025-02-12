import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h1 className={styles.title}>Workly</h1>
      <div className={styles.sidebarNav}>
      <nav>
        <ul>
          <li>
            <span>
              <img src="../../public/images/icon/1.png" alt="홈" />
            </span>
            <span>홈</span>
          </li>
          <li>
            <span>
              <img src="../../public/images/icon/2.png" alt="조직도" />
            </span>
            <span>조직도</span>
          </li>
          <li>
            <span>
              <img src="../../public/images/icon/3.png" alt="캘린더" />
            </span>
            <span>캘린더</span>
          </li>
          <li>
            <span>
              <img src="../../public/images/icon/4.png" alt="전자결재" />
            </span>
            <span>전자결재</span>
              <span className={styles.badge}>6</span>
          </li>
          <li>
            <span>
              <img src="../../public/images/icon/5.png" alt="채팅" />
            </span>
            <span>채팅</span>
              <span className={styles.badge}>3</span>
          </li>
          <li>
            <span>
              <img src="../../public/images/icon/6.png" alt="연차관리" />
            </span>
            <span>연차관리</span>
          </li>
          <li>
            <span>
              <img src="../../public/images/icon/7.png" alt="근태관리" />
            </span>
            <span>근태관리</span>
          </li>
        </ul>
        <hr className={styles.firstHr} />
        <ul>
          <li>
            <span>
              <img src="../../public/images/icon/8.png" alt="급여관리" />
            </span>
            <span>급여관리</span>
          </li>
          <li>
            <span>
              <img src="../../public/images/icon/9.png" alt="인사관리" />
            </span>
            <span>인사관리</span>
          </li>
          <li>
            <span>
              <img src="../../public/images/icon/10.png" alt="권한관리" />
            </span>
            <span>권한관리</span>
          </li>
        </ul>
      </nav>
      </div>
      <div className={styles.logout}>
        <button className={styles.mypageButton}>
          <span>
            <img className={styles.imgIcon} src="../../public/images/icon/11.png" alt="마이페이지" />
          </span>
          <span>마이페이지</span>
        </button>
        <button className={styles.logoutButton}>
          <span>
            <img className={styles.imgIcon} src="../../public/images/icon/12.png" alt="로그아웃" />
          </span>
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
