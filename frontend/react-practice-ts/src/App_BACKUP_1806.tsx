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
<<<<<<< HEAD
import { ApprovalTempPage } from "./pages/approvalTempPage";
import { ApprovalRejectPage } from "./pages/approvalRejectPage";
=======
import { ApprovalProgressPage } from "./pages/approvalPage/approvalProgressPage";
import { ApprovalFinishPage } from "./pages/approvalPage/approvalFinishPage";
import { ApprovalRequestPage } from "./pages/approvalPage/approvalRequestPage";
import { ApprovalReferencePage } from "./pages/approvalPage/approvalReferencePage";
>>>>>>> yebin

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/main" element={<MainPage/>} />
        <Route path="/calendar" element={<Calendar />} />
      
        {/*전자결재Route*/}
        <Route path="/approvalMain" element={<ApprovalMain />}/>
        <Route path="/ApprovalWritePage" element={<ApprovalWritePage/>}/>
        <Route path="/ApprovalCompletePage" element={<ApprovalCompletePage/>}/>
<<<<<<< HEAD
        <Route path="/approvalTempPage" element={<ApprovalTempPage />} />
        <Route path="/approvalRejectPage" element={<ApprovalRejectPage />} />
=======
        <Route path="/ApprovalProgressPage" element={<ApprovalProgressPage/>}/>
        <Route path="/ApprovalFinishPage" element={<ApprovalFinishPage/>}/>
        <Route path="/ApprovalRequestPage" element={<ApprovalRequestPage/>}/>
        <Route path="/ApprovalReferencePage" element={<ApprovalReferencePage/>}/>
>>>>>>> yebin

        <Route path="/personnel" element={<PersonnelMain/>} /> 
        <Route path="/form" element={<FormMain/>}>
          <Route path="detail/:formNo" element={<FormUpdate/>} />
        </Route>
      </Routes>
  );
}

export default App;

