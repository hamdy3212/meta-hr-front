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
import ErrorsDisplayer from "../ErrorsDisplayer";

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

export default function CustomizedDialogs({ onCreated }) {
  const [open, setOpen] = React.useState(false);
  const [from, setFrom] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [errors, setErrors] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setErrors([]);
    setFrom("");
    setNumberOfDays(1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    setErrors([]);
    if (from === "" || from === null) {
      setErrors(["The From field is required."]);
      return;
    }
    if (numberOfDays === "" || numberOfDays === null) {
      setErrors(["The Number of Days field is required."]);
      return;
    }
    if (
      Number.parseInt(numberOfDays) > 14 ||
      Number.parseInt(numberOfDays) < 1
    ) {
      console.log(numberOfDays)
      setErrors(["Number of Days must be a number between 1 and 14."]);
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        from: from,
        numberOfDays: numberOfDays,
      }),
    };
    const response = await fetch(
      `${apiURL}/api/VacationRequests`,
      requestOptions
    );
    if (response.status === 200) {
      setOpen(false);
      swalToast("Vacation requested successfully!", "success");
      onCreated();
    } else {
      const respJson = await response.json();
      setOpen(false);
      swalShowErrors("Something went wrong", respJson.errors);
    }
  };
  return (
    <div>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        Request Vacation
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
          Request Vacation
        </BootstrapDialogTitle>
        <DialogContent
          dividers
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label class="labels">Start Date</label>
          <input
            id="vacationRequestDate"
            style={{ marginBottom: "10px" }}
            type="date"
            onChange={(e) => setFrom(e.target.value)}
            className="form-control"
          />
          <TextField
            id="numberOfDays"
            label="Number of Days"
            type="number"
            defaultValue={1}
            onChange={(e) => setNumberOfDays(e.target.value)}
          />
          <div style={{marginTop: "10px"}}>
            <ErrorsDisplayer errors={errors} />
          </div>
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
