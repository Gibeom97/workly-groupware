import { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import { EventInput, EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calendar3.module.css";
import Modal1 from "../calendar/Modal1";

// ✅ Props 타입 정의 추가
interface Calendar3Props {
  meetingRoomEvents: EventInput[];
  setMeetingRoomEvents: React.Dispatch<React.SetStateAction<EventInput[]>>;
}

// ✅ Props를 받아오도록 변경
const Calendar3: React.FC<Calendar3Props> = ({ meetingRoomEvents, setMeetingRoomEvents }) => {
  const [isMeetingRoomModalOpen, setMeetingRoomModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);

  // ✅ 회의실 예약 데이터 불러오기
  useEffect(() => {
    axios
      .get("http://localhost:8003/workly/meeting-reservation")
      .then((response) => setMeetingRoomEvents(response.data))
      .catch((error) => console.error("회의실 예약 데이터 불러오기 오류:", error));
  }, [setMeetingRoomEvents]);

  // ✅ 회의실 예약 추가 (POST 요청)
  const handleSaveMeeting = async (newMeeting: EventInput) => {
    try {
      const response = await axios.post("http://localhost:8003/workly/meeting/add", newMeeting);
      setMeetingRoomEvents((prevEvents) => [...prevEvents, response.data]); // 서버 응답 데이터 반영
      setMeetingRoomModalOpen(false);
    } catch (error) {
      console.error("회의실 예약 저장 오류:", error);
    }
  };

  // ✅ 회의실 예약 수정 (PUT 요청)
  const handleUpdateMeeting = async (updatedMeeting: EventInput) => {
    try {
      await axios.put(`http://localhost:8003/workly/meeting/update/${updatedMeeting.id}`, updatedMeeting);
      setMeetingRoomEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === updatedMeeting.id ? updatedMeeting : event))
      );
      setMeetingRoomModalOpen(false);
    } catch (error) {
      console.error("회의실 예약 수정 오류:", error);
    }
  };

  // ✅ 회의실 예약 삭제 (DELETE 요청)
  const handleDeleteMeeting = async (eventId: string) => {
    try {
      await axios.delete(`http://localhost:8003/workly/meeting/delete/${eventId}`);
      setMeetingRoomEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("회의실 예약 삭제 오류:", error);
    }
  };

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

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.toolbar}>
        <button className={styles.meetingRoomButton} onClick={() => { setSelectedEvent(null); setMeetingRoomModalOpen(true); }}>
          회의실 예약
        </button>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        events={meetingRoomEvents}
        eventClick={handleEventClick}
        locales={allLocales}
        locale="ko"
        firstDay={0}
        height="auto"
      />

      <Modal1 
        isOpen={isMeetingRoomModalOpen} 
        onClose={() => setMeetingRoomModalOpen(false)} 
        onSave={selectedEvent ? handleUpdateMeeting : handleSaveMeeting}
        onDelete={handleDeleteMeeting}
        selectedEvent={selectedEvent}
      />
    </div>
  );
};

export default Calendar3;
