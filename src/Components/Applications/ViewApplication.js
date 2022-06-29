import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { apiURL } from "../../envvars";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useParams } from "react-router-dom";

export default function ViewApplication() {
  let { applicationID } = useParams();
  const [selectedApplication, setSelectedApplication] = useState("");
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }; // fetch Applications
  useEffect(async () => {
    const url = `${apiURL}/api/JobApplications/${applicationID}`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setSelectedApplication(data);
      });
  }, []);
  const [CV, setCV] = useState("");
  const GetCV = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      `${apiURL}/api/JobApplications/${selectedApplication.id}/cvURL`,
      requestOptions
    );
    if (response.status === 200) {
      const a = await response.json();
      setCV(a);
    } else {
      alert("something is wrong!");
    }
  };
  const [age, setAge] = useState("");
  const [dis, setDis] = useState(true);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  if (!selectedApplication) {
    return <h1> Loading... </h1>;
  }
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div id="title">
        <pre style={{fontSize:"24px"}}>
          {selectedApplication.firstName} {selectedApplication.lastName}'s
          Application
        </pre>
      </div>
      <div
        className="content"
        dividers
        style={{ display: "flex", flexDirection: "column" }}
      >
        <span>id: {selectedApplication.id}</span>
        {selectedApplication.jobPostingId && (
          <span>jobPostingId: {selectedApplication.jobPostingId}</span>
        )}
        {selectedApplication.jobTitle && (
          <span>JobTitle: {selectedApplication.jobTitle}</span>
        )}
        <span>
          {/* Received: {selectedApplication.receivedOnUtc.split("T")[0]} */}
        </span>
        <div>
          <FormControl sx={{ minWidth: 250 }} disabled={dis}>
            <InputLabel id="demo-simple-select-label">{selectedApplication.stage}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              defaultValue={selectedApplication.stage}
              label="Age"
              onChange={handleChange}
            >
              //unread
              <MenuItem value={0}>Unread</MenuItem>
              //inProgress
              <MenuItem value={1}>PendingInterview</MenuItem>
              <MenuItem value={2}>PendingTechnicalInterview</MenuItem>
              <MenuItem value={3}>PendingDecision</MenuItem>
              //completed
              <MenuItem value={4}>Accepted</MenuItem>
              <MenuItem value={5}>Rejected</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={() => setDis(!dis)}>
            {dis === true ? "edit" : "done"}
          </Button>
        </div>
        <span>Email: {selectedApplication.email}</span>
        <span>Phone: {selectedApplication.phone}</span>
        <ul class="social-icons">
          {selectedApplication.gitHubURL ? (
            <li>
              <a href={selectedApplication.gitHubURL}>
                <i class="fa fa-github"></i>
              </a>
            </li>
          ) : null}
          {selectedApplication.linkedInURL ? (
            <li>
              <a href={selectedApplication.linkedInURL}>
                <i class="fa fa-linkedin"></i>
              </a>
            </li>
          ) : null}
          {selectedApplication.personalWebsite ? (
            <li>
              <a href={selectedApplication.personalWebsite}>
                <i class="fa fa-globe"></i>
              </a>
            </li>
          ) : null}
           {selectedApplication.personalWebsite ? (
            <li>
              <a href={selectedApplication.personalWebsite}>
                <i class="fa fa-file-user"></i>
              </a>
            </li>
          ) : null}
          <li>
            {CV && (
              <a href={CV} target="_blank">
                <i class="fa-solid fa-file-user"></i>
              </a>
            )}
          </li>
        </ul>
      </div>
      <Button varinat="contained" color="success" onClick={GetCV}>
        Get CV
      </Button>
    </div>
  );
}
