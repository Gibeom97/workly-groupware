import { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calendar4.module.css"; // ✅ module.css 객체로 불러오기

function Calendar4() {
  // calendarRef 타입을 HTMLDivElement로 지정
  const calendarRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    if (calendarRef.current) {
      const calendarEl = calendarRef.current.querySelector('.fc'); // FullCalendar의 DOM 요소 선택

      if (calendarEl) {
        // FullCalendar의 스타일을 동적으로 변경
        const fcToolbar = calendarEl.querySelector('.fc-toolbar') as HTMLElement;
        if (fcToolbar) {
          fcToolbar.style.fontSize = "12px";
          fcToolbar.style.padding = "5px 10px";
        }

        const fcTitle = calendarEl.querySelector('.fc-toolbar-title') as HTMLElement;
        if (fcTitle) {
          fcTitle.style.fontSize = "14px";
        }

        const fcDayNumbers = calendarEl.querySelectorAll('.fc-daygrid-day-number') as NodeListOf<HTMLElement>;
        fcDayNumbers.forEach((el) => {
          el.style.fontSize = "10px"; // 날짜 텍스트 크기
        });

        const fcEvents = calendarEl.querySelectorAll('.fc-daygrid-event') as NodeListOf<HTMLElement>;
        fcEvents.forEach((el) => {
          el.style.fontSize = "10px"; // 이벤트 텍스트 크기
          el.style.padding = "3px 5px"; // 이벤트 크기
        });

        // 날짜 칸의 세로 크기 조정
        const fcDayCells = calendarEl.querySelectorAll('.fc-daygrid-day') as NodeListOf<HTMLElement>;
        fcDayCells.forEach((cell) => {
          cell.style.height = "15px"; // 날짜 칸 세로 높이 줄이기
        });
      }
    }
  }, []); // 첫 로딩 시 한 번만 실행

  return (
    <div className={styles.miniCalendar1} ref={calendarRef}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locales={allLocales}
        locale="ko"
        firstDay={1} // 월요일부터 시작
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "today",
        }}
        height="100%"  // 높이를 부모 크기에 맞춰 100%로 설정
      />
    </div>
  );
}

export default Calendar4;
