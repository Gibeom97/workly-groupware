import { useEffect } from "react";
import styles from './MainPage.module.css'
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import { useSelector } from "react-redux";
import Weather from "../components/mainpage/Weather";
import Attendance from "../components/mainpage/Attendance";
import ApprovalCard from "../components/mainpage/ApprovalCard";
import MeetingRoom from "../components/mainpage/MeetingRoom";
import Calendar5 from "../components/mainpage/Calendar5";

const MainPage = () => {
    let user = useSelector((state) => {
        return state.user;
    });

    useEffect(() => {
        console.log("메인페이지 리덕스에 받아온 : ", user)
    }, [])

    return (
        <div className="mainpageContainer">
            <Sidebar />
            <div className="componentContainer">
                <Header />
                <div className="componentContainer1">
                    <div className={styles.components}>
                        <div className={styles.leftComponents}>
                            <div className={styles.approval}>
                                <ApprovalCard/>
                            </div>
                            <div className={styles.meetingRoom}>
                                <MeetingRoom/>
                            </div>
                            <div className={styles.weather}>
                                <Weather/>
                            </div>
                        </div>
                        <div className={styles.rightComponents}>
                            <div className={styles.attendance}>
                                <Attendance/>
                            </div>
                            <div className={styles.calendar}>
                                <Calendar5/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage;