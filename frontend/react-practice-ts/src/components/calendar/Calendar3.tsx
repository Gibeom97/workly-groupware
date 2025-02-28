import { useState, useEffect, useRef } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import { EventInput, EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calendar3.module.css";
import Modal1 from "../calendar/Modal1";

// ✅ Props 타입 정의
interface Calendar3Props {
  meetingRoomEvents: EventInput[];
  setMeetingRoomEvents: React.Dispatch<React.SetStateAction<EventInput[]>>;
}

const Calendar3: React.FC<Calendar3Props> = ({ meetingRoomEvents, setMeetingRoomEvents }) => {
  const [isMeetingRoomModalOpen, setMeetingRoomModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);
  const calendarRef = useRef<FullCalendar | null>(null);
  const [calendarTitle, setCalendarTitle] = useState("");

  // ✅ 회의실 예약 데이터 불러오기 (기존 기능 유지)
  useEffect(() => {
    axios
      .get("http://localhost:8003/workly/meeting-reservation")
      .then((response) => setMeetingRoomEvents(response.data))
      .catch((error) => console.error("회의실 예약 데이터 불러오기 오류:", error));
  }, [setMeetingRoomEvents]);

  // ✅ 회의실 예약 추가 (기존 기능 유지)
  const handleSaveMeeting = async (newMeeting: EventInput) => {
    try {
      const response = await axios.post("http://localhost:8003/workly/meeting/add", newMeeting);
      setMeetingRoomEvents((prevEvents) => [...prevEvents, response.data]);
      setMeetingRoomModalOpen(false);
    } catch (error) {
      console.error("회의실 예약 저장 오류:", error);
    }
  };

  // ✅ 회의실 예약 수정 (기존 기능 유지)
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

  // ✅ 회의실 예약 삭제 (기존 기능 유지)
  const handleDeleteMeeting = async (eventId: string) => {
    try {
      await axios.delete(`http://localhost:8003/workly/meeting/delete/${eventId}`);
      setMeetingRoomEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("회의실 예약 삭제 오류:", error);
    }
  };

  // ✅ 일정 클릭 시 수정 모달 오픈 (기존 기능 유지)
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

  // ✅ 이전(<) 버튼
  const handlePrev = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi?.();
      if (calendarApi) {
        calendarApi.prev();
        setCalendarTitle(calendarApi.view.title);
      }
    }
  };

  // ✅ 다음(>) 버튼
  const handleNext = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi?.();
      if (calendarApi) {
        calendarApi.next();
        setCalendarTitle(calendarApi.view.title);
      }
    }
  };

  // ✅ 오늘 버튼
  const handleToday = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi?.();
      if (calendarApi) {
        calendarApi.today();
        setCalendarTitle(calendarApi.view.title);
      }
    }
  };

  // ✅ 회의실 예약 버튼 클릭 시 모달 열기
  const handleMeetingRoomOpen = () => {
    setMeetingRoomModalOpen(true);
  };

  return (
    <div className={styles.calendarContainer}>
      {/* ✅ 커스텀 툴바 */}
      <div className={styles.customToolbar}>
        <button className={styles.toolbarButton} onClick={handlePrev}>&lt;</button>
        <h3 className={styles.customTitle}>{calendarTitle}</h3>        
        <button className={styles.meetingRoomButton} onClick={handleMeetingRoomOpen}>회의실 예약</button>
        <button className={styles.toolbarButton} onClick={handleNext}>&gt;</button>
        <button className={styles.todayButton} onClick={handleToday}>오늘</button>
      </div>

      {/* ✅ FullCalendar */}
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        events={meetingRoomEvents}
        eventClick={handleEventClick}
        locales={allLocales}
        locale="ko"
        firstDay={0}
        height="auto"
        headerToolbar={{ left: "", center: "", right: "" }} // ✅ 기본 툴바 제거
        datesSet={(info) => setCalendarTitle(info.view.title)}
      />

      {/* ✅ 회의실 예약 모달 */}
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
