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
import { apiURL } from "../../envvars";
import { swalShow, swalToast } from "../../Utility/swal";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function SendMessage({ ticketId, onSent }) {
  const [content, setContent] = useState("");
  const [isNote, setIsNote] = useState(false);

  const handleSubmit = async (event) => {
    if (content.length < 1) {
      swalShow("Message can't be empty!", "", "error");
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
      `${apiURL}/api/Tickets/createMessage?ticketId=${ticketId}&content=${content}&isInternalNote=${isNote}`,
      requestOptions
    );
    if (response.status === 200) {
      swalToast("Message sent successfully", "success");
      setIsNote(false);
      setContent("");
      onSent();
    } else {
      const respJson = await response.json();
      console.log(respJson)
      swalToast("Something went wrong!", "error");
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
          value={content}
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
      {
        localStorage.getItem("role") === "HR_Senior" || localStorage.getItem("role") === "HR_Junior" ?
        <Grid item xs={6}>
          <FormControlLabel 
            label="Is Internal Note?"
            control={<Checkbox 
              id="isNote"
              label="isNote"
              onChange={(e) => setIsNote(e.target.checked)}
            />}
          />
        </Grid>
        :
        null
      }
    </Grid>
  );
}
