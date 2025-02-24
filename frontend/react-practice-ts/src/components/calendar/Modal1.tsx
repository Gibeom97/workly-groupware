import React, { useState, useEffect } from "react";
import styles from "./Modal1.module.css"; // ✅ CSS를 모듈로 가져옴

interface Modal1Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: any) => void; // ✅ 회의 예약 추가 & 수정
  onDelete?: (eventId: string) => void; // ✅ 삭제 기능 추가
  selectedEvent?: any; // ✅ 선택된 이벤트 정보
}

const Modal1: React.FC<Modal1Props> = ({ isOpen, onClose, onSave, onDelete, selectedEvent }) => {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedColor, setSelectedColor] = useState(""); // ✅ 원래 초기값 유지

  // ✅ 선택된 일정이 있을 경우 기존 데이터 반영 (수정 모드)
  useEffect(() => {
    if (selectedEvent) {
      setMeetingTitle(selectedEvent.title || "");
      setMeetingDescription(selectedEvent.description || "");
      setMeetingDate(selectedEvent.start ? selectedEvent.start.split("T")[0] : "");
      
      // ✅ 기존 예약의 시간 값을 유지하면서 "HH:MM" 형식으로 설정
      setStartTime(selectedEvent.start ? selectedEvent.start.split("T")[1].slice(0, 5) : "");
      setEndTime(selectedEvent.end ? selectedEvent.end.split("T")[1].slice(0, 5) : "");
      
      setSelectedColor(selectedEvent.backgroundColor || "");
    } else {
      resetForm();
    }
  }, [selectedEvent, isOpen]);

  // 🌟 입력값 초기화
  const resetForm = () => {
    setMeetingTitle("");
    setMeetingDescription("");
    setMeetingDate("");
    setStartTime("");
    setEndTime("");
    setSelectedColor(""); // ✅ 초기값 원래대로 유지
  };

  // 🌟 저장 (새로운 예약 추가 & 기존 예약 수정)
  const handleSaveClick = () => {
    if (!meetingTitle || !meetingDate || !startTime || !endTime) {
      alert("필수 항목을 입력해주세요.");
      return;
    }

    const updatedMeeting = {
      id: selectedEvent ? selectedEvent.id : Date.now().toString(),
      title: meetingTitle,
      start: `${meetingDate}T${startTime}`,
      end: `${meetingDate}T${endTime}`,
      description: meetingDescription,
      backgroundColor: selectedColor,
      borderColor: selectedColor,
    };

    onSave(updatedMeeting);
    onClose();
  };

  // 🌟 삭제
  const handleDeleteClick = () => {
    if (selectedEvent && onDelete) {
      if (window.confirm(`정말 "${selectedEvent.title}" 회의 예약을 삭제하시겠습니까?`)) {
        onDelete(selectedEvent.id);
      }
    }
    onClose();
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
          <label>시간 지정</label>
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

        {/* ✅ 버튼 정렬: 삭제, 수정, 취소 (수정 & 삭제 모드) */}
        <div className={styles.buttonGroup}>
          {selectedEvent && onDelete && (
            <button className={styles.deleteButton} onClick={handleDeleteClick}>예약 삭제</button>
          )}
          <button className={styles.saveButton} onClick={handleSaveClick}>
            {selectedEvent ? "예약 수정" : "예약"}
          </button>
          <button className={styles.cancelButton} onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default Modal1;
