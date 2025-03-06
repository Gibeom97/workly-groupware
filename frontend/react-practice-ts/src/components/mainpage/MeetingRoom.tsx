import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/mainpage/MeetingRoom.module.css';
import search from '../../assets/images/icon/search.png';

// 예약 정보 타입 정의
interface Reservation {
  mrResNo: number;
  mrNo: number;
  userNo: number;
  mrResTitle: string;
  startTime: string;  // startTime이 ISO 형식일 것으로 가정
  endTime: string;    // endTime이 ISO 형식일 것으로 가정
  reason?: string;
  mrStatus?: string;
  mrResDate?: string;
}

// 회의실 정보 타입 정의
interface MeetingRoom {
  mrNo: number;
  mrName: string;
}

const MeetingRoom = () => {
  const [meetings, setMeetings] = useState<{
    time: string;
    title: string;
    room: string;
  }[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toLocaleDateString('en-CA')); // 'YYYY-MM-DD' 형식으로 현재 날짜 설정
  const [meetingRooms, setMeetingRooms] = useState<MeetingRoom[]>([]);
  const [searchQuery, setSearchQuery] = useState(''); // 회의실명 검색 값

  // 회의실 목록 불러오기
  useEffect(() => {
    axios
      .get('http://localhost:8003/workly/meeting-rooms')
      .then((response) => {
        setMeetingRooms(response.data);
      })
      .catch((error) => {
        console.error('🚨 회의실 목록 불러오기 오류:', error);
      });
  }, []);

  // 예약 데이터 업데이트 함수
  const fetchMeetingReservations = () => {
    if (meetingRooms.length === 0) {
      return;
    }

    axios
      .get(`http://localhost:8003/workly/meeting-reservation?date=${selectedDate}`)
      .then((response) => {
        console.log('📌 가져온 회의실 예약 데이터:', response.data);
        // 예약 데이터를 필터링, 매핑 후 정렬
        const sortedMeetings = response.data
          .filter((reservation: Reservation) => {
            // 예약 날짜가 selectedDate와 일치하는지 확인
            const reservationDate = new Date(reservation.startTime).toLocaleDateString('en-CA');
            return reservationDate === selectedDate;
          })
          .filter((reservation: Reservation) =>
            reservation.mrResTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            meetingRooms.some(room => 
              room.mrName.toLowerCase().includes(searchQuery.toLowerCase()) &&
              room.mrNo === reservation.mrNo
            )
          )
          .map((reservation: Reservation) => {
            const room = meetingRooms.find((room) => room.mrNo === reservation.mrNo);

            // 시간 포맷팅: 09:00~12:00 형식으로 변환
            const formatTime = (time: string) => {
              const date = new Date(time);
              const hours = date.getHours().toString().padStart(2, '0');
              const minutes = date.getMinutes().toString().padStart(2, '0');
              return `${hours}:${minutes}`;
            };

            return {
              time: `${formatTime(reservation.startTime)}~${formatTime(reservation.endTime)}`,
              title: reservation.mrResTitle,
              room: room ? room.mrName : 'Unknown',
            };
          })
          // 정렬: 먼저 시작시간 오름차순, 시작시간이 같으면 회의실명 오름차순
          .sort((a, b) => {
            const timeA = a.time.split('~')[0];
            const timeB = b.time.split('~')[0];

            if (timeA < timeB) return -1;
            if (timeA > timeB) return 1;
            return a.room.localeCompare(b.room);
          });

        setMeetings(sortedMeetings);
      })
      .catch((error) => {
        console.error('🚨 회의실 예약 데이터 불러오기 오류:', error);
      });
  };

  // 날짜 변경 핸들러
  const handleChangeDate = (direction: string) => {
    const currentDate = new Date(selectedDate);
    if (direction === 'prev') {
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (direction === 'next') {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setSelectedDate(currentDate.toLocaleDateString('en-CA'));
  };

  // selectedDate, meetingRooms, searchQuery 변경 시 예약 데이터 불러오기
  useEffect(() => {
    if (meetingRooms.length > 0 && selectedDate) {
      fetchMeetingReservations();
    }
  }, [selectedDate, meetingRooms, searchQuery]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span>회의실 사용 현황</span>
      </div>
      <div className={styles.datePicker}>
        <button
          className={styles.navButton}
          onClick={() => handleChangeDate('prev')}
        >
          {'<'}
        </button>
        <span className={styles.date}>{selectedDate}</span>
        <button
          className={styles.navButton}
          onClick={() => handleChangeDate('next')}
        >
          {'>'}
        </button>
      </div>
      <div className={styles.search}>
        <input
          type="text"
          className={styles.input}
          placeholder="회의실명"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className={styles.searchButton}>
          <img src={search} alt="search" />
        </button>
      </div>
      <div className={styles.meetingList}>
        {meetings.length === 0 ? (
          <span>예약된 회의가 없습니다.</span>
        ) : (
          meetings.map((meeting, index) => (
            <div key={index} className={styles.meetingItem}>
              <span className={styles.time}>{meeting.time}</span>
              <span className={styles.title}>{meeting.title}</span>
              <span className={styles.room}>{meeting.room}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MeetingRoom;
