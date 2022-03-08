import React, {useEffect} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

const theme = createTheme();

function Login() {
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: data.get("firstname"),
        lastname: data.get("lastname"),
        email: data.get("email"),
        password: data.get("password"),
      }),
    };
    const response = await fetch(
      "https://localhost:7057/api/Account/Register",
      requestOptions
    );
    if (response.status === 200) {
      const data2 = await response.json();
      alert("Account Was Created Successfully!");
      navigate("/login");
    } else {
      alert("Something is wrong!");
    }

  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{ marginTop: "150px" }}>
        <Box
          sx={{
            marginTop: 8,
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
              dir="ltr"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
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

export default Login;
