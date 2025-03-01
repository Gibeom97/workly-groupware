import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface NotificationState {
  approvalMain: number;
  approvalTemp: number;
  approvalProgress: number;
  approvalFinish: number;
  approvalRequest: number;
  approvalReference: number;
  approvalSend: number;
  approvalReject: number;
}

const initialState: NotificationState = {
  approvalMain: 0,
  approvalTemp: 0,
  approvalProgress: 0,
  approvalFinish: 0,
  approvalRequest: 0,
  approvalReference: 0,
  approvalSend: 0,
  approvalReject: 0,
};

// ✅ Redux Thunk: 비동기적으로 백엔드에서 알림 데이터 가져오기
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (userNo: number) => {
    const response = await axios.get(`http://localhost:8003/workly/notifications/${userNo}`);
    return response.data;
  }
);

const approvalNotificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotification: (state, action) => {
      state[action.payload] = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      const notifications = action.payload;
  
      console.log("📢 Redux에 저장될 데이터:", notifications); // ✅ Redux에 저장되는 데이터 확인
  
      if (!Array.isArray(notifications)) {
        console.error("❌ Redux 상태 업데이트 오류! 배열이 아님:", notifications);
        return;
      }
  
      // ✅ Redux 상태 초기화 후 다시 업데이트
      Object.keys(state).forEach((key) => {
        state[key as keyof typeof state] = 0;
      });

      notifications.forEach((noti: any) => {
        if (noti.approvalLineType === "승인" && noti.status == 1) state.approvalRequest++;
        else if (noti.approvalLineType === "수신") state.approvalSend++;
        else if (noti.type === "참조자") state.approvalReference++;
      });

      console.log("Redux 최종 상태:", state);
    });
  },
});

export const { clearNotification } = approvalNotificationsSlice.actions;
export default approvalNotificationsSlice.reducer;
