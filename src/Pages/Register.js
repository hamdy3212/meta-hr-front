import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const theme = createTheme();


const Roles = ["Employee", "HR_Senior", "HR_Junior"];
function Register() {
  const [departments, setDepartments] = useState([])
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }; // fetch departments
  useEffect(() => {
    fetch("https://localhost:7057/api/Departments", requestOptions)
      .then((response) => response.json())
      .then((rowData) => {
        setDepartments(rowData);
      });
  }, []);
  // const navigate = useNavigate();
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
      headers: { "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
      body: JSON.stringify({
        firstName: data.get("firstname"),
        lastName: data.get("lastname"),
        email: data.get("email"),
        role: data.get("role"),
        title: data.get("title"),
        departmentId: data.get("department"),
        dateOfBirth: "2022-05-16T12:33:26.531Z",
        dateHired: "2022-05-16T12:33:26.531Z",
      }),
    };
    const response = await fetch(
      "https://localhost:7057/api/Employees",
      requestOptions
    );
    if (response.status === 200) {
      const data2 = await response.json();
      console.log(data2);
      alert("Account Was Created Successfully!");
    } else {
      alert("Something is wrong!");
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
            Register
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
              label="first name"
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
              label="last name"
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
                      <MenuItem key={Role} value={Role}>
                        {Role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Register;
