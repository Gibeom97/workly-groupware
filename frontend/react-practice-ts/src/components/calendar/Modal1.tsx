import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styles from "./Modal1.module.css";

interface MeetingRoom {
  mrNo: string;
  mrName: string;
}

interface Modal1Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: any) => void;
  onDelete?: (eventId: string) => void;
  setMeetingRoomEvents?: React.Dispatch<React.SetStateAction<any[]>>; // 캘린더 상태 업데이트 함수
  selectedEvent?: any;
}

/** 
 * 브라우저 팝업 차단과 무관하게 
 * "무조건" 화면에 표시되는 모달 컴포넌트 
 */
function ForceAlertInModal({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "300px",
          textAlign: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p style={{ marginBottom: "20px" }}>{message}</p>
        <button
          onClick={onClose}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
}

const Modal1: React.FC<Modal1Props> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  setMeetingRoomEvents,
  selectedEvent,
}) => {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [meetingRooms, setMeetingRooms] = useState<MeetingRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState("");

  // 추가: 오류 메시지를 강제로 표시할 상태
  const [forceAlertMessage, setForceAlertMessage] = useState("");

  const user = useSelector((state: any) => state.user);
  const userNo = user?.userNo;

  // 회의실 목록 불러오기
  useEffect(() => {
    axios
      .get("http://localhost:8003/workly/meeting-rooms")
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setMeetingRooms(response.data);
        } else {
          console.error("🚨 빈 데이터 반환됨", response.data);
        }
      })
      .catch((error) => console.error("🚨 회의실 목록 불러오기 오류:", error));
  }, []);

  // 기존 예약 데이터를 수정 모드로 불러오기
  useEffect(() => {
    if (isOpen) {
      if (!selectedEvent || selectedEvent.meetingRoomId === undefined) {
        resetForm();
      } else {
        setMeetingTitle(selectedEvent.title || "");
        setMeetingDescription(selectedEvent.description || "");
        setMeetingDate(
          selectedEvent.start ? selectedEvent.start.split("T")[0] : ""
        );

        const startDateTime = selectedEvent.start
          ? selectedEvent.start.split("T")
          : ["", ""];
        const endDateTime = selectedEvent.end
          ? selectedEvent.end.split("T")
          : ["", ""];

        setStartTime(startDateTime[1] ? startDateTime[1].slice(0, 5) : "");
        setEndTime(endDateTime[1] ? endDateTime[1].slice(0, 5) : "");
        setSelectedColor(selectedEvent.backgroundColor || "#000000");
        setSelectedRoom(selectedEvent.meetingRoomId || "");
      }
    }
  }, [selectedEvent, isOpen]);

  // 입력값 초기화
  const resetForm = () => {
    setMeetingTitle("");
    setMeetingDescription("");
    setMeetingDate("");
    setStartTime("");
    setEndTime("");
    setSelectedColor("#000000");
    setSelectedRoom("");
  };

  // 예약 저장
  const handleSaveClick = async () => {
    if (!meetingTitle || !meetingDate || !startTime || !endTime || !selectedRoom) {
      alert("필수 항목을 입력해주세요.");
      return;
    }

    const meetingData = {
      id: selectedEvent ? selectedEvent.id : Date.now().toString(),
      mrResTitle: meetingTitle,
      startTime: `${meetingDate}T${startTime}+09:00`,
      endTime: `${meetingDate}T${endTime}+09:00`,
      reason: meetingDescription,
      mrStatus: "N",
      mrResDate: meetingDate,
      mrNo: selectedRoom,
      userNo: userNo,
      backgroundColor: selectedColor,
    };

    try {
      if (selectedEvent && selectedEvent.meetingRoomId !== undefined) {
        // 예약 수정
        const response = await axios.put(
          `http://localhost:8003/workly/meeting-reservation/update/${selectedEvent.id}`,
          meetingData
        );
        console.log("예약 수정 응답:", response.data);
      } else {
        // 새 예약 추가
        const response = await axios.post(
          "http://localhost:8003/workly/meeting-reservation/add",
          meetingData
        );
        console.log("예약 추가 응답:", response.data);
      }

      // 캘린더에 새로 추가된 예약 데이터 반영
      if (setMeetingRoomEvents) {
        setMeetingRoomEvents((prevMeetings) => {
          if (selectedEvent) {
            return prevMeetings.map((event) =>
              event.id === selectedEvent.id ? meetingData : event
            );
          } else {
            return [...prevMeetings, meetingData];
          }
        });
      }

      onClose();
    } catch (error: any) {
      console.error("📌 회의실 예약 저장 오류:", error);

      // 강제 모달에 표시할 메시지 결정
      if (error.response) {
        // 서버에서 문자열로 반환하는 경우
        const data = error.response.data;
        // 혹은 서버가 { message: "..." } 형태로 보낸다면:
        const message =
          typeof data === "object" && data.message
            ? data.message
            : data || "오류가 발생했습니다.";

        setForceAlertMessage(message);
      } else {
        setForceAlertMessage("네트워크 오류가 발생했습니다.");
      }
    }
  };

  // 예약 삭제
  const handleDeleteClick = async () => {
    if (!selectedEvent || !onDelete) return;
    if (window.confirm(`정말 "${selectedEvent.title}" 회의 예약을 삭제하시겠습니까?`)) {
      try {
        await axios.delete(
          `http://localhost:8003/workly/meeting-reservation/delete/${selectedEvent.id}`
        );

        if (setMeetingRoomEvents) {
          setMeetingRoomEvents((prevMeetings) =>
            prevMeetings.filter((event) => event.id !== selectedEvent.id)
          );
        }

        onDelete(selectedEvent.id);
        onClose();
      } catch (error) {
        console.error("회의실 예약 삭제 오류:", error);
        setForceAlertMessage("회의실 예약을 삭제하는 도중 오류가 발생했습니다.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 오류 메시지 강제 표시 모달 */}
      <ForceAlertInModal
        message={forceAlertMessage}
        onClose={() => setForceAlertMessage("")}
      />

      <div className={styles.modal1Overlay} onClick={onClose}>
        <div className={styles.modal1Container} onClick={(e) => e.stopPropagation()}>
          <h2 className={styles.modal1Title}>회의실 예약</h2>

          {/* 회의실 선택 */}
          <div className={styles.formGroup}>
            <label>회의실 선택 *</label>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
            >
              {meetingRooms.length === 0 ? (
                <option value="">🚨 회의실 정보 없음</option>
              ) : (
                <>
                  <option value="">회의실을 선택하세요</option>
                  {meetingRooms.map((room) => (
                    <option key={room.mrNo} value={room.mrNo}>
                      {room.mrName}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          {/* 날짜 지정 */}
          <div className={styles.formGroup}>
            <label>날짜 지정 *</label>
            <input
              type="date"
              value={meetingDate}
              onChange={(e) => setMeetingDate(e.target.value)}
            />
          </div>

          {/* 회의 제목 */}
          <div className={styles.formGroup}>
            <label>회의 제목 *</label>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
            />
          </div>

          {/* 회의 안건 */}
          <div className={styles.formGroup}>
            <label>회의 안건</label>
            <input
              type="text"
              placeholder="회의 안건을 입력하세요"
              value={meetingDescription}
              onChange={(e) => setMeetingDescription(e.target.value)}
            />
          </div>

          {/* 시간 지정 */}
          <div className={styles.formGroup}>
            <label>시간 지정 *</label>
            <div className={styles.timeGroup}>
              <span>시작</span>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              <span>종료</span>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          {/* 버튼 그룹 */}
          <div className={styles.buttonGroup}>
            {selectedEvent && onDelete && (
              <button className={styles.deleteButton} onClick={handleDeleteClick}>
                예약 삭제
              </button>
            )}
            <button className={styles.saveButton} onClick={handleSaveClick}>
              {selectedEvent && selectedEvent.meetingRoomId !== undefined
                ? "예약 수정"
                : "예약 추가"}
            </button>
            <button className={styles.cancelButton} onClick={onClose}>
              취소
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal1;
