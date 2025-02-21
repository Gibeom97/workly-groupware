import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { combineReducers } from "redux"
import storage from "redux-persist/lib/storage";
import userReducer from "./features/userSlice";
import chatReducer from "./features/chatSlice";

const persistConfig = {
    key: "root", // localStorage에 저장
    storage,
    whitelist: ["user","chat"], // rootReducer 중 user만 localStorage에 저장
};


const rootReducer = combineReducers({
    user: persistReducer(persistConfig, userReducer),
    chat: persistReducer(persistConfig, chatReducer), // chatReducer를 별도 persist 설정
});



const store = configureStore({
    reducer : rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          // serializableCheck 옵션을 건드려서 redux-persist 관련 액션을 무시(콘솔 경고 안뜨게함)
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
});

export const persistor = persistStore(store); 
export type RootState = ReturnType<typeof store.getState>;
export default store;