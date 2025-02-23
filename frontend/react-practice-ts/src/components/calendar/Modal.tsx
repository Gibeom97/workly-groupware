import React, { useState, useEffect } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: any, type: string) => void;
  onDelete?: (eventId: string) => void;
  selectedEvent?: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, onDelete, selectedEvent }) => {
  const [selectedTab, setSelectedTab] = useState<"내 일정" | "팀 일정">("내 일정"); // ✅ 수정: 선택된 일정의 타입 반영
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedColor, setSelectedColor] = useState("#000000");

  // 🌟 수정 모드인지 확인 (선택한 이벤트가 있으면 수정 모드)
useEffect(() => {
  if (selectedEvent) {
    setEventTitle(selectedEvent.title || "");
    setEventDescription(selectedEvent.description !== undefined ? selectedEvent.description : "");
    setStartDate(selectedEvent.start || "");
    setEndDate(selectedEvent.end || "");
    setSelectedColor(selectedEvent.backgroundColor || "#000000");
    setSelectedTab(selectedEvent.type === "팀 일정" ? "팀 일정" : "내 일정");
  } else {
    resetForm(); // ✅ selectedEvent가 null이면 입력값 초기화
  }
}, [selectedEvent, isOpen]);


  // 🌟 입력값 초기화
  const resetForm = () => {
    setEventTitle("");
    setEventDescription("");
    setStartDate("");
    setEndDate("");
    setSelectedColor("#000000");
    setSelectedTab("내 일정"); // 기본값: '내 일정'
  };

  // 🌟 일정 저장 (새로운 일정 추가 & 기존 일정 수정)
  const handleSaveClick = () => {
    if (!eventTitle || !startDate || !endDate) {
      alert("제목과 날짜를 입력해주세요.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // ✅ 종료 날짜가 시작 날짜와 다를 때만 +1을 추가
    if (start.getTime() !== end.getTime()) {
      end.setDate(end.getDate() + 1);
    }

    const newEvent = {
      id: selectedEvent ? selectedEvent.id : Date.now().toString(),
      title: eventTitle,
      start: startDate,
      end: end.toISOString().split("T")[0], // YYYY-MM-DD 형식으로 변환
      description: eventDescription,
      backgroundColor: selectedColor,
      borderColor: selectedColor,
      type: selectedTab, // ✅ 수정: 기존 일정의 type 유지
    };

    onSave(newEvent, selectedTab);
    onClose();
  };

  // 🌟 일정 삭제
  const handleDeleteClick = () => {
    if (selectedEvent && onDelete) {
      if (window.confirm(`정말 "${selectedEvent.title}" 일정을 삭제하시겠습니까?`)) {
        onDelete(selectedEvent.id);
      }
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        {/* 일정 구분 탭 */}
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tabButton} ${selectedTab === "내 일정" ? styles.active : ""}`}
            onClick={() => setSelectedTab("내 일정")}
          >
            내 일정
          </button>
          <button
            className={`${styles.tabButton} ${selectedTab === "팀 일정" ? styles.active : ""}`}
            onClick={() => setSelectedTab("팀 일정")}
          >
            팀 일정
          </button>
        </div>

        {/* 날짜 선택 */}
        <div className={styles.formGroup}>
          <label>날짜 지정 *</label>
          <div className={styles.dateGroup}>
            <span>시작</span>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <span>종료</span>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>

        {/* 제목 입력 */}
        <div className={styles.formGroup}>
          <label>일정 제목 *</label>
          <input type="text" placeholder="제목을 입력하세요" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
        </div>

        {/* 내용 입력 */}
        <div className={styles.formGroup}>
          <label>일정 내용</label>
          <textarea 
            placeholder="일정 내용을 입력하세요" 
            value={eventDescription} 
            onChange={(e) => setEventDescription(e.target.value)} 
          />
        </div>

        {/* 색상 선택 */}
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

        {/* 버튼 영역 */}
        <div className={styles.buttonGroup}>
          {selectedEvent ? (
            <>
              <button className={styles.deleteButton} onClick={handleDeleteClick}>일정 삭제</button>
              <button className={styles.saveButton} onClick={handleSaveClick}>일정 수정</button>
            </>
          ) : (
            <button className={styles.saveButton} onClick={handleSaveClick}>일정 등록</button>
          )}
          <button className={styles.cancelButton} onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
