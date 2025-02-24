import { createSlice } from "@reduxjs/toolkit";

// 1) localStorage에서 "user" 가져옴
const storedUser = localStorage.getItem("user");

// 2) 만약 있다면, 원하는 구조로 변환
let initialState;

if (storedUser) {
    const parsed = JSON.parse(storedUser);
    const { member, department, annualLeave, position, attachment } = parsed;

    initialState = {
        userNo: member?.userNo || 0,
        userName: member?.userName || "",
        statusType: member?.statusType || "",
        totalAnnualLeave : annualLeave?.totalAnnualLeave || 0,
        usedAnnualLeave : annualLeave?.usedAnnualLeave || 0,
        deptName: department?.deptName || "",
        positionName: position?.positionName || "",
        changeName: attachment?.changeName || "",
        filePath: attachment?.filePath || ""
    }
} else {
    // 3) 없으면 기본값
    initialState = {
        userNo: 0,
        userName: "",
        statusType: "",
        totalAnnualLeave: 0,
        usedAnnualLeave: 0,
        deptName: "",
        positionName: "",
        changeName: "",
        filePath: ""
    };
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser(state, data) {
            const { member, department, annualLeave, position, attachment } = data.payload;
            localStorage.setItem("user", JSON.stringify(data.payload));

            return {
                userNo: member.userNo || 0,
                userName: member?.userName || "",
                statusType: member?.statusType || "",
                totalAnnualLeave : annualLeave?.totalAnnualLeave || 0,
                usedAnnualLeave : annualLeave?.usedAnnualLeave || 0,
                deptName: department?.deptName || "",
                positionName: position?.positionName || "",
                changeName: attachment?.changeName || "",
                filePath: attachment?.filePath || "",
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
                deptName: "",
                positionName: "",
                changeName: "",
                filePath: ""
            }
        }
    }
})

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;