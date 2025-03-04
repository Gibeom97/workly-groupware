import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import Category from '../components/personnel/Category';
import { Outlet } from 'react-router-dom';

const PersonnelMain = () => {
    return (
        <div className="mainpageContainer">
            <Sidebar/>
            <div className="componentContainer">
                <Header />
                <div className="componentContainer1">
                    <Category/>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default PersonnelMain;
