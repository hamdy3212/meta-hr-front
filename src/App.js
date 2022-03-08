import Login from "./login.js";
import Register from "./register.js";
import Home from "./home.js";
import Jobs from "./Components/Jobs.js";
import JobPost from "./Components/JobPost.js";
import Navbar from "./Components/Navbar.js";
import ProtectedRoutes from "./ProtectedRoutes";
import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/addjob" element={<JobPost />} />
        </Route>
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
