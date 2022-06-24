import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const theme = createTheme();

function Register() {
  const [selectedImage, setSelectedImage] = useState(null);
  const { userId, token } = useParams();
  const handleSubmit = async (event) => {
    
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let queryParams = new URLSearchParams(document.location.search);
    let userId = queryParams.get("userId");
    let token = queryParams.get("token");
    data.append("userId", userId);
    data.append("resetPasswordToken", token);
    let prodUrl = "https://api.metahr.live";
    let devUrl = "https://localhost:7057";

    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", `${devUrl}/api/employees/onboard`);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.onload = () => {
        let data = xhr.response;
        console.log(data);
        if (data.isSuccessful == false) {
          console.log(data.errors);
        }
      };
      xhr.onreadystatechange = function () {
        if (xhr.status != 200) {
          console.log("response code not 200!");
          console.log(xhr.status);
        }
      };
    xhr.send(data);

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
            onboard
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <div>
              {selectedImage && (
                <div>
                  <img
                    alt="not fount"
                    width={"250px"}
                    src={URL.createObjectURL(selectedImage)}
                  />
                  <br />
                  <button onClick={() => setSelectedImage(null)}>Remove</button>
                </div>
              )}
              <br />

              <br />
              <input
                type="file"
                name="ProfilePicture"
                onChange={(event) => {
                  let fName = event.target.files[0].name;
                  let dotAt = fName.lastIndexOf(".");
                  let ext = fName.substring(dotAt + 1);
                  if (ext !== "jpeg" && ext !== "jpg" && ext !== "png") {
                    alert("Only .jpeg/.jpg/.png files are supportetd!");
                    event.target.value = "";
                    return;
                  }
                  if (event.target.files[0].size > 2 * 1024 * 1024) {
                    event.target.value = "";
                    alert("Image can't be larger than 2MB!");
                    return;
                  }
                  console.log(ext);
                  console.log(event.target.files[0]);
                  setSelectedImage(event.target.files[0]);
                }}
                accept=".jpeg,.jpg,.png"
              />
            </div>
            <TextField
              margin="normal"
              required
              fullWidth
              id="GitHubURL"
              label="GitHub URL"
              name="GitHubURL"
              autoComplete="GitHubURL"
              autoFocus
              dir="ltr"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="LinkedInURL"
              label="LinkedInURL"
              name="LinkedInURL"
              autoComplete="LinkedInURL"
              autoFocus
              dir="ltr"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="PersonalWebsite"
              label="PersonalWebsite"
              name="PersonalWebsite"
              autoComplete="PersonalWebsite"
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
