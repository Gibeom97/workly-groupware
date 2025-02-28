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

// ✅ 비동기적으로 알림 개수 가져오기 (백엔드 API 연동)
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (userNo: number) => {
    const response = await axios.get(`/notifications/${userNo}`);
    return response.data;
  }
);

const approvalNotificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    // ✅ 특정 페이지의 알림 개수를 초기화하는 액션
    clearNotification: (state, action) => {
      state[action.payload] = 0;
    },

    // ✅ 직접 알림 개수를 설정하는 액션 추가
    setNotifications: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      const notifications = action.payload;
      notifications.forEach((noti: any) => {
        if (noti.approvalLineType === "승인") state.approvalRequest++;
        if (noti.approvalLineType === "수신") state.approvalReference++;
      });
    });
  },
});

export const { clearNotification, setNotifications } = approvalNotificationsSlice.actions;
export default approvalNotificationsSlice.reducer;
