import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate, useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { apiURL } from "../envvars";

const theme = createTheme();
function ResetPw() {
  let queryParams = new URLSearchParams(document.location.search);
  let userId = queryParams.get("userId");
  let token = queryParams.get("token");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("password").length < 6) {
      setErrors(["Password must be at least 6 characters."]);
      return;
    }
    if (data.get("password") !== data.get("password2")) {
      setErrors(["Password doesn't match."]);
      return;
    }
    // eslint-disable-next-line no-console
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        resetPasswordToken: token,
        password: data.get("password"),
      }),
    };
    const response = await fetch(
      `${apiURL}/api/Account/ResetPassword`,
      requestOptions
    );
    const data2 = await response.json();
    if (response.status === 200) {
      console.log(data2);
      alert("Password Created Successfully!");
    } else {
      setErrors(data2.errors);
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
            Reset Your Password
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
              id="Password"
              label="Confirm Password"
              name="password2"
              type="password"
              autoFocus
              dir="ltr"
            />
            {errors && <p style={{ color: "red" }}>{errors[0]}</p>}
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
                <Link href="/login" variant="body2">
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
