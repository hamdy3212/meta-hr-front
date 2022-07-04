import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { apiURL } from "../../envvars";
import { swalShowErrors, swalToast } from "../../Utility/swal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";

const style = {
  display: "flex",
  justifyContent: "space-between",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function BasicModal({ id, onCreated }) {
  const [open, setOpen] = React.useState(false);
  const [denialReason, setDenialReason] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const denyVacation = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        state: 2,
        denialReason: denialReason,
      }),
    };
    const response = await fetch(
      `${apiURL}/api/VacationRequests/${id}`,
      requestOptions
    );
    if (response.status === 200) {
      swalToast("Vacation Request Denied", "success");
      onCreated();
      setOpen(false)
    } else {
      const respJson = await response.json();
      setOpen(false)
      swalShowErrors("Something went wrong", respJson.errors);
    }
  };
  return (
    <>
      <Button onClick={handleOpen} variant="contained" color="error">
        Deny
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <TextField
              id="outlined-basic"
              label="denial reason"
              variant="outlined"
              onChange={(e) => {
                setDenialReason(e.target.value);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => denyVacation()}
            >
              Deny
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
