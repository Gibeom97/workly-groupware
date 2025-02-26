import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // ✅ Redux에서 로그인 정보 가져오기
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import { EventClickArg, EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calendar1.module.css";

interface Calendar1Props {
  events: EventInput[];
  setSelectedEvent: (event: EventInput | null) => void;
  setModalOpen: (open: boolean) => void;
}

function Calendar1({ events, setSelectedEvent, setModalOpen }: Calendar1Props) {
  const [calendarEvents, setCalendarEvents] = useState<EventInput[]>(events);

  // ✅ Redux에서 로그인한 사용자 정보 가져오기
  const user = useSelector((state) => state.user);
  const userNo = user?.userNo; // 현재 로그인한 사용자 번호

  // ✅ 내 일정 데이터 가져오기 (GET 요청)
  useEffect(() => {
    if (userNo) {
      axios
        .get(`http://localhost:8003/workly/schedule/user/${userNo}`)
        .then((response) => {
          console.log("📌 백엔드에서 가져온 일정 데이터:", response.data);
          setCalendarEvents(response.data);
        })
        .catch((error) => console.error("내 일정 불러오기 오류:", error));
    }
  }, [userNo]);
  

  // ✅ 일정 클릭 시 수정 모달 오픈
  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.startStr,
      end: clickInfo.event.endStr || clickInfo.event.startStr,
      description: clickInfo.event.extendedProps.description || "", // ✅ description 추가
      backgroundColor: clickInfo.event.backgroundColor,
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

export default Calendar1;
