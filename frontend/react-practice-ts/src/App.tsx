import { Routes, Route } from "react-router-dom";
import Calendar from "./components/Calendar";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/main" element={<MainPage/>} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
  );
}

export default App;
