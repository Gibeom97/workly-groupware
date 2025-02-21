import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Category.module.css'

const Category = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className={styles.buttonGroup}>
            <button 
            className={`${styles.button} ${location.pathname === "/personnel" ? styles.activeButton : ""}`}
            onClick={() => navigate("/personnel")}    
            >인사정보조회</button>
            <button 
            className={`${styles.button} ${location.pathname === "/personnel/createEmployee" ? styles.activeButton : ""}`}
            onClick={() => navigate("/personnel/createEmployee")}
            >사원생성</button>
            <button 
            className={`${styles.button} ${location.pathname === "/personnel/managePermissions" ? styles.activeButton : ""}`}
            onClick={() => navigate("/personnel/managePermissions")}
            >권한관리</button>
        </div>
    )
}

export default Category;