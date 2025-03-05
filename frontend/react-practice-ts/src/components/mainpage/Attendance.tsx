import { useEffect, useState } from 'react';
import styles from '../../styles/mainpage/Attendance.module.css';
import { useSelector } from 'react-redux';
import profileImg from '../../assets/images/icon/profile.png';

const Attendance = () => {
    const [time, setTime] = useState(new Date());
    const [preview, setPreview] = useState("");

    const url = "http://localhost:8003/workly/uploads/profile/";
    
    let user = useSelector((state) => {
        return state.user;
    });

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        setPreview(user.changeName);
        return () => clearInterval(interval);
    }, []);

    const formatDate = (time) => {
        return time.toISOString().split("T")[0];
    };

    const formatTime = (time) => {
        const hours = String(time.getHours()).padStart(2, "0");
        const minutes = String(time.getMinutes()).padStart(2, "0");
        const seconds = String(time.getSeconds()).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className={styles.widgetContainer}>
            <div className={styles.dateSection}>
                <div className={styles.date}>{formatDate(time)} ({["일", "월", "화", "수", "목", "금", "토"][time.getDay()]})</div>
                <div className={styles.time}>{formatTime(time)}</div>
            </div>
            <div className={styles.profile}>
                {!preview && <img src={profileImg} alt="profile" className={styles.avatar} />}
                {preview && <img src={url + preview} alt="preview" className={styles.avatar} />}            
                <div className={styles.name}>{user.userName}</div>
                <div className={styles.position}>{user.deptName} {user.positionName}</div>
            </div>
            <div className={styles.buttons}>
                <button className={styles.checkIn}>출근</button>
                <button className={styles.checkOut}>퇴근</button>
            </div>
        </div>
    )
}

export default Attendance;