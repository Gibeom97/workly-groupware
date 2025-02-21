import { Outlet } from "react-router-dom"
import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"
import LeaveCategory from "../components/leave/LeaveCategory"

const LeaveMain = () => {

    return (
        <div className="mainpageContainer">
            <Sidebar />
            <div className="componentContainer">
                <Header />
                <div className="componentContainer1">
                    <LeaveCategory />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default LeaveMain