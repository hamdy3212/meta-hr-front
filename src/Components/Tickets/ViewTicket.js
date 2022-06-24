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
  const handleClickOpen = async () => {
    setOpen(true);
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      `https://localhost:7057/api/Tickets/${ticketId}/messages`,
      requestOptions
    );
    if (response.status === 200) {
      const data2 = await response.json();
      console.log(data2);
      setMessages(data2);
    } else {
      alert("something is wrong!");
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
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
            console.log(msgTimestamp);
            return (
              <div
                style={{
                  border: "1px solid grey",
                  margin: "5px",
                  borderRadius: "5px",
                  padding: "0px 10px",
                  boxShadow: "1px 1px 5px lightblue",
                  boxShadow: "-1px -1px 5px lightblue",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  paddingTop: "10px",
                  paddingBottom: "10px"
                }}
                className={`${
                  message.senderId === localStorage.getItem("userId")
                    ? "sender"
                    : "receiver"
                }`}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap:"wrap"
                  }}
                >
                  <div style={{display:"flex", alignItems:"center"}}>
                    <Avatar
                      src={message.senderPfpUrl ? message.senderPfpUrl : "/static/images/avatar/1.jpg"}
                      style={{marginRight:"5px"}}
                    />
                    <h2>{message.senderName}</h2>
                  </div>
                  <p style={{ opacity: 0.5 }}>{msgTimestamp}</p>
                </div>
                <p 
                style={
                  {marginTop: "15px"}
                }
                >{message.content}</p>
              </div>
            );
          })}
        </DialogContent>
        <DialogActions>
          <SendMessage ticketId={ticketId} />
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
