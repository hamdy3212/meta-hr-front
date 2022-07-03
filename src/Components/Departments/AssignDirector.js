import React, { useState, useEffect } from "react";
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
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { apiURL } from "../../envvars";
import { swalToast } from '../../Utility/swal'

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

export default function CustomizedDialogs({ departmentId }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = React.useState(false);
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    console.log(departmentId, employeeId);
    const response = await fetch(
      `${apiURL}/api/Departments/${departmentId}/assignDirector?directorId=${employeeId}`,
      requestOptions
    );
    if (response.status === 200) {
      swalToast("Director assigned successfully.", "success");
      setOpen(false);
    } else {
      const respJson = await response.json();
      swalToast(respJson.errors.join(" "), "error");
      setOpen(false);
    }
  };
  const handleClickOpen = () => {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    fetch(`${apiURL}/api/Employees`, requestOptions)
      .then((response) => response.json())
      .then((rowData) => {
        const depEmployees = rowData.filter((employee)=>{
          return employee.departmentId == departmentId
        })
        setEmployees(depEmployees);
      });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Assign Director
      </Button>
      <BootstrapDialog
        fullScreen={fullScreen}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Assign Director
        </BootstrapDialogTitle>
        <DialogContent dividers style={{ height: "300px" }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={employees}
            getOptionLabel={(option) => `${option.firstName} ${option.lastName} - (${option.email})`}
            onChange={(event, newValue) => {
              setEmployeeId(newValue.id);
            }}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Employees" />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit}>
            Assign
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
