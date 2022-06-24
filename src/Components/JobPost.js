import React, {useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as ReactQuill from 'react-quill'; // Typescript
import 'react-quill/dist/quill.snow.css'; // ES6

const theme = createTheme();

function JobPost() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(text);
    // eslint-disable-next-line no-console
    const requestOptions = {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
     },
      body: JSON.stringify({
        title: data.get("title"),
        descriptionHtml: text,
        category: data.get("category"),
      }),
    };
    const response = await fetch(
      "https://localhost:7057/api/JobPostings",
      requestOptions
    );
    if (response.status === 200) {
      const data2 = await response.json();
      console.log(data2);
      alert("Job was addedd successfully")
      navigate("/jobs");
    } else {
      alert("something is wrong!");
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
            Add Job
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
              id="title"
              label="title"
              name="title"
              autoComplete="title"
              autoFocus
              dir="ltr"
            />
            {/* <TextField
              dir="ltr"
              margin="normal"
              required
              fullWidth
              name="descriptionHtml"
              label="descriptionHtml"
              type="descriptionHtml"
              id="descriptionHtml"
              autoComplete="descriptionHtml"
            /> */}
                  <ReactQuill value={text}
                                name="descriptionHtml"
                                style={{height:"300px",marginBottom:"50px"}}
                  onChange={(e)=>setText(e)}
                />
            <TextField
              dir="ltr"
              margin="normal"
              required
              fullWidth
              name="category"
              label="category"
              type="category"
              id="category"
              autoComplete="category"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Job
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default JobPost;
