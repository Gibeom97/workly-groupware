import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // ✅ Redux에서 로그인 정보 가져오기
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import { EventClickArg, EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calendar2.module.css";

interface Calendar2Props {
  events: EventInput[];
  setSelectedEvent: (event: EventInput | null) => void;
  setModalOpen: (open: boolean) => void;
}

function Calendar2({ events, setSelectedEvent, setModalOpen }: Calendar2Props) {
  const [calendarEvents, setCalendarEvents] = useState<EventInput[]>(events);

  // ✅ Redux에서 로그인한 사용자 정보 가져오기
  const user = useSelector((state) => state.user);
  const deptNo = user?.deptNo; // 현재 로그인한 사용자의 부서 번호

  // ✅ 팀 일정 데이터 가져오기 (GET 요청)
  useEffect(() => {
    if (deptNo) {
      axios
        .get(`http://localhost:8003/workly/schedule/team/${deptNo}`)
        .then((response) => setCalendarEvents(response.data))
        .catch((error) => console.error("팀 일정 불러오기 오류:", error));
    }
  }, [deptNo]);

  // ✅ 일정 클릭 시 수정 모달 오픈
  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.startStr,
      end: clickInfo.event.endStr || clickInfo.event.startStr,
      description: clickInfo.event.extendedProps.description || "", // ✅ description 추가
      backgroundColor: clickInfo.event.backgroundColor,
      type: clickInfo.event.extendedProps.type || "팀 일정", // ✅ 기존 일정 유형 유지 (기본값: 팀 일정)
    });
    setModalOpen(true);
  };

  return (
    <div className={styles.calendarContainer}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        events={calendarEvents}
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
