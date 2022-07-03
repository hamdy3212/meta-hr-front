import React, { useEffect, useState } from "react";
import { apiURL } from "../envvars";

const PeopleList = () => {
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
      <h1 style={{ textAlign: "center", marginTop: "15px" }}>Employees</h1>
      <div className="container" style={{marginTop: "-15px"}}>
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
              <ul class="social-icons">
                {employee.gitHubURL ? (
                  <li>
                    <a href={employee.gitHubURL}>
                      <i class="fa fa-github"></i>
                    </a>
                  </li>
                ) : null}
                {employee.linkedInURL ? (
                  <li>
                    <a href={employee.linkedInURL}>
                      <i class="fa fa-linkedin"></i>
                    </a>
                  </li>
                ) : null}
                {employee.personalWebsite ? (
                  <li>
                    <a href={employee.personalWebsite}>
                      <i class="fa fa-globe"></i>
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PeopleList;
