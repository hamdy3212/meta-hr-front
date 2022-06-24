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
import Grid from "@mui/material/Grid";

export default function SendMessage({ ticketId }) {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    if (content.length < 1) {
      alert("Message can't be empty!");
      return;
    }
    event.preventDefault();
    // eslint-disable-next-line no-console
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      `https://localhost:7057/api/Tickets/createMessage?ticketId=${ticketId}&content=${content}&isInternalNote=false`,
      requestOptions
    );
    if (response.status === 200) {
      const data2 = await response.json();
      alert("Message sent successfully");
    } else {
      alert("something is wrong!");
    }
  };
  return (
    <Grid
      container
      style={{
        display: "flex",
        alignItems: "stretch",
      }}
    >
      <Grid item xs={9}>
        <TextField
          id="message"
          label="Message"
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          rows={4}
        />
      </Grid>
      <Grid item xs={3} style={{ padding: "1px 5px" }}>
        <Button
          size="large"
          autoFocus
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ flex: "1", height: "100%" }}
        >
          Send
        </Button>
      </Grid>
    </Grid>
  );
}
