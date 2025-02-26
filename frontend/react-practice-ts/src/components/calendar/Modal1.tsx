import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Modal1.module.css";

interface Modal1Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: any) => void;
  onDelete?: (eventId: string) => void;
  selectedEvent?: any;
}

const Modal1: React.FC<Modal1Props> = ({ isOpen, onClose, onSave, onDelete, selectedEvent }) => {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // ✅ 기존 데이터 불러와서 설정 (수정 모드)
  useEffect(() => {
    if (selectedEvent) {
      setMeetingTitle(selectedEvent.title || "");
      setMeetingDescription(selectedEvent.description || "");
      setMeetingDate(selectedEvent.start ? selectedEvent.start.split("T")[0] : "");

      const startDateTime = selectedEvent.start ? selectedEvent.start.split("T") : ["", ""];
      const endDateTime = selectedEvent.end ? selectedEvent.end.split("T") : ["", ""];

      setStartTime(startDateTime[1] ? startDateTime[1].slice(0, 5) : "");
      setEndTime(endDateTime[1] ? endDateTime[1].slice(0, 5) : "");
      setSelectedColor(selectedEvent.backgroundColor || "");
    } else {
      resetForm();
    }
  }, [selectedEvent, isOpen]);

  // ✅ 입력값 초기화
  const resetForm = () => {
    setMeetingTitle("");
    setMeetingDescription("");
    setMeetingDate("");
    setStartTime("");
    setEndTime("");
    setSelectedColor("");
  };

  // ✅ 회의실 예약 추가 및 수정
  const handleSaveClick = async () => {
    if (!meetingTitle || !meetingDate || !startTime || !endTime) {
      alert("필수 항목을 입력해주세요.");
      return;
    }

    const meetingData = {
      id: selectedEvent ? selectedEvent.id : Date.now().toString(),
      title: meetingTitle,
      start: `${meetingDate}T${startTime}`,
      end: `${meetingDate}T${endTime}`,
      description: meetingDescription,
      backgroundColor: selectedColor,
      borderColor: selectedColor,
    };

    // ✅ 콘솔에서 데이터 확인
    console.log("📌 [Modal1.tsx] 회의실 예약 추가/수정 요청 데이터:", meetingData);

    try {
      if (selectedEvent) {
        // ✅ 회의실 예약 수정 (PUT 요청)
        console.log("📌 [Modal1.tsx] 회의실 예약 수정 요청 보냄:", selectedEvent.id);
        await axios.put(`http://localhost:8003/workly/meeting/update/${selectedEvent.id}`, meetingData);
      } else {
        // ✅ 새로운 회의실 예약 추가 (POST 요청)
        console.log("📌 [Modal1.tsx] 회의실 예약 추가 요청 보냄");
        await axios.post("http://localhost:8003/workly/meeting/add", meetingData);
      }
      onSave(meetingData);
      onClose();
    } catch (error) {
      console.error("📌 [Modal1.tsx] 회의실 예약 저장 오류:", error);
    }
  };

  // ✅ 회의실 예약 삭제
  const handleDeleteClick = async () => {
    if (!selectedEvent || !onDelete) return;

    if (window.confirm(`정말 "${selectedEvent.title}" 회의 예약을 삭제하시겠습니까?`)) {
      try {
        await axios.delete(`http://localhost:8003/workly/meeting/delete/${selectedEvent.id}`);
        onDelete(selectedEvent.id);
        console.log("회의실 예약 삭제 성공");
        onClose();
      } catch (error) {
        console.error("회의실 예약 삭제 오류:", error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal1Overlay} onClick={onClose}>
      <div className={styles.modal1Container} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modal1Title}>회의실 예약</h2>

        <div className={styles.formGroup}>
          <label>날짜 지정 *</label>
          <input type="date" value={meetingDate} onChange={(e) => setMeetingDate(e.target.value)} />
        </div>

        <div className={styles.formGroup}>
          <label>회의 제목 *</label>
          <input type="text" placeholder="제목을 입력하세요" value={meetingTitle} onChange={(e) => setMeetingTitle(e.target.value)} />
        </div>

        <div className={styles.formGroup}>
          <label>회의 안건</label>
          <input type="text" placeholder="회의 안건을 입력하세요" value={meetingDescription} onChange={(e) => setMeetingDescription(e.target.value)} />
        </div>

        <div className={styles.formGroup}>
          <label>시간 지정 *</label>
          <div className={styles.timeGroup}>
            <span>시작</span>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            <span>종료</span>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>색 지정</label>
          <div className={styles.colorPicker}>
            {["#222831", "#FF6B6B", "#4C93FF", "#FFD93D", "#A29BFE", "#FDCB6E", "#00ADB5", "#6D6875"].map((color) => (
              <button
                key={color}
                className={styles.colorButton}
                style={{ backgroundColor: color, border: selectedColor === color ? "3px solid #000" : "none" }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        {/* ✅ 버튼 정렬: 삭제, 수정, 취소 */}
        <div className={styles.buttonGroup}>
          {selectedEvent && onDelete && (
            <button className={styles.deleteButton} onClick={handleDeleteClick}>예약 삭제</button>
          )}
          <button className={styles.saveButton} onClick={handleSaveClick}>
            {selectedEvent ? "예약 수정" : "예약 추가"}
          </button>
          <button className={styles.cancelButton} onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default Modal1;
