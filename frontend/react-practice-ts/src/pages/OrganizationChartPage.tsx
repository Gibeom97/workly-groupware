import { Outlet } from "react-router-dom"
import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"
import OrganizationChart from "../components/organization/OrganizationChart"

const OrganizationChartPage = () => {

    return (
        <div className="mainpageContainer">
            <Sidebar />
            <div className="componentContainer">
                <Header />
                <div className="componentContainer1">
                    <OrganizationChart />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default OrganizationChartPage