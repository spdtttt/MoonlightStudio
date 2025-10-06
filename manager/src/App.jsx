import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Stylists from "./components/Stylists";
import Booked from "./components/Booked";
import SideBar from "./components/SideBar";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
        <SideBar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/stylists" replace />} />
            <Route path="/stylists" element={<Stylists />} />
            <Route path="/booked" element={<Booked />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
