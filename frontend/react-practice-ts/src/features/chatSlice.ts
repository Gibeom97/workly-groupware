import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatRoom {
    chatRoomNo : number;
    roomTitle : string;
    unreadCount?:number;
    isActive? : boolean;
    bellSetting : 'Y' |'N';
    createdChat? : string; // string으로 변경?
    chatType : string; 
}

interface ChatState {
  favorites: { userNo: number; userName: string; deptName: string; positionName: string }[];
    chatRooms: ChatRoom[];  
    currentRoomNo: number | null;
    participants: number[];
    unreadMessages: Record<number, number>;
    memberInvite: string[];  // ✅ 여기에 memberInvite 추가!
}

const initialState: ChatState = {
    favorites: [],
    chatRooms: [], 
    currentRoomNo: null,
    participants: [],
    unreadMessages: {},
    memberInvite: [],  
};


const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
      setFavorites: (state, action: PayloadAction<{ userNo: number; userName: string; deptName: string; positionName: string }[]>) => {        
            state.favorites = action.payload;  // ✅ 이제 객체 배열을 Redux에 저장
        },
          addFavorite: (state, action: PayloadAction<{ userNo: number; userName: string; deptName: string; positionName: string }>) => {
            if (!state.favorites.some(fav => fav.userNo === action.payload.userNo)) {  // ✅ userNo으로 비교
                state.favorites.push(action.payload);
            }
        },
        removeFavorite: (state, action: PayloadAction<number>) => {
            state.favorites = state.favorites.filter(fav => fav.userNo !== action.payload);  // ✅ userNo을 기준으로 제거
        },
  
        setCurrentRoom: (state, action: PayloadAction<number | null>) => {
            state.currentRoomNo = action.payload;
        },
        setParticipants: (state, action: PayloadAction<number[]>) => {
            state.participants = action.payload;
        },
        setUnreadMessages: (state, action: PayloadAction<{ roomNo: number; count: number }>) => {
            state.unreadMessages[action.payload.roomNo] = action.payload.count;
        },
        
        setMemberInvite: (state, action: PayloadAction<string[]>) => {
            state.memberInvite = action.payload;
        },

        setChatRooms: (state, action: PayloadAction<ChatRoom[]>) => {
           // console.log("💬 Redux 상태 업데이트: 채팅방 목록 저장됨!", action.payload);
            state.chatRooms = action.payload; // ✅ 채팅방 목록 업데이트
        },

        addChatRoom: (state, action: PayloadAction<ChatRoom>) => {
            console.log("💬 새로운 채팅방 추가됨:", action.payload);
            state.chatRooms.push(action.payload);
        },
    },
});

export const {
    setFavorites,
    addFavorite,
    removeFavorite,
    setCurrentRoom,
    setParticipants,
    setUnreadMessages,
    setMemberInvite, 
    setChatRooms,
    addChatRoom,
} = chatSlice.actions;

export default chatSlice.reducer;
