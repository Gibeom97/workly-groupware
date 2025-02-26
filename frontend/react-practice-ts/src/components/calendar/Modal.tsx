import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: any, type: string) => void;
  onDelete?: (eventId: string) => void;
  selectedEvent?: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, onDelete, selectedEvent }) => {
  const [selectedTab, setSelectedTab] = useState<"내 일정" | "팀 일정">("내 일정"); // ✅ 일정 유형 (내 일정 or 팀 일정)
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedColor, setSelectedColor] = useState("#000000");

  // 🌟 선택한 일정이 있으면 기존 데이터 적용 (수정 모드)
  useEffect(() => {
    if (selectedEvent) {
      setEventTitle(selectedEvent.title || "");
      setEventDescription(selectedEvent.description || "");
      setStartDate(selectedEvent.start || "");
      setEndDate(selectedEvent.end || "");
      setSelectedColor(selectedEvent.backgroundColor || "#000000");
      setSelectedTab(selectedEvent.type === "팀 일정" ? "팀 일정" : "내 일정");
    } else {
      resetForm(); // ✅ 새로운 일정 추가 시 입력값 초기화
    }
  }, [selectedEvent, isOpen]);

  // 🌟 입력값 초기화
  const resetForm = () => {
    setEventTitle("");
    setEventDescription("");
    setStartDate("");
    setEndDate("");
    setSelectedColor("#000000");
    setSelectedTab("내 일정");
  };

  // 🌟 일정 저장 (새 일정 추가 & 기존 일정 수정)
  const handleSaveClick = async () => {
    if (!eventTitle || !startDate || !endDate) {
      alert("제목과 날짜를 입력해주세요.");
      return;
    }

    const newEvent = {
      id: selectedEvent ? selectedEvent.id : Date.now().toString(),
      title: eventTitle,
      startDate: new Date(startDate).toISOString().split("T")[0],  // ✅ "yyyy-MM-dd" 변환
      endDate: new Date(endDate).toISOString().split("T")[0],
      description: eventDescription,
      backgroundColor: selectedColor,  // 🚨 기존 코드 (백엔드에서 받지 않음)
      borderColor: selectedColor,
      color: selectedColor,  // ✅ 이걸 추가해야 백엔드에서 제대로 받을 수 있음!
      type: selectedTab,
      category: selectedTab === "내 일정" ? "P" : "T",
    };
    

    console.log("📌 [Modal.tsx] 일정 추가 요청 데이터:", newEvent); // 🔥 콘솔 로그 추가

    try {
      if (selectedEvent) {
        // ✅ 일정 수정 (PUT 요청)
        console.log("📌 [Modal.tsx] 일정 수정 요청 보냄:", selectedEvent.id);
        await axios.put(`http://localhost:8003/workly/schedule/update/${selectedEvent.id}`, newEvent);
      } else {
        // ✅ 새로운 일정 추가 (POST 요청)
        console.log("📌 [Modal.tsx] 일정 추가 요청 보냄");
        await axios.post("http://localhost:8003/workly/schedule/add", newEvent);
      }
      onSave(newEvent, selectedTab);
      onClose();
    } catch (error) {
      console.error("📌 [Modal.tsx] 일정 저장 중 오류 발생:", error);
    }
  };

  // 🌟 일정 삭제
  const handleDeleteClick = async () => {
    if (selectedEvent && onDelete) {
      if (window.confirm(`정말 "${selectedEvent.title}" 일정을 삭제하시겠습니까?`)) {
        try {
          await axios.delete(`http://localhost:8003/workly/schedule/delete/${selectedEvent.id}`);
          onDelete(selectedEvent.id);
          onClose();
        } catch (error) {
          console.error("일정 삭제 중 오류 발생:", error);
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        {/* 일정 구분 탭 */}
        <div className={styles.tabContainer}>
          <button className={`${styles.tabButton} ${selectedTab === "내 일정" ? styles.active : ""}`} onClick={() => setSelectedTab("내 일정")}>
            내 일정
          </button>
          <button className={`${styles.tabButton} ${selectedTab === "팀 일정" ? styles.active : ""}`} onClick={() => setSelectedTab("팀 일정")}>
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
          <textarea placeholder="일정 내용을 입력하세요" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
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
              <button className={styles.deleteButton} onClick={handleDeleteClick}>
                일정 삭제
              </button>
              <button className={styles.saveButton} onClick={handleSaveClick}>
                일정 수정
              </button>
            </>
          ) : (
            <button className={styles.saveButton} onClick={handleSaveClick}>
              일정 등록
            </button>
          )}
          <button className={styles.cancelButton} onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
