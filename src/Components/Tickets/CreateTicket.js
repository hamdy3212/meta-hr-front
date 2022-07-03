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
import { apiURL } from "../../envvars";
import { swalShowErrors, swalToast } from "../../Utility/swal";

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

export default function CustomizedDialogs( {onCreated} ) {
  const [open, setOpen] = React.useState(false);
  const [subject, setSubject ] = useState("");
  const [message, setMessage ] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        subject: subject,
        message: message
      }),
    };
    const response = await fetch(
      `${apiURL}/api/Tickets/createTicket`,
      requestOptions
    );
    if (response.status === 200) {
      swalToast("Ticket created successfully!", "success");
      onCreated();
      setOpen(false);
    } else {
      const respJson = await response.json();
      swalShowErrors("Something went wrong", respJson.errors);
    }
  };
  return (
    <div>
      <Button
        variant="contained"
        color="success"
        onClick={handleClickOpen}
      >
        Create Ticket
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
          Create Ticket
        </BootstrapDialogTitle>
        <DialogContent dividers style={{display:"flex", flexDirection:"column", }}>
          <TextField
            id="subject"
            label="Subject"
            variant="outlined"
            onChange={(e)=>setSubject(e.target.value)}
            style={{marginBottom:"10px"}}
          />
          <TextField
            id="message"
            label="message"
            onChange={(e)=>setMessage(e.target.value)}
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="success" onClick={handleSubmit}>
            Send
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
