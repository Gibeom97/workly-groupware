import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Calendar from "./components/calendar/Calendar";
import './App.css'
import { ApprovalMain } from "./pages/approvalMain";
import { ApprovalWritePage } from "./pages/approvalWritePage";


function App() {
  return (
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/main" element={<MainPage/>} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/approvalMain" element={<ApprovalMain />}/>
        <Route path="/ApprovalWritePage" element={<ApprovalWritePage/>}/>
      </Routes>
  );
}

export default App;

