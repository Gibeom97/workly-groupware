import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import { EventInput, EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calendar3.module.css";
import Modal1 from "../calendar/Modal1";

interface Calendar3Props {
  meetingRoomEvents: EventInput[];
  setMeetingRoomEvents: React.Dispatch<React.SetStateAction<EventInput[]>>;
}

const Calendar3: React.FC<Calendar3Props> = ({ meetingRoomEvents, setMeetingRoomEvents }) => {
  const [isMeetingRoomModalOpen, setMeetingRoomModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);
  const calendarRef = useRef<FullCalendar | null>(null);
  const [calendarTitle, setCalendarTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태 추가

  // 회의실 예약 데이터 불러오기
  useEffect(() => {
    axios
      .get("http://localhost:8003/workly/meeting-reservation")
      .then((response) => {
        const formattedEvents = response.data.map((event: any) => ({
          id: event.mrResNo?.toString(),
          title: event.mrResTitle,
          start: event.startTime,
          end: event.endTime || event.startTime,
          description: event.reason || "",
          backgroundColor: event.backgroundColor || "#FF6B6B", // 기본 색상 추가
          meetingRoomId: event.mrNo,
        }));
        setMeetingRoomEvents(formattedEvents); // 캘린더에 이벤트 상태 반영
      })
      .catch((error) => console.error("🚨 회의실 예약 데이터 불러오기 오류:", error));
  }, [meetingRoomEvents]);

  // 회의실 예약 추가
  const handleSaveMeeting = async (newMeeting: EventInput) => {
    try {
      await axios.post("http://localhost:8003/workly/meeting-reservation/add", newMeeting);
      setMeetingRoomEvents((prevEvents) => [...prevEvents, newMeeting]); // 새 예약 추가
  
      // 캘린더 UI 갱신
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.refetchEvents(); // 새로 추가된 예약을 반영
      }
  
      setMeetingRoomModalOpen(false);
      setErrorMessage(""); // 오류 메시지 초기화
    } catch (error: any) {
      // 오류가 400번일 경우 중복 예약 메시지를 표시
      if (error.response && error.response.status === 400) {
        // 서버에서 반환된 메시지 사용
        window.alert(error.response.data); // 오류 메시지를 알림창으로 띄움
      } else {
        console.error("🚨 회의실 예약 저장 오류:", error);
        setErrorMessage("회의실 예약을 저장하는 도중 오류가 발생했습니다.");
        window.alert(error.response.data);
      }
    }
  };
  

  // 회의실 예약 수정
  const handleUpdateMeeting = async (updatedMeeting: EventInput) => {
    try {
      await axios.put(`http://localhost:8003/workly/meeting-reservation/update/${updatedMeeting.id}`, updatedMeeting);

      // 상태 업데이트
      setMeetingRoomEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === updatedMeeting.id ? updatedMeeting : event)) // 예약 수정
      );

      // 캘린더 UI 갱신
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.refetchEvents(); // 수정된 예약을 반영
      }

      setMeetingRoomModalOpen(false);
      setErrorMessage(""); // 오류 메시지 초기화
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        // 중복 예약인 경우
        window.alert("해당 시간대에는 이미 예약된 회의실이 있습니다."); // 알림 창 띄우기
      } else {
        window.alert(error.response.data); 
        setErrorMessage("회의실 예약을 수정하는 도중 오류가 발생했습니다.");
      }
    }
  };

  // 회의실 예약 삭제
  const handleDeleteMeeting = async (eventId: string) => {
    try {
      await axios.delete(`http://localhost:8003/workly/meeting-reservation/delete/${eventId}`);
      setMeetingRoomEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));

      // 캘린더 UI 갱신
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.refetchEvents(); // 삭제된 예약을 반영
      }
    } catch (error) {
      console.error("🚨 회의실 예약 삭제 오류:", error);
    }
  };

  // 일정 클릭 시 수정 모달 오픈
  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.startStr,
      end: clickInfo.event.endStr || clickInfo.event.startStr,
      description: clickInfo.event.extendedProps.description || "",
      backgroundColor: clickInfo.event.backgroundColor, // 색상 포함
      meetingRoomId: clickInfo.event.extendedProps.meetingRoomId || "",
    });
    setMeetingRoomModalOpen(true);
  };

  const handlePrev = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev();
      setCalendarTitle(calendarApi.view.title);
    }
  };

  const handleNext = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next();
      setCalendarTitle(calendarApi.view.title);
    }
  };

  const handleToday = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.today();
      setCalendarTitle(calendarApi.view.title);
    }
  };

  const handleDatesSet = (info: any) => {
    setCalendarTitle(info.view.title);
  };

  return (
    <div className={styles.calendarContainer}>
      {/* 커스텀 툴바 */}
      <div className={styles.customToolbar}>
        <button className={styles.toolbarButton} onClick={handlePrev}>
          &lt;
        </button>
        <h3 className={styles.customTitle}>{calendarTitle}</h3>
        <button className={styles.toolbarButton} onClick={handleNext}>
          &gt;
        </button>
        <button className={styles.todayButton} onClick={handleToday}>
          오늘
        </button>
      </div>

      {/* FullCalendar */}
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
        headerToolbar={{ left: "", center: "", right: "" }}
        datesSet={handleDatesSet}
      />

      {/* 회의실 예약 모달 */}
      <Modal1
        isOpen={isMeetingRoomModalOpen}
        onClose={() => setMeetingRoomModalOpen(false)}
        onSave={selectedEvent ? handleUpdateMeeting : handleSaveMeeting}
        onDelete={handleDeleteMeeting}
        selectedEvent={selectedEvent}
      />

      {/* 오류 메시지 */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default Calendar3;
