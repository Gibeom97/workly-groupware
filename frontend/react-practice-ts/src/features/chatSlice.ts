import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  favorites: string[]; // 즐겨찾기한 유저 목록
  currentRoomNo: number | null; // 현재 접속 중인 채팅방 번호
  participants: number[]; // 현재 참가하고 있는 참가자 목록 (USER_NO 리스트)
  unreadMessages: Record<number, number>; // 채팅방별 안 읽은 메시지 수 { roomNo: unreadCount }
}

const initialState: ChatState = { 
  favorites: [], // Redux Persist가 자동으로 저장 및 복원함 (localStorage 직접 접근 X)
  currentRoomNo: null, 
  participants: [], 
  unreadMessages: {}, 
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // 🔹 즐겨찾기 추가/삭제
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((name) => name !== action.payload);
    },

    // 🔹 현재 접속 중인 채팅방 번호 변경
    setCurrentRoom: (state, action: PayloadAction<number | null>) => {
      state.currentRoomNo = action.payload;
    },

    // 🔹 참가 중인 사용자 목록 업데이트
    setParticipants: (state, action: PayloadAction<number[]>) => {
      state.participants = action.payload;
    },

    // 🔹 안 읽은 메시지 수 업데이트
    setUnreadMessages: (state, action: PayloadAction<{ roomNo: number; count: number }>) => {
      state.unreadMessages[action.payload.roomNo] = action.payload.count;
    },
  },
});

export const { addFavorite, removeFavorite, setCurrentRoom, setParticipants, setUnreadMessages } = chatSlice.actions;
export default chatSlice.reducer;
