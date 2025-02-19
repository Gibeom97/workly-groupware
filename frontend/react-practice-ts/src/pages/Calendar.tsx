import { useState } from "react";
import Calendar1 from "../components/calendar/Calendar1";
import Calendar2 from "../components/calendar/Calendar2";
import Calendar3 from "../components/calendar/Calendar3";
import Calendar4 from "../components/calendar/Calendar4"; 
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import Modal from "../components/calendar/Modal"; // ✅ 수정된 경로
import styles from "./Calendar.module.css";

const CalendarPage = () => {
  const [selectedCalendar, setSelectedCalendar] = useState("calendar1");

  // ✅ 모달 상태
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // ✅ Memo 입력 및 수정 기능 유지
  const [memoText, setMemoText] = useState("회의 때 팀원들에게 전달사항 잊지말고 전달하기\n휴가 11,12,13에 쓰기");
  const [isEditing, setIsEditing] = useState(false);

  // ✅ 메모 편집 핸들러
  const handleMemoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemoText(event.target.value);
  };
  const toggleEditMemo = () => {
    setIsEditing(true);
  };
  const handleMemoBlur = () => {
    setIsEditing(false);
  };

  // ✅ 일정 추가 핸들러 (모달 열기)
  const handleAddEvent = () => {
    setSelectedEvent(null);
    setModalOpen(true);
  };

  // ✅ 일정 저장 핸들러 (Calendar1 또는 Calendar2에 추가)
  const handleSaveEvent = (newEvent: any, type: string) => {
    if (newEvent) {
      if (type === "내 일정") {
        window.dispatchEvent(new CustomEvent("addEventToCalendar1", { detail: newEvent }));
      } else {
        window.dispatchEvent(new CustomEvent("addEventToCalendar2", { detail: newEvent }));
      }
    }
    setModalOpen(false);
  };

  // ✅ 일정 수정/삭제 모달 열기
  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  // ✅ 일정 삭제
  const handleDeleteEvent = (eventId: string) => {
    window.dispatchEvent(new CustomEvent("deleteEvent", { detail: eventId }));
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
              {selectedCalendar === "calendar1" && <Calendar1 onEventClick={handleEventClick} />}
              {selectedCalendar === "calendar2" && <Calendar2 onEventClick={handleEventClick} />}
              {selectedCalendar === "calendar3" && <Calendar3 />}
            </div>

            {/* 우측 섹션: 일정 추가 버튼 & 미니 캘린더 & 메모 */}
            <div className={styles.rightSection}>
              <button className={styles.addEventButton} onClick={handleAddEvent}>+ 일정 추가</button>

              {/* 미니 캘린더 */}
              <div className={styles.miniCalendar}>
                <Calendar4 />
              </div>

              {/* ✅ Memo 수정 가능하게 변경 */}
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
