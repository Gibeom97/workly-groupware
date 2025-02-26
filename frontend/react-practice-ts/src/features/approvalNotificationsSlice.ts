import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  approvalComplete: 0,
  approvalRequest: 0,
  approvalReference: 0,
  approvalReceive: 0,
  approvalReject: 0,
  notifications: [], // 알림 리스트 추가
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setCounts: (state, action) => {
      state.approvalComplete = action.payload.approvalComplete;
      state.approvalRequest = action.payload.approvalRequest;
      state.approvalReference = action.payload.approvalReference;
      state.approvalReceive = action.payload.approvalReceive;
      state.approvalReject = action.payload.approvalReject;
    },
    showNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
  },
});

export const { setCounts, showNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
