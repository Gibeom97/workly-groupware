import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import MyPageCategory from '../components/myPage/MyPageCategory';

const MyPage = () => {

    return (
        <div className="mainpageContainer">
            <Sidebar />
            <div className="componentContainer">
                <Header />
                <div className="componentContainer1">
                    <MyPageCategory />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MyPage;