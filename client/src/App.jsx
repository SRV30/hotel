import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import "./App.css";
import AddHotel from "./pages/AddHotel";
import AddSubareaForm from "./pages/AddSubareaForm";
import AddVehicleForm from "./pages/AddVehicleForm";
import EditHotel from "./pages/EditHotel";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/admindashboard" element={<AdminDashboard/>} />
        <Route path="/addhotel" element={<AddHotel/>} />
        <Route path="/addsubregion" element={<AddSubareaForm/>} />
        <Route path="/addvehicle" element={<AddVehicleForm/>} />
        <Route path="/edithotel/:id" element={<EditHotel />} />
      </Routes>
    </Router>
  );
};

export default App;
