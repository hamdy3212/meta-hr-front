import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useParams, useSearchParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { apiURL } from "../envvars";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { swalShowErrors, swalToast } from "../Utility/swal";

const theme = createTheme();

function Register() {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  let userId = searchParams.get("userId");
  let token = searchParams.get("token");
  useEffect(() => {
    if (localStorage.getItem("userId") !== null) {
      navigate("/");
      return;
    }
    async function checkToken() {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          token: token
        })
      };
      const resp = await fetch(
        `${apiURL}/api/account/verifyToken`,
        requestOptions
      );
      if (resp.status !== 200) {
        const respJson = await resp.json();
        swalShowErrors("Invalid Onboarding Link", respJson.errors);
      }
    }

    checkToken();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let queryParams = new URLSearchParams(document.location.search);
    let userId = queryParams.get("userId");
    let token = queryParams.get("token");
    data.append("userId", userId);
    data.append("resetPasswordToken", token);

    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", `${apiURL}/api/employees/onboard`);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.onload = () => {
      let data = xhr.response;
      console.log(data);
      if (data.isSuccessful === false) {
        swalShowErrors("Something went wrong", data.errors);
      } else {
        swalToast("Onboarding complete, you may now log in", "success");
        navigate("/login");
      }
    };
    xhr.send(data);
  };
  return (
    <ThemeProvider theme={theme}>
      <h1 style={{ textAlign: "center", marginTop: "8px" }}>
        Complete Your Registration
      </h1>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
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
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Register;
