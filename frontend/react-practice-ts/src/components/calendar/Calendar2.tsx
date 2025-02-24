import FullCalendar from "@fullcalendar/react";
import { EventClickArg, EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calendar2.module.css";

// ✅ Props 타입 정의
interface Calendar2Props {
  events: EventInput[];
  setSelectedEvent: (event: EventInput | null) => void;
  setModalOpen: (open: boolean) => void;
}

function Calendar2({ events, setSelectedEvent, setModalOpen }: Calendar2Props) {
  // ✅ 일정 클릭 시 수정 모달 오픈
  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.startStr,
      end: clickInfo.event.endStr || clickInfo.event.startStr,
      description: clickInfo.event.extendedProps.description || "", // ✅ description 추가
      backgroundColor: clickInfo.event.backgroundColor,
      type: clickInfo.event.extendedProps.type || "팀 일정", // ✅ 수정: 기존 일정의 유형 유지 (기본값: 팀 일정)
    });
    setModalOpen(true);
  };

  return (
    <div className={styles.calendarContainer}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        events={events}
        eventClick={handleEventClick}
        locales={allLocales}
        locale="ko"
        firstDay={0}
        headerToolbar={{ left: "prev,next", center: "title", right: "today" }}
        height="auto"
      />
    </div>
  );
}

export default Calendar2;
