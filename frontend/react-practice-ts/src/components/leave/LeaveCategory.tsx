import { useLocation, useNavigate } from 'react-router-dom';
import styles from './LeaveCategory.module.css'

const LeaveCategory = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className={styles.buttonGroup}>
            <button 
            className={`${styles.button} ${location.pathname === "/leave" ? styles.activeButton : ""}`}
            onClick={() => navigate("/leave")}    
            >내 연차 사용내역</button>
            <button 
            className={`${styles.button} ${location.pathname === "/leave/manage" ? styles.activeButton : ""}`}
            onClick={() => navigate("/leave/manage")}
            >사원 연차 관리</button>
            <button 
            className={`${styles.button} ${location.pathname === "/leave/policy" ? styles.activeButton : ""}`}
            onClick={() => navigate("/leave/policy")}
            >기본 연차 관리</button>
        </div>
    )
}

export default LeaveCategory;