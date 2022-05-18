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
function ResetPw() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json",
    },
      body: JSON.stringify({
        userId: data.get("userId"),
        resetPasswordToken: data.get("resetPasswordToken"),
        password: data.get("password"),
      }),
    };
    const response = await fetch(
      "https://localhost:7057/api/Account/ResetPassword",
      requestOptions
    );
    if (response.status === 200) {
      const data2 = await response.json();
      console.log(data2);
      alert("Password Created Successfully!");
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
              id="userId"
              label="User Id"
              name="userId"
              autoComplete="userId"
              autoFocus
              dir="ltr"
            />
                <TextField
              margin="normal"
              required
              fullWidth
              id="Password"
              label="Password"
              name="password"
              type="password"
              autoFocus
              dir="ltr"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="resetPasswordToken"
              label="Reset Password Token"
              name="resetPasswordToken"
              autoFocus
              dir="ltr"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Password
            </Button>
            <Grid container>
              <Grid item>
                <Link href="login" variant="body2">
                  Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ResetPw;
