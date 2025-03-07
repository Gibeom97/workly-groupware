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
  latestApproval: {
    approvalNo: number;
    approvalTitle: string;
    userName: string;
  } | null; // 최신 결재 문서 정보 추가
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
  latestApproval: null, // 최신 결재 문서 초기값
};
// Redux Thunk: 알림 데이터 가져오기 (결재 요청, 참조, 수신)
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (userNo: number) => {
    const response = await axios.get(`http://localhost:8003/workly/notifications/${userNo}`);
    return response.data;
  }
);
// Redux Thunk: 결재완료 및 결재반려 데이터 가져오기
export const fetchApprovalStatus = createAsyncThunk(
  "notifications/fetchApprovalStatus",
  async (userNo: number) => {
    const response = await axios.get(`http://localhost:8003/workly/notifications/approvalStatus/${userNo}`);
    return response.data;
  }
);
const approvalNotificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotification: (state, action) => {
      if (action.payload === "approvalFinish" || action.payload === "approvalReject") return;
      state[action.payload] = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        const notifications = action.payload;
        if (!Array.isArray(notifications)) {
          console.error("Redux 상태 업데이트 오류! 배열이 아님:", notifications);
          return;
        }
        // 기존 알림 개수 저장 (결재완료, 결재반려 유지)
        const approvalFinish = state.approvalFinish;
        const approvalReject = state.approvalReject;
        // Redux 상태 초기화 후 업데이트
        Object.keys(state).forEach((key) => {
          state[key as keyof typeof state] = 0;
        });
        // 유지했던 값 복구
        state.approvalFinish = approvalFinish;
        state.approvalReject = approvalReject;
        notifications.forEach((noti: any) => {
          if (noti.approvalLineType === "승인" && noti.status == 1) state.approvalRequest++;
          else if (noti.approvalLineType === "수신") state.approvalSend++;
          else if (noti.type === "참조자") state.approvalReference++;
        });
        // 최신 결재 문서 정보 저장 (타입 강제 변환)
        const latest = notifications.length > 0 ? notifications[0] : null;
        state.latestApproval = latest
          ? {
              approvalNo: Number(latest.approvalNo),
              approvalTitle: String(latest.approvalTitle),
              userName: String(latest.userName),
            }
          : null;
      })
      .addCase(fetchApprovalStatus.fulfilled, (state, action) => {
        const approvalStatusData = action.payload;
        if (!Array.isArray(approvalStatusData)) {
          console.error("Redux 상태 업데이트 오류! 배열이 아님:", approvalStatusData);
          return;
        }
        // 결재완료 및 반려 개수 초기화 후 업데이트
        state.approvalFinish = 0;
        state.approvalReject = 0;
        approvalStatusData.forEach((noti: any) => {
          if (noti.approvalStatus === 2) state.approvalFinish++;
          if (noti.approvalStatus === 3) state.approvalReject++;
        });
      });
  },
});
export const { clearNotification } = approvalNotificationsSlice.actions;
export default approvalNotificationsSlice.reducer;