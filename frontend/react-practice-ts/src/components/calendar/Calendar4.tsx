import { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calendar4.module.css"; // ✅ module.css 불러오기

function Calendar4() {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [calendarTitle, setCalendarTitle] = useState("");

  return (
    <div className={styles.miniCalendar1}>
      {/* ✅ 툴바 */}
      <div className={styles.customToolbar}>
        <button
          className={styles.toolbarButton}
          onClick={() => {
            if (calendarRef.current) {
              const calendarApi = calendarRef.current.getApi?.();
              if (calendarApi) {
                calendarApi.prev();
                setCalendarTitle(calendarApi.view.title);
              }
            }
          }}
        >
          &lt;
        </button>
        <h3 className={styles.customTitle}>{calendarTitle}</h3>
        <button
          className={styles.toolbarButton}
          onClick={() => {
            if (calendarRef.current) {
              const calendarApi = calendarRef.current.getApi?.();
              if (calendarApi) {
                calendarApi.next();
                setCalendarTitle(calendarApi.view.title);
              }
            }
          }}
        >
          &gt;
        </button>
        <button
          className={styles.todayButton}
          onClick={() => {
            if (calendarRef.current) {
              const calendarApi = calendarRef.current.getApi?.();
              if (calendarApi) {
                calendarApi.today();
                setCalendarTitle(calendarApi.view.title);
              }
            }
          }}
        >
          오늘
        </button>
      </div>

      {/* ✅ 캘린더 */}
      <div className={styles.calendarWrapper}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locales={allLocales}
          locale="ko"
          firstDay={0}
          headerToolbar={{ left: "", center: "", right: "" }} // ✅ 기본 툴바 제거
          buttonText={{ today: "오늘" }}
          titleFormat={{ year: "numeric", month: "short" }}
          height={250} // ✅ 높이 고정 (🔥 수정)
          contentHeight={200} // ✅ 내부 높이 고정 (🔥 수정)
          dayMaxEventRows={true}
          stickyHeaderDates={true}
          datesSet={(info) => setCalendarTitle(info.view.title)} // ✅ 제목 자동 업데이트
          dayCellContent={(info) => (
            <span style={{ display: "block", fontSize: "9px", textAlign: "center" }}>
              {info.dayNumberText}
            </span>
          )}
        />
      </div>
    </div>
  );
}

export default Calendar4;
