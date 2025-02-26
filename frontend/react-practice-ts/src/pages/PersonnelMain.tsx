import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import Category from '../components/personnel/Category';
import { Outlet } from 'react-router-dom';
import styles from './PersonnelMain.module.css'

const PersonnelMain = () => {
    return (
        <div className="mainpageContainer">
            <Sidebar />
            <div className="componentContainer">
                <Header />
                <div className={styles.componentContainer1}>
                    <Category/>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default PersonnelMain;
