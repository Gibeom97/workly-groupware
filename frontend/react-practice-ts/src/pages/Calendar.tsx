import { useState } from "react";
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

  // ✅ 일정 관련 상태 (내 일정, 팀 일정)
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);
  const [events, setEvents] = useState<EventInput[]>([]);
  const [teamEvents, setTeamEvents] = useState<EventInput[]>([]);

  // ✅ 회의실 예약 관련 상태 (전역으로 관리)
  const [meetingRoomEvents, setMeetingRoomEvents] = useState<EventInput[]>([]);

  // ✅ 메모 관련 상태
  const [memoText, setMemoText] = useState("회의 때 팀원들에게 전달사항 잊지말고 전달하기\n휴가 11,12,13에 쓰기");
  const [isEditing, setIsEditing] = useState(false);

  // ✅ 메모 입력 핸들러
  const handleMemoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemoText(event.target.value);
  };
  const toggleEditMemo = () => {
    setIsEditing(true);
  };
  const handleMemoBlur = () => {
    setIsEditing(false);
  };

  // ✅ 일정 추가/수정 핸들러
  const handleSaveEvent = (newEvent: EventInput, type: string) => {
    if (type === "내 일정") {
      setEvents((prevEvents) =>
        prevEvents.some((event) => event.id === newEvent.id)
          ? prevEvents.map((event) => (event.id === newEvent.id ? newEvent : event)) // 기존 일정 수정
          : [...prevEvents, newEvent] // 새로운 일정 추가
      );
    } else {
      setTeamEvents((prevEvents) =>
        prevEvents.some((event) => event.id === newEvent.id)
          ? prevEvents.map((event) => (event.id === newEvent.id ? newEvent : event)) // 기존 일정 수정
          : [...prevEvents, newEvent] // 새로운 일정 추가
      );
    }
    setModalOpen(false);
  };

  // ✅ 회의실 예약 저장 핸들러 (전역 상태 업데이트)
  const handleSaveMeeting = (newMeeting: EventInput) => {
    setMeetingRoomEvents((prevEvents) =>
      prevEvents.some((event) => event.id === newMeeting.id)
        ? prevEvents.map((event) => (event.id === newMeeting.id ? newMeeting : event)) // 기존 회의실 일정 수정
        : [...prevEvents, newMeeting] // 새로운 회의실 일정 추가
    );
  };

  // ✅ 일정 삭제 핸들러 (내 일정 & 팀 일정)
  const handleDeleteEvent = (eventId: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    setTeamEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    setModalOpen(false);
  };

  return (
    <div className={styles.mainpageContainer}>
      {/* 사이드바 */}
      <Sidebar />

      <div className={styles.componentContainer}>
        {/* 헤더 */}
        <Header />

        {/* 캘린더 전체 영역 컨테이너 */}
        <div className={styles.calendarPageContainer}>

          {/* 캘린더 전환 버튼 */}
          <div className={styles.buttonContainer}>
            <button
              className={`${styles.tabButton} ${selectedCalendar === "calendar1" ? styles.active : ""}`}
              onClick={() => setSelectedCalendar("calendar1")}
            >
              내 캘린더
            </button>
            <button
              className={`${styles.tabButton} ${selectedCalendar === "calendar2" ? styles.active : ""}`}
              onClick={() => setSelectedCalendar("calendar2")}
            >
              팀 캘린더
            </button>
            <button
              className={`${styles.tabButton} ${selectedCalendar === "calendar3" ? styles.active : ""}`}
              onClick={() => setSelectedCalendar("calendar3")}
            >
              전체 캘린더
            </button>
          </div>

          {/* 캘린더 본문 및 일정 추가 버튼 + 미니 캘린더 + 메모 영역 */}
          <div className={styles.mainContent}>
            {/* 캘린더 본문 */}
            <div className={styles.calendarContent}>
              {selectedCalendar === "calendar1" && (
                <Calendar1 
                  events={events}  
                  setSelectedEvent={setSelectedEvent}
                  setModalOpen={setModalOpen}
                />
              )}
              {selectedCalendar === "calendar2" && (
                <Calendar2 
                  events={teamEvents}  // ✅ 팀 일정 이벤트 적용
                  setSelectedEvent={setSelectedEvent}
                  setModalOpen={setModalOpen}
                />
              )}
              {selectedCalendar === "calendar3" && (
                <Calendar3 
                  meetingRoomEvents={meetingRoomEvents}  // ✅ 회의실 일정 유지
                  setMeetingRoomEvents={handleSaveMeeting} 
                />
              )}
            </div>

            {/* ✅ 기존 코드 유지: 우측 일정 추가 버튼 + 미니 캘린더 + 메모 영역 */}
            <div className={styles.rightSection}>
              <button
                className={styles.addEventButton}
                onClick={() => {
                  setSelectedEvent(null); // ✅ 기존 선택된 일정 초기화
                  setModalOpen(true);
                }}
              >
                + 일정 추가
              </button>

              {/* 미니 캘린더 */}
              <div className={styles.miniCalendar}>
                <Calendar4 />
              </div>

              {/* ✅ Memo 수정 가능하게 복원 */}
              <div className={styles.memoSection}>
                <h3>📌 Memo</h3>
                {isEditing ? (
                  <textarea
                    className={styles.memoInput}
                    value={memoText}
                    onChange={handleMemoChange}
                    onBlur={handleMemoBlur}
                    autoFocus
                  />
                ) : (
                  <p className={styles.memoContent} onClick={toggleEditMemo}>
                    {memoText}
                  </p>
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
        onSave={handleSaveEvent}  
        onDelete={handleDeleteEvent} 
        selectedEvent={selectedEvent}
      />
    </div>
  );
};

export default CalendarPage;
