import Login from "./Pages/Login.js";
import ResetPw from "./Pages/ResetPw.js";
import Register from "./Pages/Register.js";
import Home from "./Pages/Home.js";
import Jobs from "./Components/Jobs.js";
import JobPost from "./Components/JobPost.js";
import Navbar from "./Components/Navbar.js";
import Employees from "./Pages/Employees.js";
import ProtectedRoutes from "./ProtectedRoutes";
import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { Departments } from './Pages/Departments';
import Tickets from './Pages/Tickets';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/addjob" element={<JobPost />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/tickets" element={<Tickets/>} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ResetPw />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
