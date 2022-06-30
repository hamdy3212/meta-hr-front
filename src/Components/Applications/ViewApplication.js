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
import { swalToast } from '../../Utility/swal'

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
        switch (data.stage) {
          case "Unread":
            setStatus(0);
            break;
          case "PendingInterview":
            setStatus(1);
            break;
          case "PendingTechnicalInterview":
            setStatus(2);
          case "PendingDecision":
            setStatus(3);
            break;
          case "Accepted":
            setStatus(4);
            break;
          case "Rejected":
            setStatus(5);
            break;
        }
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
  const [status, setStatus] = useState("");
  const [dis, setDis] = useState(true);

  const handleStatus = async (event) => {
    if(event.target.innerText === "DONE" && status !== selectedApplication.stage){
      // Update Status
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      const response = await fetch(
        `${apiURL}/api/JobApplications/changeStage/${applicationID}?stage=${status}`,
        requestOptions
      );
      if (response.status === 200) {
        swalToast("Status Updated Successfully.", "success");
      } else {
        const respJson = await response.json();
        swalToast(respJson.errors.join(" "), "error");
      }


      
    }
    setDis(!dis);
  };
  if (!selectedApplication) {
    return (
      <div
        style={{ textAlign: "center", fontSize: "50px", marginTop: "100px" }}
      >
        <i className="fa-solid fa-sync fa-spin"></i>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
        fontSize: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          border: "1px solid black",
          borderRadius: "20px",
          padding: "50px",
          boxShadow: "5px 5px 20px",
        }}
        id="applicationInfo"
      >
        <pre style={{ fontSize: "28px" }}>
          {selectedApplication.firstName} {selectedApplication.lastName}'s
          Application
        </pre>
        <span>ID {selectedApplication.id}</span>
        {selectedApplication.jobPostingId && (
          <span>jobPostingId: {selectedApplication.jobPostingId}</span>
        )}
        {selectedApplication.jobTitle && (
          <span>JobTitle: {selectedApplication.jobTitle}</span>
        )}

        <div style={{ display: "flex", alignItems: "center" }}>
          Status
          <FormControl
            style={{ margin: "0 10px" }}
            sx={{ minWidth: 250 }}
            disabled={dis}
          >
            <InputLabel id="demo-simple-select-label">
              Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              defaultValue={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
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
          <Button
            variant="contained"
            style={{ width: "20px" }}
            onClick={(event) => handleStatus(event)}
          >
            {dis === true ? "edit" : "done"}
          </Button>
        </div>
        <span>
          <i className="fa-solid fa-envelope"></i> {selectedApplication.email}
        </span>
        <span>
          {" "}
          <i className="fa-solid fa-phone"></i> {selectedApplication.phone}
        </span>
        <span>
          Received at {selectedApplication.receivedOnUtc.split("T")[0]}
        </span>
        <ul
          className="social-icons"
          style={{
            textAlign: "center",
          }}
        >
          {selectedApplication.gitHubURL ? (
            <li>
              <a href={selectedApplication.gitHubURL}>
                <i className="fa-brands fa-github"></i>
              </a>
            </li>
          ) : null}
          {selectedApplication.linkedInURL ? (
            <li>
              <a href={selectedApplication.linkedInURL}>
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </li>
          ) : null}
          {selectedApplication.personalWebsite ? (
            <li>
              <a href={selectedApplication.personalWebsite}>
                <i className="fa fa-globe"></i>
              </a>
            </li>
          ) : null}
          <li>
            {CV && (
              <a href={CV} target="_blank">
                <i className="fa fa-file"></i>
              </a>
            )}
          </li>
        </ul>
        <Button
          variant="contained"
          color="success"
          onClick={GetCV}
        >
          Get CV
        </Button>
      </div>
    </div>
  );
}
