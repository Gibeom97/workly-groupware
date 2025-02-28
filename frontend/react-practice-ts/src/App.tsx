import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Calendar from "./pages/Calendar";
import './App.css'
import { ApprovalMain } from "./pages/approvalPage/approvalMain";
import { ApprovalWritePage } from "./pages/approvalPage/approvalWritePage";
import { ApprovalCompletePage } from "./pages/approvalPage/approvalCompletePage";
import PersonnelMain from "./pages/PersonnelMain";
import FormMain from "./pages/FormMain";
import FormUpdate from "./components/form/FormUpdate";
import { ApprovalProgressPage } from "./pages/approvalPage/approvalProgressPage";
import { ApprovalFinishPage } from "./pages/approvalPage/approvalFinishPage";
import { ApprovalRequestPage } from "./pages/approvalPage/approvalRequestPage";
import { ApprovalReferencePage } from "./pages/approvalPage/approvalReferencePage";
import { ApprovalTempPage } from "./pages/approvalPage/approvalTempPage";
import { ApprovalRejectPage } from "./pages/approvalPage/approvalRejectPage";
import CreateEmployee from "./components/personnel/CreateEmployee";
import ManagePermission from "./components/personnel/ManagePermission";
import PersonnelTable from "./components/personnel/PersonnelTable";
import PersonnelDetail from "./components/personnel/PersonnelDetail";
import LeaveMain from "./pages/LeaveMain";
import MyLeave from "./components/leave/MyLeave";
import LeavePolicy from "./components/leave/LeavePolicy";
import ManageLeave from "./components/leave/ManageLeave";
import ApprovalConfirmPage from "./pages/approvalPage/approvalConfirmPage";

import  { useState } from "react";
import Chat from "./Chat";  
import { RootState } from "./store"; 
import { useSelector } from "react-redux";

import { ApprovalCompletePage2 } from "./pages/approvalPage/approvalCompletePage2";
import { ApprovalSendPage } from "./pages/approvalPage/approvalSendPage";
import { ApprovalRejectDetailPage } from "./pages/approvalPage/approvalRejectDetailPage";
import useFetchNotifications from "./hooks/useFetchNotifications";

function App() {
  // 전자결재 알림서비스 추가
  const userNo = useSelector((state: RootState) => state.user.userNo);
  useFetchNotifications(userNo);


  const currentUser = useSelector((state: RootState) => state.user); 
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div>
      {/* 🔹 Chat 열기 버튼 */}
      <button onClick={() => setIsChatOpen(true)}>채팅 열기</button>

      {/* 🔹 Chat 모달 (유저 정보 전달) */}
      {isChatOpen && (
        <Chat currentUser={currentUser} onClose={() => setIsChatOpen(false)} />
      )}

      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/main" element={<MainPage/>} />
        <Route path="/calendar" element={<Calendar />} />
      
        {/*전자결재Route*/}
        <Route path="/approvalMain" element={<ApprovalMain />}/>
        <Route path="/ApprovalWritePage" element={<ApprovalWritePage/>}/>
        {/*<Route path="/ApprovalWritePage/:approvalNo" element={<ApprovalWritePage />} /> 임시저장 작성하기 */}
        <Route path="/ApprovalCompletePage/:approvalNo" element={<ApprovalCompletePage/>}/>

        <Route path="/approvalTempPage" element={<ApprovalTempPage />} />
        <Route path="/approvalRejectPage" element={<ApprovalRejectPage />} />

        <Route path="/ApprovalProgressPage" element={<ApprovalProgressPage/>}/>
        <Route path="/ApprovalFinishPage" element={<ApprovalFinishPage/>}/>
        <Route path="/ApprovalRequestPage" element={<ApprovalRequestPage/>}/>
        <Route path="/ApprovalReferencePage" element={<ApprovalReferencePage/>}/>

        <Route path="/ApprovalConfirmPage/:approvalNo" element={<ApprovalConfirmPage/>}/>

        <Route path="/ApprovalCompletepage2/:approvalNo" element={<ApprovalCompletePage2/>}/>
        <Route path="/ApprovalSendPage" element={<ApprovalSendPage/>}/>

        <Route path="/ApprovalRejectpage" element={<ApprovalReferencePage/>}/>
        <Route path="/ApprovalRejectDetailPage/:approvalNo" element={<ApprovalRejectDetailPage/>}/>

        {/*전자결재Route*/}

        <Route path="/personnel" element={<PersonnelMain />}>
          <Route index element={<PersonnelTable />} />
          <Route path="createEmployee" element={<CreateEmployee />} />
          <Route path="managePermissions" element={<ManagePermission />} />
          <Route path=":userNo" element={<PersonnelDetail />} />
        </Route>

        <Route path="/leave" element={<LeaveMain/>}>
          <Route index element={<MyLeave/>}/>
          <Route path="manage" element={<ManageLeave/>}/>
          <Route path="policy" element={<LeavePolicy/>}/>
        </Route>

        <Route path="/form" element={<FormMain/>}>
          <Route path="detail/:formNo" element={<FormUpdate/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;