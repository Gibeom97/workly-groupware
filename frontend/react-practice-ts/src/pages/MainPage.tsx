import { useEffect } from "react";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import { useSelector } from "react-redux";

const MainPage = () => {

    let user = useSelector((state) => {
        return state.user
    });

    useEffect(() =>{
        console.log(user)
    },[])

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