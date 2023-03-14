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
import SendMessage from "./SendMessage";
import Avatar from "@mui/material/Avatar";
import { apiURL } from "../../envvars";
import { VisibilityOff } from "@mui/icons-material";
import { swalShow } from '../../Utility/swal';

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

export default function ViewTicket({ ticketId, selectedTicket }) {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = useState([]);
  const getData = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      `${apiURL}/api/Tickets/${ticketId}/messages`,
      requestOptions
    );
    if (response.status === 200) {
      const msgs = await response.json();
      setMessages(msgs);
    } else {
      const respJson = await response.json();
      console.log(respJson);
      swalShow("Something went wrong!", "", "error");
    }
  }
  const handleClickOpen = async () => {
    setOpen(true);
    getData();
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSent = () => {
    getData();
  }
  return (
    <div>
      <Button
        variant="contained"
        color="success"
        disabled={!ticketId}
        onClick={handleClickOpen}
      >
        View Ticket
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
          {selectedTicket.subject}
        </BootstrapDialogTitle>
        <DialogContent
          dividers
          style={{ display: "flex", flexDirection: "column" }}
        >
          {messages.map((message) => {
            let msgTimestamp = message.timestampUtc.substring(0, message.timestampUtc.lastIndexOf(":"));
            msgTimestamp = msgTimestamp.replace("T", " ")
            let msgClass = message.senderId === localStorage.getItem("userId") ? "sender" : "receiver";
            if(message.isInternalNote){
              msgClass = "internal-note"
            }
            return (
              <div
                key={message.id}
                style={{
                  border: "1px solid grey",
                  margin: "5px",
                  borderRadius: "5px",
                  boxShadow: "1px 1px 5px lightblue",
                  boxShadow: "-1px -1px 5px lightblue",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  paddingTop: "10px",
                  paddingBottom: "10px"
                }}
                className={msgClass}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    margin: "10px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={message.senderPfpUrl ? message.senderPfpUrl : "/static/images/avatar/1.jpg"}
                      style={{marginRight:"5px"}}
                    />
                    <h2>{message.senderName}</h2>
                    {message.isInternalNote ? <VisibilityOff style={{
                      marginTop: "2px",
                      marginLeft: "0.25rem",
                      color: "gray",
                      opacity: "0.7"
                    }}/> : null}
                  </div>
                  <p style={{ opacity: 0.5 }}>{msgTimestamp}</p>
                </div>
                <p 
                style={{
                  marginTop: "15px",
                  marginLeft: "12px",
                  marginBottom: "10px"
                }}
                >{message.content}</p>
              </div>
            );
          })}
        </DialogContent>
        <DialogActions>
          <SendMessage ticketId={ticketId} onSent={handleSent} />
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
