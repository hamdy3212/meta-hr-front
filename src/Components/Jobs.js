import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { apiURL } from "../envvars";
import { Button } from "@mui/material";
import {
  swalToast,
  swalConfirm,
  swalShowErrors,
  swalShow,
} from "../Utility/swal";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectCategories, setselectCategories] = useState([]);
  const navigate = useNavigate();
  const htmlRegex = /(<([^>]+)>)/gi;
  const handleChange = (event) => {
    if (Array.isArray(event.target.value)) {
      setCategories(event.target.value);
    } else {
      setCategories([event.target.value]);
    }
  };
  const handleViewJob = (jid) => {
    navigate("/jobs/" + jid);
  };
  const handleDelete = async (jpId) => {
    const confirmed = await swalConfirm(
      "Are you sure you want to delete this job posting?",
      "This action cannot be undone!",
      "warning"
    );
    if (!confirmed) {
      return;
    }
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const resp = await fetch(
      `${apiURL}/api/JobPostings/${jpId}`,
      requestOptions
    );
    const respJson = await resp.json();
    if (respJson.isSuccessful) {
      swalToast("Job Posting deleted successfully!", "success");
      getData();
    } else {
      swalShowErrors("Something went wrong!", respJson.errors);
    }
  };

  const getData = () => {
    fetch(`${apiURL}/api/JobPostings`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        let categoriesTemp = [];
        result.map((job) => {
          if (!categoriesTemp.includes(job.category)) {
            categoriesTemp.push(job.category);
          }
        });
        setCategories(categoriesTemp);
        setselectCategories(categoriesTemp);
        setJobs(result);
      })
      .catch((error) => {
        swalShow("Something went wrong", "", "error");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <h1 style={{ marginTop: "8px", textAlign: "center" }}>Open Positions </h1>
      <div
        style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          disabled={console.log("first")}
          color="primary"
          style={{marginRight: "auto"}}
          onClick={() => navigate("/addJob")}
        >
          New
        </Button>
        <h2>Filter By</h2>
        <FormControl style={{ marginLeft: "10px", width: "25%" }}>
          <InputLabel id="filter">Category</InputLabel>
          <Select
            labelId="filter"
            id="filter"
            label="Category"
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value={selectCategories} key={"a"}>
              <em>None</em>
            </MenuItem>
            {selectCategories.map((category, index) => {
              return (
                <MenuItem value={category} key={index}>
                  {category}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      {categories.map((category, index) => {
        return (
          <section key={index}>
            <h1>{category}</h1>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {jobs.map((job, index) => {
                if (job.category === category) {
                  return (
                    <Card
                      sx={{
                        maxWidth: 345,
                        marginBottom: "20px",
                        marginRight: "30px",
                      }}
                      key={index}
                      style={{
                        backgroundColor: "#d6e8ff",
                      }}
                    >
                      <CardContent>
                        <div
                          onClick={() => handleViewJob(job.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <Typography gutterBottom variant="h5" component="div">
                            {job.title} - (ID: {job.id})
                          </Typography>
                          <Typography gutterBottom variant="h5" component="div">
                            {job.descriptionHtml.length > 100
                              ? job.descriptionHtml
                                  .replace(htmlRegex, " ")
                                  .replace(/\s+/g, " ")
                                  .substring(0, 100) + "..."
                              : job.descriptionHtml
                                  .replace(htmlRegex, " ")
                                  .replace(/\s+/g, " ")}
                          </Typography>
                        </div>
                        <Button
                          variant="contained"
                          onClick={() => handleDelete(job.id)}
                          disabled={console.log("first")}
                          color="error"
                        >
                          Delete
                        </Button>
                      </CardContent>
                    </Card>
                  );
                }
              })}
            </div>
          </section>
        );
      })}
    </Container>
  );
};

export default Jobs;
