
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
       // approval : approvalSlice
        //chat : chatSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;