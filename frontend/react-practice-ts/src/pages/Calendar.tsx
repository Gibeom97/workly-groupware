import { useState, useEffect } from "react";
import { useSelector } from "react-redux"; 
import axios from "axios";
import Calendar1 from "../components/calendar/Calendar1";
import Calendar2 from "../components/calendar/Calendar2";
import Calendar3 from "../components/calendar/Calendar3";
import Calendar4 from "../components/calendar/Calendar4";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import Modal from "../components/calendar/Modal"; // 일정 추가 모달
import Modal1 from "../components/calendar/Modal1"; // 회의실 예약 모달
import { EventInput } from "@fullcalendar/core";
import styles from "./Calendar.module.css";
import MeetingRoom from "../components/calendar/MeetingRoom";

const CalendarPage = () => {
  const [selectedCalendar, setSelectedCalendar] = useState("calendar1");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMeetingRoomModalOpen, setMeetingRoomModalOpen] = useState(false); 
  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);
  const [meetingRoomEvents, setMeetingRoomEvents] = useState<EventInput[]>([]); 
  const [memoText, setMemoText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [events, setEvents] = useState<EventInput[]>([]);
  const [teamEvents, setTeamEvents] = useState<EventInput[]>([]);

  const user = useSelector((state: any) => state.user);
  const userNo = user?.userNo;

  useEffect(() => {
    if (userNo) {
      axios
        .get(`http://localhost:8003/workly/memo/${userNo}`)
        .then((response) => {
          setMemoText(response.data.memo);
        })
        .catch((error) => console.error("🚨 메모 조회 오류:", error));
    }
  }, [userNo]);

  const handleMemoSave = () => {
    if (!userNo) return;

    axios
      .put(`http://localhost:8003/workly/memo/update/${userNo}`, { memo: memoText })
      .then((response) => {
        console.log("메모 저장 성공", response.data);
      })
      .catch((error) => console.error("메모 저장 오류:", error));
  };

  // 회의실 예약 모달 열기
  const handleMeetingRoomOpen = () => {
    setSelectedEvent(null); 
    setMeetingRoomModalOpen(true); 
  };

  // 회의실 예약 저장
  const handleSaveMeeting = async (newMeeting: EventInput) => {
    try {
      await axios.post("http://localhost:8003/workly/meeting-reservation/add", newMeeting);
      setMeetingRoomEvents((prevEvents) => [...prevEvents, newMeeting]); // 새 예약 추가
      setMeetingRoomModalOpen(false);
    } catch (error) {
      console.error("🚨 회의실 예약 저장 오류:", error);
    }
  };

  // 회의실 예약 삭제
  const handleDeleteMeeting = async (eventId: string) => {
    try {
      await axios.delete(`http://localhost:8003/workly/meeting-reservation/delete/${eventId}`);
      setMeetingRoomEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
      setMeetingRoomModalOpen(false);
    } catch (error) {
      console.error("🚨 회의실 예약 삭제 오류:", error);
    }
  };

  return (
    <div className={styles.mainpageContainer}>
      <Sidebar />
      <div className={styles.componentContainer}>
        <Header />
        <div className={styles.calendarPageContainer}>
          <div className={styles.buttonContainer}>
            <button
              className={`${styles.tabButton} ${selectedCalendar === "calendar1" ? styles.active : ""}`}
              onClick={() => setSelectedCalendar("calendar1")}
            >
              내 캘린더
            </button>
            <button
              className={`${styles.tabButton} ${selectedCalendar === "calendar2" ? styles.active : ""}`}
              onClick={() => setSelectedCalendar("calendar2")}
            >
              팀 캘린더
            </button>
            <button
              className={`${styles.tabButton} ${selectedCalendar === "calendar3" ? styles.active : ""}`}
              onClick={() => setSelectedCalendar("calendar3")}
            >
              전체 캘린더
            </button>
            <button
              className={`${styles.tabButton} ${selectedCalendar === "meetingroom" ? styles.active : ""}`}
              onClick={() => setSelectedCalendar("meetingroom")}
            >
              회의실 현황판
            </button>
          </div>

          <div className={styles.mainContent}>
            <div className={styles.calendarContent}>
              {selectedCalendar === "calendar1" && (
                <Calendar1 setSelectedEvent={setSelectedEvent} setModalOpen={setModalOpen} events={events} setEvents={setEvents} />
              )}
              {selectedCalendar === "calendar2" && (
                <Calendar2 setSelectedEvent={setSelectedEvent} setModalOpen={setModalOpen} events={teamEvents} setEvents={setTeamEvents} />
              )}
              {selectedCalendar === "calendar3" && (
                <Calendar3
                  meetingRoomEvents={meetingRoomEvents}
                  setMeetingRoomEvents={setMeetingRoomEvents} // 회의실 예약 이벤트 관리
                />
              )}
              {selectedCalendar === "meetingroom" && <MeetingRoom />}
            </div>

            <div className={styles.rightSection}>
              <div className={styles.buttonContainer2}>
              <button
                className={styles.addEventButton}
                onClick={() => {
                  setSelectedEvent(null);
                  setModalOpen(true);
                }}
              >
                + 일정 추가
              </button>

              <button
                className={styles.addEventButton}
                onClick={handleMeetingRoomOpen}
              >
                + 회의실 예약
              </button>
              </div>

              <div className={styles.miniCalendar}>
                <Calendar4 />
              </div>

              <div className={styles.memoSection}>
                <h3>📌 Memo</h3>
                {isEditing ? (
                  <textarea
                    className={styles.memoInput}
                    value={memoText}
                    onChange={(e) => setMemoText(e.target.value)}
                    onBlur={() => {
                      setIsEditing(false);
                      handleMemoSave();
                    }}
                    autoFocus
                  />
                ) : (
                  <p className={styles.memoContent} onClick={() => setIsEditing(true)}>{memoText}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 일정 추가/수정 모달 */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} selectedEvent={selectedEvent} setEvents={setEvents} setTeamEvents={setTeamEvents} />

      {/* 회의실 예약 모달 */}
      <Modal1
        isOpen={isMeetingRoomModalOpen}
        onClose={() => setMeetingRoomModalOpen(false)}
        onSave={handleSaveMeeting}
        onDelete={handleDeleteMeeting}
        selectedEvent={selectedEvent}
        setMeetingRoomEvents={setMeetingRoomEvents} // 캘린더 상태 업데이트
      />
    </div>
  );
};

export default CalendarPage;
