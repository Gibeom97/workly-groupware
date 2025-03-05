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
  }[]>([]); // meetings 배열 타입 명시
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toLocaleDateString('en-CA')); // 'YYYY-MM-DD' 형식으로 현재 날짜 설정
  const [meetingRooms, setMeetingRooms] = useState<MeetingRoom[]>([]); // 회의실 정보 저장
  const [searchQuery, setSearchQuery] = useState(''); // 회의실명 검색 값

  // 회의실 목록과 예약 데이터 가져오기
  useEffect(() => {
    // 회의실 목록 불러오기
    axios
      .get('http://localhost:8003/workly/meeting-rooms')
      .then((response) => {
        setMeetingRooms(response.data);
      })
      .catch((error) => {
        console.error('🚨 회의실 목록 불러오기 오류:', error);
      });
  }, []); // 한 번만 호출하여 회의실 목록을 초기화

  // 예약 데이터 업데이트 함수
  const fetchMeetingReservations = () => {
    if (meetingRooms.length === 0) {
      return; // meetingRooms가 비어 있으면 더 이상 실행하지 않음
    }

    // 회의실 예약 데이터 불러오기
    axios
      .get(`http://localhost:8003/workly/meeting-reservation?date=${selectedDate}`)
      .then((response) => {
        console.log('📌 가져온 회의실 예약 데이터:', response.data);
        // 예약 데이터와 회의실 데이터를 결합
        setMeetings(
          response.data
            .filter((reservation: Reservation) => {
              // 예약이 selectedDate와 일치하는 경우만 필터링
              const reservationDate = new Date(reservation.startTime).toLocaleDateString('en-CA');
              return reservationDate === selectedDate; // 예약 날짜가 selectedDate와 일치하는지 확인
            })
            .filter((reservation: Reservation) =>
              reservation.mrResTitle
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) || // 회의 제목이 검색어에 포함되는지 확인
              meetingRooms.some(room => room.mrName.toLowerCase().includes(searchQuery.toLowerCase()) && room.mrNo === reservation.mrNo) // 회의실명 검색
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
                room: room ? room.mrName : 'Unknown', // 회의실 이름 추가
              };
            })
        );
      })
      .catch((error) => {
        console.error('🚨 회의실 예약 데이터 불러오기 오류:', error);
      });
  };

  // 날짜 변경 핸들러
  const handleChangeDate = (direction: string) => {
    const currentDate = new Date(selectedDate);
    if (direction === 'prev') {
      currentDate.setDate(currentDate.getDate() - 1); // 이전 날짜로
    } else if (direction === 'next') {
      currentDate.setDate(currentDate.getDate() + 1); // 다음 날짜로 이동
    }
    setSelectedDate(currentDate.toLocaleDateString('en-CA')); // 'YYYY-MM-DD' 형식으로 설정
  };

  // selectedDate가 변경될 때마다 예약 데이터를 다시 불러옴
  useEffect(() => {
    if (meetingRooms.length > 0 && selectedDate) {
      fetchMeetingReservations(); // selectedDate와 meetingRooms 상태가 변경되면 회의실 예약 데이터를 불러옵니다.
    }
  }, [selectedDate, meetingRooms, searchQuery]); // selectedDate, meetingRooms, searchQuery 변경 시 예약 데이터 불러오기

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span>회의실 사용 현황</span>
      </div>
      <div className={styles.datePicker}>
        <button
          className={styles.navButton}
          onClick={() => handleChangeDate('prev')} // 이전 날짜로 이동
        >
          {'<'}
        </button>
        <span className={styles.date}>{selectedDate}</span>
        <button
          className={styles.navButton}
          onClick={() => handleChangeDate('next')} // 다음 날짜로 이동
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
          onChange={(e) => setSearchQuery(e.target.value)} // 검색어 업데이트
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
