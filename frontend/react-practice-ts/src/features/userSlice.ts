import { createSlice } from "@reduxjs/toolkit";
// 1) localStorage에서 "user" 가져옴
const storedUser = localStorage.getItem("user");
// 2) 만약 있다면, 원하는 구조로 변환
let initialState;
if (storedUser) {
    const parsed = JSON.parse(storedUser);
    const user = parsed;
  
    initialState = {
        userNo: user.userNo || 0,
        userName: user.userName || "",
        statusType: user.statusType || "",
        totalAnnualLeave : user.totalAnnualLeave || 0,
        usedAnnualLeave : user.usedAnnualLeave || 0,
        deptNo: user.deptNo || 0,
        deptName: user.deptName || "",
        positionNo: user.positionNo || 0, 
        positionName: user.positionName || "",
        changeName: user?.changeName || "",
        filePath: user.filePath || "",
        hireDate: user.hireDate || "",
        role: user.role || "",
        companyId: user.companyId || 0
    }
} else {
    // 3) 없으면 기본값
    initialState = {
        userNo: 0,
        userName: "",
        statusType: "",
        totalAnnualLeave: 0,
        usedAnnualLeave: 0,
        deptNo: 0,
        deptName: "",
        positionNo: 0, 
        positionName: "",
        changeName: "",
        filePath: "",
        hireDate: "",
        role: "",
        companyId: 0
    };
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser(state, data) {
            const user = data.payload;

            localStorage.setItem("user", JSON.stringify(data.payload));
            return {
                userNo: user.userNo || 0,
                userName: user.userName || "",
                statusType: user.statusType || "",
                totalAnnualLeave : user.totalAnnualLeave || 0,
                usedAnnualLeave : user.usedAnnualLeave || 0,
                deptNo: user.deptNo || 0,
                deptName: user.deptName || "",
                positionNo: user.positionNo || 0, 
                positionName: user.positionName || "",
                changeName: user?.changeName || "",
                filePath: user.filePath || "",
                hireDate: user.hireDate || "",
                role: user.role || "",
                companyId: user.companyId || 0
            }
        },
        logoutUser(state) {
            localStorage.removeItem("user");
            return {
                userNo: 0,
                userName: "",
                statusType: "",
                totalAnnualLeave : 0,
                usedAnnualLeave : 0,
                deptNo: 0,
                deptName: "",
                positionNo: 0, 
                positionName: "",
                changeName: "",
                filePath: "",
                hireDate: "",
                role: "",
                companyId: 0
            }
        }
    }
})
export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;