import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Calendar from "./components/calendar/Calendar";
import './App.css'
import { ApprovalMain } from "./pages/approvalMain";
import PersonnelMain from "./pages/PersonnelMain";
import FormMain from "./pages/FormMain";
import FormUpdate from "./components/form/FormUpdate";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/main" element={<MainPage/>} />
        <Route path="/calendar" element={<Calendar/>} />
        <Route path="/approval" element={<ApprovalMain/>} />
        <Route path="/personnel" element={<PersonnelMain/>} /> 
        <Route path="/form" element={<FormMain/>}>
          <Route path="detail/:formNo" element={<FormUpdate/>} />
        </Route>
      </Routes>
  );
}

export default App;

