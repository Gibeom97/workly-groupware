import styles from "./Sidebar.module.css";
import icon1 from '../../assets/images/icon/1.png';
import icon2 from '../../assets/images/icon/2.png';
import icon3 from '../../assets/images/icon/3.png';
import icon4 from '../../assets/images/icon/4.png';
import icon5 from '../../assets/images/icon/5.png';
import icon6 from '../../assets/images/icon/6.png';
import icon7 from '../../assets/images/icon/7.png';
import icon8 from '../../assets/images/icon/8.png';
import icon9 from '../../assets/images/icon/9.png';
import icon10 from '../../assets/images/icon/10.png';
import icon11 from '../../assets/images/icon/11.png';
import icon12 from '../../assets/images/icon/12.png';
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate(); // ✅ 페이지 이동을 위한 Ho

  return (
    <div className={styles.sidebar}>
      <h1 className={styles.title}>Workly</h1>
      <div className={styles.sidebarNav}>
      <nav>
        <ul>
          <li>
            <span>
              <img src={icon1} alt="홈" />
            </span>
            <span>홈</span>
          </li>
          <li>
            <span>
              <img src={icon2} alt="조직도" />
            </span>
            <span>조직도</span>
          </li>
          <li>
            <span>
              <img src={icon3} alt="캘린더" />
            </span>
            <span>캘린더</span>
          </li>
          <li onClick={() => navigate('/approvalMain')} style={{ cursor: "pointer" }}>
            <span>
              <img src={icon4} alt="전자결재" />
            </span>
            <span>전자결재</span>
            <span className={styles.badge}>6</span>
          </li>
          <li>
            <span>
              <img src={icon5} alt="채팅" />
            </span>
            <span>채팅</span>
              <span className={styles.badge}>3</span>
          </li>
          <li>
            <span>
              <img src={icon6} alt="연차관리" />
            </span>
            <span>연차관리</span>
          </li>
          <li>
            <span>
              <img src={icon7} alt="근태관리" />
            </span>
            <span>근태관리</span>
          </li>
        </ul>
        <hr className={styles.firstHr} />
        <ul>
          <li>
            <span>
              <img src={icon8} alt="급여관리" />
            </span>
            <span>급여관리</span>
          </li>
          <li>
            <span>
              <img src={icon9} alt="인사관리" />
            </span>
            <span>인사관리</span>
          </li>
          <li>
            <span>
              <img src={icon10} alt="권한관리" />
            </span>
            <span>권한관리</span>
          </li>
        </ul>
      </nav>
      </div>
      <div className={styles.logout}>
        <button className={styles.mypageButton}>
          <span>
            <img className={styles.imgIcon} src={icon11} alt="마이페이지" />
          </span>
          <span>마이페이지</span>
        </button>
        <button className={styles.logoutButton}>
          <span>
            <img className={styles.imgIcon} src={icon12} alt="로그아웃" />
          </span>
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
