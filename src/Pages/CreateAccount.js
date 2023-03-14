import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { apiURL } from "../envvars";
import ErrorsDisplayer from "../Components/ErrorsDisplayer";
import { Router } from "@mui/icons-material";
import { swalShow, swalShowErrors, swalToast } from "../Utility/swal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const Roles = [
  { val: "Employee", display: "Employee" },
  { val: "HR_Junior", display: "HR Junior" },
  { val: "HR_Senior", display: "HR Senior" },
];

function CreateAccount() {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const [errors, setErrors] = useState([]);
  // fetch departments
  useEffect(() => {
    fetch(`${apiURL}/api/Departments`, requestOptions)
      .then((response) => response.json())
      .then((rowData) => {
        setDepartments(rowData);
      });
  }, []);
  //const navigate = useNavigate();
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     navigate("/");
  //   }
  // });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        firstName: data.get("firstname"),
        lastName: data.get("lastname"),
        email: data.get("email"),
        role: data.get("role"),
        title: data.get("title"),
        departmentId: data.get("department"),
        dateOfBirth: data.get("dateOfBirth"),
        dateHired: data.get("dateHired"),
      }),
    };
    const response = await fetch(`${apiURL}/api/Employees`, requestOptions);
    const respJson = await response.json();
    if (response.status === 200) {
      Swal.fire({
        title: "Account Created Successfully",
        text: "",
        icon: "success",
      }).then(() => {
        navigate("/employees");
      });
    } else if (response.status === 400 || response.status === 404) {
      setErrors(respJson.errors);
    } else {
      swalShowErrors("Error", respJson.errors);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{ marginTop: "50px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Create New Employee Account
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="First Name"
              name="firstname"
              autoComplete="firstname"
              autoFocus
              dir="ltr"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Last Name"
              name="lastname"
              autoComplete="lastname"
              autoFocus
              dir="ltr"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              dir="ltr"
            />
            <TextField
              type="date"
              label="Date of Birth"
              id="dateOfBirth"
              name="dateOfBirth"
              required
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginTop: "16px", marginBottom: "8px" }}
            />
            <TextField
              type="date"
              label="Date Hired"
              id="dateHired"
              name="dateHired"
              required
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginTop: "16px", marginBottom: "8px" }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
              dir="ltr"
            />
            <Grid container>
              <Grid xs="6" style={{ padding: "2px" }}>
                <FormControl fullWidth>
                  <InputLabel id="department">Department</InputLabel>
                  <Select
                    labelId="department"
                    id="department"
                    label="Department"
                    name="department"

                    // onChange={handleChange}
                  >
                    {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
                    {departments.map((department) => (
                      <MenuItem key={department.id} value={department.id}>
                        {department.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs="6" style={{ padding: "2px" }}>
                <FormControl fullWidth>
                  <InputLabel id="role">Role</InputLabel>
                  <Select
                    labelId="role"
                    id="role"
                    label="Role"
                    name="role"
                    fullWidth
                    // onChange={handleChange}
                  >
                    {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
                    {Roles.map((Role) => (
                      <MenuItem key={Role.val} value={Role.val}>
                        {Role.display}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            {errors.length > 0 ? (
              <div style={{ marginTop: "16px" }}>
                <ErrorsDisplayer errors={errors} />
              </div>
            ) : (
              ""
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Account
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default CreateAccount;
