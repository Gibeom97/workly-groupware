import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../styles/leave/LeaveCategory.module.css';
import { useSelector } from 'react-redux';

const LeaveCategory = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => {
        return state.user;
      });

    return (
        <div className={styles.buttonGroup}>
            <button 
            className={`${styles.button} ${location.pathname === "/leave" ? styles.activeButton : ""}`}
            onClick={() => navigate("/leave")}    
            >내 연차 사용내역</button>
            {user.role === "ROLE_HR" &&
            <button 
            className={`${styles.button} ${location.pathname === "/leave/manage" ? styles.activeButton : ""}`}
            onClick={() => navigate("/leave/manage")}
            >사원 연차 관리</button>}
            {user.role === "ROLE_HR" &&
            <button 
            className={`${styles.button} ${location.pathname === "/leave/policy" ? styles.activeButton : ""}`}
            onClick={() => navigate("/leave/policy")}
            >기본 연차 관리</button>}
        </div>
    )
}

export default LeaveCategory;