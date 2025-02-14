import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";

const MainPage = () => {

    return (
        <div className="mainpageContainer">
            <Sidebar />
            <div className="componentContainer">
                <Header/>
                <div className="componentContainer1">
                </div>
            </div>
        </div>
    )
}

export default MainPage;