import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { EventInput, EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calendar3.module.css";
import Modal1 from "../calendar/Modal1"; // ✅ Modal1 import

// ✅ Props 타입 정의 (전역 상태 전달 받음)
interface Calendar3Props {
  meetingRoomEvents: EventInput[];
  setMeetingRoomEvents: (newEvent: EventInput) => void;
}

function Calendar3({ meetingRoomEvents, setMeetingRoomEvents }: Calendar3Props) {
  const [isMeetingRoomModalOpen, setMeetingRoomModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);

  // ✅ 일정 클릭 시 수정 모달 오픈
  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.startStr,
      end: clickInfo.event.endStr || clickInfo.event.startStr,
      description: clickInfo.event.extendedProps.description || "",
      backgroundColor: clickInfo.event.backgroundColor,
    });
    setMeetingRoomModalOpen(true);
  };

  // ✅ 회의실 예약 저장 핸들러
  const handleSaveMeeting = (newMeeting: EventInput) => {
    setMeetingRoomEvents(newMeeting); // ✅ 전역 상태 업데이트
    setMeetingRoomModalOpen(false);
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.toolbar}>
        <button
          className={styles.meetingRoomButton}
          onClick={() => {
            setSelectedEvent(null);
            setMeetingRoomModalOpen(true);
          }}
        >
          회의실 예약
        </button>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        events={meetingRoomEvents} // ✅ 전역 상태에서 가져온 회의실 예약 데이터 사용
        eventClick={handleEventClick}
        locales={allLocales}
        locale="ko"
        firstDay={0}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "today",
        }}
        height="auto"
      />

      <Modal1 isOpen={isMeetingRoomModalOpen} onClose={() => setMeetingRoomModalOpen(false)} onSave={handleSaveMeeting} selectedEvent={selectedEvent} />
    </div>
  );
}

export default Calendar3;
