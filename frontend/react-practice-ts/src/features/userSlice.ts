import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userNo: 0,
    deptName: "", 
    positionName: "",
    userName: "",
    phone: "",
    address: "",
    email: "",
    extension: "",
    hireDate: "",
    changeName: "",
    filePath: ""
} 

const user = createSlice({
    name: "user",
    initialState,
    reducers : {
        loginSuccess(state, data) {
            return data.payload;
        }
    }
})

export default user;
export const {loginSuccess} = user.actions;