import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import allLocales from "@fullcalendar/core/locales-all";
import styles from "./MeetingRoom.module.css";

// DB에서 내려오는 데이터를 카멜케이스로 가정 (예: mrNo, mrName, capacity)
interface MeetingRoom {
  mrNo: number;
  mrName: string;
  capacity?: number;
}

// DB에서 내려오는 예약 정보도 카멜케이스로 가정 (예: mrResNo, mrResTitle, startTime, endTime, reason, mrStatus, mrResDate)
interface Reservation {
  mrResNo: number;
  mrNo: number;
  userNo: number;
  mrResTitle: string;
  startTime: string;
  endTime: string;
  reason?: string;
  mrStatus?: string;
  mrResDate?: string;
}

const MeetingRoom: React.FC = () => {
  const [meetingRooms, setMeetingRooms] = useState<MeetingRoom[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [calendarTitle, setCalendarTitle] = useState("");
  const calendarRef = useRef<FullCalendar | null>(null);

  // 회의실 목록 및 예약 데이터를 불러옵니다.
  useEffect(() => {
    // 회의실 목록 불러오기
    axios
      .get("http://localhost:8003/workly/meeting-rooms")
      .then((response) => {
        console.log("📌 [MeetingRoom.tsx] 가져온 회의실 목록:", response.data);
        setMeetingRooms(response.data);
      })
      .catch((error) => {
        console.error("🚨 회의실 목록 불러오기 오류:", error);
      });

    // 회의실 예약 목록 불러오기
    axios
      .get("http://localhost:8003/workly/meeting-reservation")
      .then((response) => {
        console.log("📌 [MeetingRoom.tsx] 가져온 예약 데이터:", response.data);
        setReservations(response.data);
      })
      .catch((error) => {
        console.error("🚨 회의실 예약 데이터 불러오기 오류:", error);
      });
  }, []);

  // FullCalendar의 resource 형식으로 변환 (id는 문자열이어야 합니다)
  const resources = meetingRooms.map((room) => ({
    id: room.mrNo.toString(),
    title: room.mrName,
    capacity: room.capacity,
  }));

  // FullCalendar의 event 형식으로 변환 (extendedProps에 추가 정보 포함)
  const events = reservations.map((reservation) => ({
    id: reservation.mrResNo.toString(),
    resourceId: reservation.mrNo.toString(),
    title: reservation.mrResTitle,
    start: reservation.startTime,
    end: reservation.endTime,
    extendedProps: {
      reason: reservation.reason,
      mrStatus: reservation.mrStatus,
      mrResDate: reservation.mrResDate,
    },
  }));

  // 커스텀 툴바 핸들러
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

  return (
    <div className={styles.meetingRoomContainer}>      
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
      
      <FullCalendar
        ref={calendarRef}
        plugins={[resourceTimelinePlugin, interactionPlugin]}
        initialView="resourceTimelineDay"
        resources={resources}
        events={events}
        locales={allLocales}
        locale="ko"
        firstDay={0}
        height="auto"
        headerToolbar={false} // 기본 툴바 제거
        datesSet={(info) => setCalendarTitle(info.view.title)}
      />
    </div>
  );
};

export default MeetingRoom;
