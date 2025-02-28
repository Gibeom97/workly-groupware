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
  const [events, setEvents] = useState<EventInput[]>([]);
  const [teamEvents, setTeamEvents] = useState<EventInput[]>([]);
  const [meetingRoomEvents, setMeetingRoomEvents] = useState<EventInput[]>([]);
  const [memoText, setMemoText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  
  // ✅ Redux에서 로그인한 사용자 정보 가져오기
  const user = useSelector((state) => state.user);
  const userNo = user?.userNo; // 현재 로그인한 사용자 번호
  const deptNo = user?.deptNo; // 현재 로그인한 사용자의 부서 번호

  console.log("📌 Redux에서 가져온 user 정보:", user); // 🛠 로그 추가

  // ✅ 백엔드에서 내 일정 & 팀 일정 불러오기
  useEffect(() => {
    if (userNo) {
      axios
        .get(`http://localhost:8003/workly/schedule/user/${userNo}`)
        .then((response) => setEvents(response.data))
        .catch((error) => console.error("내 일정 불러오기 오류:", error));
    }

    if (deptNo) {
      axios
        .get(`http://localhost:8003/workly/schedule/team/${deptNo}`)
        .then((response) => setTeamEvents(response.data))
        .catch((error) => console.error("팀 일정 불러오기 오류:", error));
    }
  }, [userNo, deptNo]);

  // ✅ 일정 추가 (POST 요청)
  const handleSaveEvent = async (newEvent: EventInput, type: string) => {
    try {
      console.log("📌 [Calendar.tsx] 일정 추가 요청 데이터:", newEvent);
      
      const response = await axios.post("http://localhost:8003/workly/schedule/add", newEvent);
      console.log("일정 추가 성공:", response.data);

      if (type === "내 일정") {
        setEvents([...events, response.data]);
      } else {
        setTeamEvents([...teamEvents, response.data]);
      }
      setModalOpen(false);
    } catch (error) {
      console.error("일정 추가 중 오류 발생:", error);
    }
  };

  // ✅ 일정 삭제 (DELETE 요청)
  const handleDeleteEvent = async (eventId: string) => {
    try {
      await axios.delete(`http://localhost:8003/workly/schedule/delete/${eventId}`);
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
      setTeamEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
      setModalOpen(false);
      console.log("일정 삭제 성공");
    } catch (error) {
      console.error("일정 삭제 중 오류 발생:", error);
    }
  };

  // ✅ 백엔드에서 메모 불러오기
  useEffect(() => {
    if (userNo) {
      axios
        .get(`http://localhost:8003/workly/memo/${userNo}`)
        .then((response) => setMemoText(response.data.memoText))
        .catch((error) => console.error("메모 불러오기 오류:", error));
    }
  }, [userNo]);

  // ✅ 메모 저장 함수 (수정 + 저장)
  const handleMemoSave = () => {
    if (!userNo) return;

    axios
      .put(`http://localhost:8003/workly/memo/${userNo}`, { memoText })
      .then(() => console.log("메모 저장 성공"))
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
              {selectedCalendar === "calendar1" && <Calendar1 events={events} setSelectedEvent={setSelectedEvent} setModalOpen={setModalOpen} />}
              {selectedCalendar === "calendar2" && <Calendar2 events={teamEvents} setSelectedEvent={setSelectedEvent} setModalOpen={setModalOpen} />}
              {selectedCalendar === "calendar3" && <Calendar3 meetingRoomEvents={meetingRoomEvents} setMeetingRoomEvents={setMeetingRoomEvents} />}
            </div>

            {/* ✅ 기존 코드 유지: 일정 추가 버튼 + 미니 캘린더 + 메모 영역 */}
            <div className={styles.rightSection}>
              <button className={styles.addEventButton} onClick={() => { setSelectedEvent(null); setModalOpen(true); }}>
                + 일정 추가
              </button>

              {/* 미니 캘린더 */}
              <div className={styles.miniCalendar}>
                <Calendar4 />
              </div>

              {/* ✅ Memo 수정 가능하게 유지 */}
              <div className={styles.memoSection}>
                <h3>📌 Memo</h3>
                {isEditing ? (
                  <textarea className={styles.memoInput} value={memoText} onChange={(e) => setMemoText(e.target.value)} onBlur={() => { setIsEditing(false); handleMemoSave(); }} autoFocus />
                ) : (
                  <p className={styles.memoContent} onClick={() => setIsEditing(true)}>{memoText}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ 일정 추가/수정 모달 */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onSave={handleSaveEvent} onDelete={handleDeleteEvent} selectedEvent={selectedEvent} />
    </div>
  );
};

export default CalendarPage;