import { useEffect } from "react";
import styles from '../styles/mainpage/MainPage.module.css';
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import Weather from "../components/mainpage/Weather";
import Attendance from "../components/mainpage/Attendance";
import ApprovalCard from "../components/mainpage/ApprovalCard";
import MeetingRoom from "../components/mainpage/MeetingRoom";
import Calendar5 from "../components/mainpage/Calendar5";

const MainPage = () => {
    useEffect(() => {
        // 이미 새로고침한 적이 없으면 새로고침
        if (!sessionStorage.getItem("mainPageRefreshed")) {
          sessionStorage.setItem("mainPageRefreshed", "true");
          window.location.reload();
        }
      }, []);

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