import styles from './Category.module.css'

const Category = ({activeComponent, setActiveComponent}) => {

    return (
        <div className={styles.buttonGroup}>
            <button 
            className={`${styles.button} ${activeComponent === "viewPersonnel" ? styles.activeButton : ""}`}
            onClick={() => setActiveComponent("viewPersonnel") }    
            >인사정보조회</button>
            <button 
            className={`${styles.button} ${activeComponent === "createEmployee" ? styles.activeButton : ""}`}
            onClick={() => setActiveComponent("createEmployee")}
            >사원생성</button>
            <button 
            className={`${styles.button} ${activeComponent === "managePermissions" ? styles.activeButton : ""}`}
            onClick={() => setActiveComponent("managePermissions")}
            >권한관리</button>
        </div>
    )
}

export default Category;