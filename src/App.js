import Login from "./Pages/Login.js";
import ForgotPassord from "./Pages/ForgotPassword.js";
import ResetPw from "./Pages/ResetPw.js";
import CreateAccount from "./Pages/CreateAccount.js";
import Onboard from "./Pages/Onboard.js";
import Applications from "./Pages/Applications.js";
import Home from "./Pages/Home.js";
import Attendance from "./Pages/Attendance.js";
import Jobs from "./Components/Jobs.js";
import JobPost from "./Components/JobPost.js";
import Navbar from "./Components/Navbar.js";
import Employees from "./Pages/Employees.js";
import ProtectedRoutes from "./ProtectedRoutes";
import ViewApplication from "./Components/Applications/ViewApplication.js"
import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { Departments } from "./Pages/Departments";
import Tickets from "./Pages/Tickets";
import Vacations from "./Pages/Vacations";
import Job from "./Components/Job.js";
import Test from "./Components/Test.js";
import MyProfile from "./Pages/MyProfile.js";

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
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/createAccount" element={<CreateAccount />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/applications/:applicationID" element={<ViewApplication />} />
            <Route path="/jobs/:jobID" element={<Job />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/Attendances/getByEmployeeId/:employeeID" element={<Attendance />} />
            <Route path="/vacations" element={<Vacations />} />

          </Route>

        <Route path="/onboard" element={<Onboard />} />
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassord />} />
        <Route path="/account/resetPassword" element={<ResetPw />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
