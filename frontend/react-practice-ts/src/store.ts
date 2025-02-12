import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer : { // 등록할 state 추가

    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;