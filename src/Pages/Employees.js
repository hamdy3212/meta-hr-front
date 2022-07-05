import React, { useEffect, useState } from "react";
import { apiURL } from "../envvars";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { userIsInRole, roles } from "../Utility/roles";

const PeopleList = () => {
  let navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }; // fetch departments
  useEffect(() => {
    fetch(`${apiURL}/api/Employees`, requestOptions)
      .then((response) => response.json())
      .then((rowData) => {
        console.log(rowData);
        setEmployees(rowData);
      });
  }, []);
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "8px" }}>Employees</h1>
      {userIsInRole(roles.admin) ||
      userIsInRole(roles.hrJunior) ||
      userIsInRole(roles.hrSenior)
        ? <div style={{ display: "flex", paddingRight: "70px" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "auto" }}
          onClick={() => navigate("/createAccount")}
        >
          Create New Employee
        </Button>
      </div>
        : ""}
      <div class="container" style={{ marginTop: "-23px" }}>
        {employees.map((employee) => {
          return (
            <div class="card" key={employee.id}>
              <img
                src={
                  employee.profilePictureURL ??
                  "https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png"
                }
                alt="Person"
                class="card__image"
              />
              <p class="card__name">
                {employee.firstName + " " + employee.lastName}
              </p>

              <div class="grid-container">
                <div class="grid-child-title">{employee.title}</div>
              </div>
              <div class="grid-container">
                <div
                  class="grid-child-departmentName"
                  style={{ color: "#6C757D" }}
                >
                  {employee.departmentName}
                </div>
              </div>
              <p>
                <a
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "1.25rem",
                  }}
                  href={"mailto:" + employee.email}
                >
                  {employee.email}
                </a>
              </p>
              <ul class="social-icons" style={{ fontSize: "24px" }}>
                {employee.gitHubURL && (
                  <li>
                    <a href={employee.gitHubURL}>
                      <i class="fa fa-github"></i>
                    </a>
                  </li>
                )}
                {employee.linkedInURL && (
                  <li>
                    <a href={employee.linkedInURL}>
                      <i class="fa fa-linkedin"></i>
                    </a>
                  </li>
                )}
                {employee.personalWebsite && (
                  <li>
                    <a href={employee.personalWebsite}>
                      <i class="fa fa-globe"></i>
                    </a>
                  </li>
                )}
              </ul>
              {userIsInRole(roles.hrJunior) || userIsInRole(roles.hrSenior) ? (
                <button
                  class="btn draw-border"
                  onClick={() =>
                    navigate(`../Attendances/getByEmployeeId/${employee.id}`)
                  }
                >
                  Attendance Log
                </button>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PeopleList;
