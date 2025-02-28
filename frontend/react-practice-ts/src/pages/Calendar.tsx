import { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // ✅ Redux에서 로그인 정보 가져오기
import axios from "axios";
import Calendar1 from "../components/calendar/Calendar1";
import Calendar2 from "../components/calendar/Calendar2";
import Calendar3 from "../components/calendar/Calendar3";
import Calendar4 from "../components/calendar/Calendar4";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import Modal from "../components/calendar/Modal";
import { EventInput } from "@fullcalendar/core";
import styles from "./Calendar.module.css";

const CalendarPage = () => {
  const [selectedCalendar, setSelectedCalendar] = useState("calendar1");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);
  const [meetingRoomEvents, setMeetingRoomEvents] = useState<EventInput[]>([]); // ✅ 유지
  const [memoText, setMemoText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // ✅ 내 일정 & 팀 일정 상태 관리
  const [events, setEvents] = useState<EventInput[]>([]); 
  const [teamEvents, setTeamEvents] = useState<EventInput[]>([]);

  // ✅ Redux에서 로그인한 사용자 정보 가져오기
  const user = useSelector((state: any) => state.user);
  const userNo = user?.userNo;

  console.log("📌 Redux에서 가져온 user 정보:", user); // 🛠 로그 추가

  // ✅ 백엔드에서 메모 불러오기 (유지)
  useEffect(() => {
    if (userNo) {
        console.log(`📌 백엔드에 메모 조회 요청 보냄: /memo/${userNo}`);
        axios
            .get(`http://localhost:8003/workly/memo/${userNo}`)
            .then((response) => {
                console.log("✅ 메모 조회 응답:", response.data);
                setMemoText(response.data.memo);
            })
            .catch((error) => console.error("🚨 메모 조회 오류:", error));
    }
}, [userNo]);


  // ✅ 메모 저장 함수 (수정 + 저장) (유지)
  const handleMemoSave = () => {
    if (!userNo) return;

    axios.put(`http://localhost:8003/workly/memo/update/${userNo}`, { memo: memoText })
  .then((response) => {
      console.log("메모 저장 성공", response.data); // ✅ 서버 응답 확인
  })
  .catch((error) => console.error("메모 저장 오류:", error));

  };

  return (
    <div className={styles.mainpageContainer}>
      <Sidebar />
      <div className={styles.componentContainer}>
        <Header />
        <div className={styles.calendarPageContainer}>
          {/* 캘린더 전환 버튼 */}
          <div className={styles.buttonContainer}>
            <button className={`${styles.tabButton} ${selectedCalendar === "calendar1" ? styles.active : ""}`} onClick={() => setSelectedCalendar("calendar1")}>
              내 캘린더
            </button>
            <button className={`${styles.tabButton} ${selectedCalendar === "calendar2" ? styles.active : ""}`} onClick={() => setSelectedCalendar("calendar2")}>
              팀 캘린더
            </button>
            <button className={`${styles.tabButton} ${selectedCalendar === "calendar3" ? styles.active : ""}`} onClick={() => setSelectedCalendar("calendar3")}>
              전체 캘린더
            </button>
          </div>

          {/* 캘린더 본문 */}
          <div className={styles.mainContent}>
            <div className={styles.calendarContent}>
              {selectedCalendar === "calendar1" && <Calendar1 setSelectedEvent={setSelectedEvent} setModalOpen={setModalOpen} events={events} setEvents={setEvents} />}
              {selectedCalendar === "calendar2" && <Calendar2 setSelectedEvent={setSelectedEvent} setModalOpen={setModalOpen} events={teamEvents} setEvents={setTeamEvents} />}
              {selectedCalendar === "calendar3" && <Calendar3 meetingRoomEvents={meetingRoomEvents} setMeetingRoomEvents={setMeetingRoomEvents} />}
            </div>

            {/* ✅ 기존 코드 유지: 일정 추가 버튼 + 미니 캘린더 + 메모 영역 */}
            <div className={styles.rightSection}>
              <button className={styles.addEventButton} onClick={() => { setSelectedEvent(null); setModalOpen(true); }}>
                + 일정 추가
              </button>

              {/* ✅ 미니 캘린더 유지 */}
              <div className={styles.miniCalendar}>
                <Calendar4 />
              </div>

              {/* ✅ Memo 수정 가능하게 유지 */}
              <div className={styles.memoSection}>
                <h3>📌 Memo</h3>
                {isEditing ? (
                  <textarea
                    className={styles.memoInput}
                    value={memoText}
                    onChange={(e) => setMemoText(e.target.value)}
                    onBlur={() => {
                      setIsEditing(false);
                      handleMemoSave();
                    }}
                    autoFocus
                  />
                ) : (
                  <p className={styles.memoContent} onClick={() => setIsEditing(true)}>{memoText}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ 일정 추가/수정 모달 */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        selectedEvent={selectedEvent}
        setEvents={setEvents} // ✅ 내 일정 업데이트
        setTeamEvents={setTeamEvents} // ✅ 팀 일정 업데이트
      />
      
    </div>
  );
};

export default CalendarPage;
