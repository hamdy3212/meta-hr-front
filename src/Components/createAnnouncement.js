import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import { apiURL } from "../envvars";
import { swalToast, swalShowErrors, swalShow } from "../Utility/swal";
import { MenuItem, Select } from "@mui/material";
import { roles, userIsInRole } from "../Utility/roles";
import { getUserDepId } from "../Utility/utility";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [departmentId, setDepartmentId] = useState(0);
  const [departments, setDepartments] = useState([
    { id: 0, name: "Global" },
  ]);

  useEffect(() => {
    async function setDepId() {
      const tmp = await getUserDepId();
      setDepartmentId(tmp);
    }
    async function setDeps(){
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
      }
      const resp = await fetch(`${apiURL}/api/Departments`, requestOptions);
      if(resp.status !== 200){
        swalShow("Something went wrong", "", "error");
      }
      const respJson = await resp.json();
      setDepartments([...departments, ...respJson])
    }
    if(userIsInRole(roles.departmentDirector)){
      setDepId();
    } else {
      setDeps();
    }
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    if (event.target.name === "title") {
      setTitle(event.target.value);
    } else if (event.target.name === "content") {
      setContent(event.target.value);
    } else if (event.target.name === "department") {
      setDepartmentId(event.target.value);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        content: content
      })
    };
    let requestUrl = `${apiURL}/api/Announcements/createGlobalAnnouncement`;
    if(departmentId != 0){
      requestUrl = `${apiURL}/api/Announcements/createAnnouncement?departmentId=${departmentId}`;
    }
    const response = await fetch(requestUrl, requestOptions);
    if (response.status === 200) {
      swalToast("Announcement added successfully", "success");
      setOpen(false);
      window.location.reload();
    } else {
      let respJson = await response.json();
      setOpen(false);
      swalShowErrors("Something went wrong!", respJson.errors);
    }
  };
  return (
    <div>
      <Button variant="outlined" color="success" onClick={handleClickOpen}>
        <AddAlertIcon />
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Create Announcement
        </BootstrapDialogTitle>
        <DialogContent
          dividers
          style={{ display: "flex", flexDirection: "column", width: "500px" }}
        >
          <TextField
            id="outlined-basic"
            label="Title"
            name="title"
            variant="outlined"
            onChange={handleChange}
            style={{ marginBottom: "20px" }}
          />
          <TextField
            id="outlined-basic"
            name="content"
            label="Content"
            variant="outlined"
            multiline
            rows={4}
            onChange={handleChange}
          />
          {
            userIsInRole(roles.hrSenior) || userIsInRole(roles.hrJunior) ?
            <Select
              id="department"
              label="Department"
              labelId="Department"
              name="department"
              onChange={handleChange}
              value={departmentId}
              style={{
                marginTop: "7px"
              }}
            >
              {departments.map((dep) => (
                <MenuItem key={dep.id} value={dep.id}>
                  {dep.name}
                </MenuItem>
              ))}
            </Select>
            :
            null
          }
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="success" onClick={handleSubmit}>
            Create
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
