import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { EventClickArg, EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calendar1.module.css"; // ✅ module.css 객체로 불러오기

// ✅ 초기 일정 데이터
const INITIAL_EVENTS: EventInput[] = [
  {
    id: "1",
    title: "회의",
    start: "2025-02-18",
    backgroundColor: "#FF0000", // 빨강
    borderColor: "#FF0000",
  },
];

// ✅ Props 타입 정의
interface Calendar1Props {
  onEventClick?: (event: EventClickArg) => void; // ✅ 기본값 설정
}

function Calendar1({ onEventClick = () => {} }: Calendar1Props) {
  const [events, setEvents] = useState<EventInput[]>(INITIAL_EVENTS);

  // ✅ 일정 추가/삭제 이벤트 리스너
  useEffect(() => {
    const handleAddEvent = (event: CustomEvent<EventInput>) => {
      setEvents((prevEvents) => [...prevEvents, event.detail]);
    };

    const handleDeleteEvent = (event: CustomEvent<{ id: string }>) => {
      setEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.detail.id));
    };

    window.addEventListener("addEventToCalendar1", handleAddEvent as EventListener);
    window.addEventListener("deleteEvent", handleDeleteEvent as EventListener);

    return () => {
      window.removeEventListener("addEventToCalendar1", handleAddEvent as EventListener);
      window.removeEventListener("deleteEvent", handleDeleteEvent as EventListener);
    };
  }, []);

  return (
    <div className={styles.calendarContainer}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        events={events}
        eventClick={(info) => onEventClick(info)}
        locales={allLocales}
        locale="ko"
        firstDay={1} // ✅ 월요일부터 시작
        headerToolbar={{ left: "prev,next", center: "title", right: "today" }}
        height="auto"
      />
    </div>
  );
}

export default Calendar1;
