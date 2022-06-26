import React, { useState } from "react";
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
import DialogContentText from "@mui/material/DialogContentText";
import Avatar from "@mui/material/Avatar";

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

export default function ViewApplication({ selectedApplication }) {
  const [open, setOpen] = React.useState(false);
  const [CV, setCV] = React.useState("");
  const handleClickOpen = async () => {
    setOpen(true);
    // console.log(selectedApplication);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const GetCV = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      `https://localhost:7057/api/JobApplications/${selectedApplication.id}/cvURL`,
      requestOptions
    );
    console.log(response);
    if (response.status === 200) {
      setCV(response.url);
    } else {
      alert("something is wrong!");
    }
  }
  return (
    <div>
      <Button
        variant="contained"
        color="success"
        disabled={!selectedApplication.id}
        onClick={handleClickOpen}
      >
        View Application
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Application Title
        </BootstrapDialogTitle>
        <DialogContent
          dividers
          style={{ display: "flex", flexDirection: "column" }}
        >
          <span>id: {selectedApplication.id}</span>
          <span>jobPostingId: {selectedApplication.jobPostingId}</span>
          <span>jobTitle: {selectedApplication.jobTitle}</span>
          <span>receivedOnUtc :{selectedApplication.receivedOnUtc}</span>
          <span>stage: {selectedApplication.stage}</span>
          <span>firstName: {selectedApplication.firstName}</span>
          <span>lastName: {selectedApplication.lastName}</span>
          <span>email: {selectedApplication.email}</span>
          <span>phone: {selectedApplication.phone}</span>
          <span>linkedInURL: {selectedApplication.linkedInURL}</span>
          <span>gitHubURL: {selectedApplication.gitHubURL}</span>
          <span>personalWebsite: {selectedApplication.personalWebsite}</span>

          {CV && <a href={CV} target="_blank">CV</a>}
        </DialogContent>
        <DialogActions>
          <Button varinat="contained" color="success" onClick={GetCV}>
            Get CV
          </Button>
          <Button variant="contained" color="error">
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
