import { createSlice } from "@reduxjs/toolkit";
// 1) localStorage에서 "user" 가져옴
const storedUser = localStorage.getItem("user");
// 2) 만약 있다면, 원하는 구조로 변환
let initialState;
if (storedUser) {
    const parsed = JSON.parse(storedUser);
    const user = parsed;
  
    initialState = {
        // userNo: member?.userNo || 0,
        // userName: member?.userName || "",
        // statusType: member?.statusType || "",
        // totalAnnualLeave : annualLeave?.totalAnnualLeave || 0,
        // usedAnnualLeave : annualLeave?.usedAnnualLeave || 0,
        // deptNo: member?.deptNo || 0,
        // deptName: department?.deptName || "",
        // positionNo: member?.positionNo || 0, 
        // positionName: position?.positionName || "",
        // changeName: attachment?.changeName || "",
        // filePath: attachment?.filePath || "",
        // hireDate: member?.hireDate || ""
        userNo: user.userNo || 0,
        userName: user.userName || "",
        statusType: user.statusType || "",
        totalAnnualLeave : user.totalAnnualLeave || 0,
        usedAnnualLeave : user.usedAnnualLeave || 0,
        deptNo: user.deptNo || 0,
        deptName: user.deptName || "",
        positionNo: user.positionNo || 0, 
        positionName: user.positionName || "",
        changeName: user.changeName || "",
        filePath: user.filePath || "",
        hireDate: user.hireDate || "",
        role: user.role || ""
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
        role: ""
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
                changeName: user.changeName || "",
                filePath: user.filePath || "",
                hireDate: user.hireDate || "",
                role: user.role || ""
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
                role: ""
            }
        }
    }
})
export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;