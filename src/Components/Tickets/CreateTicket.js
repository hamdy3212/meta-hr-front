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
  const [name, setName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        // subject: subject,
        // message: message,
      }),
    };
    const response = await fetch(
      "https://localhost:7057/api/Tickets/createTicket",
      requestOptions
    );
    if (response.status === 200) {
      const data2 = await response.json();
      console.log(data2);
      alert("Department was addedd successfully");
      setOpen(false);
    } else {
      alert("something is wrong!");
    }
  };
  return (
    <div>
      <Button
        variant="contained"
        color="success"
        value={name}
        onClick={handleClickOpen}
      >
        Create Ticket
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth="sm"
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
            name="subject"
            onChange={handleChange}
            style={{marginBottom:"10px"}}
          />
          <TextField
            id="message"
            label="message"
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
