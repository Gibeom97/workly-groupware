import { useCallback, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { DateSelectArg, EventApi, EventClickArg, EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calendar1.module.css"; // ✅ module.css 객체로 불러오기

// ✅ 고유 ID 생성 함수S
let eventGuid = 0;
const createEventId = () => String(eventGuid++);

// ✅ 오늘 날짜
const todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD

// 🌈 무지개 색상 배열
const rainbowColors = [
  "#FF0000", // 빨강
  "#FF7F00", // 주황
  "#FFFF00", // 노랑
  "#00FF00", // 초록
  "#0000FF", // 파랑
  "#4B0082", // 남색
  "#9400D3"  // 보라
];

// ✅ 초기 일정 데이터
const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: "저녁 약속",
    start: todayStr,
    backgroundColor: rainbowColors[0], // 빨강
    borderColor: rainbowColors[0],
  },
  {
    id: createEventId(),
    title: "최종평가",
    start: todayStr + "T12:00:00",
    backgroundColor: rainbowColors[1], // 주황
    borderColor: rainbowColors[1],
  }
];

function Calendar() {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);

  // 🌈 색상 선택 옵션
  const colorOptions = rainbowColors.map((color, index) => ({
    name: `색상 ${index + 1}`,
    value: color
  }));

  const handleEvents = useCallback(
    (events: EventApi[]) => setCurrentEvents(events),
    []
  );

  // 일정 선택 시 색상 선택 UI 표시
  const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
    setSelectedDate(selectInfo);
    setShowColorPicker(true);
  }, []);

  // 색상 선택 후 일정 추가
  const handleAddEvent = useCallback((color: string) => {
    let title = prompt("일정 제목을 입력하세요")?.trim();
    if (!title || !selectedDate) return;

    let calendarApi = selectedDate.view.calendar;
    calendarApi.unselect();

    calendarApi.addEvent({
      id: createEventId(),
      title,
      start: selectedDate.startStr,
      end: selectedDate.endStr,
      allDay: selectedDate.allDay,
      backgroundColor: color,
      borderColor: color
    });

    setShowColorPicker(false);
    setSelectedDate(null);
  }, [selectedDate]);

  // ✅ 색상 선택 창 외부 클릭 시 닫기
  const handleCloseColorPicker = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains(styles.colorPickerOverlay)) {
      setShowColorPicker(false);
      setSelectedDate(null);
    }
  }, []);

  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    if (window.confirm(`이 일정 「${clickInfo.event.title}」을 삭제하시겠습니까?`)) {
      clickInfo.event.remove();
    }
  }, []);

  return (
    <div className={styles.calendarContainer}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        initialEvents={INITIAL_EVENTS}
        locales={allLocales}
        locale="ko"
        firstDay={1} // ✅ 월요일부터 시작하도록 설정
        eventsSet={handleEvents}
        select={handleDateSelect}
        eventClick={handleEventClick}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "today",
        }}
        height="auto"
        eventContent={(eventInfo) => (
          <div className={styles.customEvent}>
            <span>{eventInfo.timeText ? `${eventInfo.timeText} ` : ""}{eventInfo.event.title}</span>
          </div>
        )}
      />

      {/* ✅ 색상 선택 UI - 외부 클릭 시 닫힘 */}
      {showColorPicker && (
        <div className={styles.colorPickerOverlay} onClick={handleCloseColorPicker}>
          <div className={styles.colorPicker}>
            <h3>색상을 선택하세요</h3>
            <div className={styles.colorOptions}>
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  className={styles.colorCircle}
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleAddEvent(color.value)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
