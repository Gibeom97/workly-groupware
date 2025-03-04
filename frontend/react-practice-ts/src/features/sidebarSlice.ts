import { createSlice } from "@reduxjs/toolkit";

interface SidebarState {
  isChatOpen: boolean;
}

const initialState: SidebarState = {
  isChatOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    openChat: (state) => {
      state.isChatOpen = true;
    },
    closeChat: (state) => {
      state.isChatOpen = false;
    },
  },
});

export const { openChat, closeChat } = sidebarSlice.actions;
export default sidebarSlice.reducer;