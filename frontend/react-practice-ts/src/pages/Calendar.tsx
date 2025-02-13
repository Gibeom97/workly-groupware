import { useState } from "react";
import Calendar1 from "../components/calendar/Calendar1";
import Calendar2 from "../components/calendar/Calendar2";
import Calendar3 from "../components/calendar/Calendar3";
import Calendar4 from "../components/calendar/Calendar4";  {/* Calendar4 추가 */}
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import styles from "./Calendar.module.css";

const CalendarPage = () => {
  const [selectedCalendar, setSelectedCalendar] = useState("calendar1");

  // ✅ Memo 입력 및 수정 기능 추가
  const [memoText, setMemoText] = useState("회의 때 팀원들에게 전달사항 잊지말고 전달하기\n휴가 11,12,13에 쓰기");
  const [isEditing, setIsEditing] = useState(false);

  // ✅ 메모 입력 핸들러
  const handleMemoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemoText(event.target.value);
  };

  // ✅ 메모 클릭 시 편집 모드로 변경
  const toggleEditMemo = () => {
    setIsEditing(true);
  };

  // ✅ 메모 편집 후 저장
  const handleMemoBlur = () => {
    setIsEditing(false);
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

          {/* 캘린더 전환 버튼 (Calendar4 제외) */}
          <div className={styles.buttonContainer}>
            <button
              className={`${styles.tabButton} ${
                selectedCalendar === "calendar1" ? styles.active : ""
              }`}
              onClick={() => setSelectedCalendar("calendar1")}
            >
              내 캘린더
            </button>
            <button
              className={`${styles.tabButton} ${
                selectedCalendar === "calendar2" ? styles.active : ""
              }`}
              onClick={() => setSelectedCalendar("calendar2")}
            >
              팀 캘린더
            </button>
            <button
              className={`${styles.tabButton} ${
                selectedCalendar === "calendar3" ? styles.active : ""
              }`}
              onClick={() => setSelectedCalendar("calendar3")}
            >
              전체 캘린더
            </button>
          </div>

          {/* 캘린더 본문 및 일정 추가 버튼 + 미니 캘린더 + 메모 영역 */}
          <div className={styles.mainContent}>
            {/* 캘린더 본문 */}
            <div className={styles.calendarContent}>
              {selectedCalendar === "calendar1" && <Calendar1 />}
              {selectedCalendar === "calendar2" && <Calendar2 />}
              {selectedCalendar === "calendar3" && <Calendar3 />}
            </div>

            {/* 우측 섹션: 일정 추가 버튼 & 미니 캘린더 & 메모 */}
            <div className={styles.rightSection}>
              <button className={styles.addEventButton}>+ 일정 추가</button>

              {/* 미니 캘린더 부분에만 Calendar4 표시 */}
              <div className={styles.miniCalendar}>
                <Calendar4 /> {/* 미니 캘린더 자리에만 Calendar4 표시 */}
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
    </div>
  );
};

export default CalendarPage;
