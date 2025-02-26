import styles from './MeetingRoom.module.css'
import search from '../../assets/images/icon/search.png';

const meetings = [
    { time: "09:00~12:00", title: "마케팅팀 회의", room: "1403호" },
    { time: "10:30~12:00", title: "인사팀 정규회의", room: "1405호" },
    { time: "15:30~17:00", title: "재무회계팀 분기 결산 회의", room: "1405호" }
];

const MeetingRoom = () => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span>회의실 사용 현황</span>
            </div>
            <div className={styles.datePicker}>
                <button className={styles.navButton}>&lt;</button>
                <span className={styles.date}>2025.02.07(금)</span>
                <button className={styles.navButton}>&gt;</button>
            </div>
            <div className={styles.search}>
                <input type="text" className={styles.input} placeholder="회의실명" />
                <button className={styles.searchButton}><img src={search} alt='search' /></button>
            </div>
            <div className={styles.meetingList}>
                {meetings.map((meeting, index) => (
                    <div key={index} className={styles.meetingItem}>
                        <span className={styles.time}>{meeting.time}</span>
                        <span className={styles.title}>{meeting.title}</span>
                        <span className={styles.room}>{meeting.room}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MeetingRoom;