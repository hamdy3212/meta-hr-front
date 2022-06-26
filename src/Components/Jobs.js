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

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectCategories, setselectCategories] = useState([]);

  const handleChange = (event) => {
    if (Array.isArray(event.target.value)) {
      setCategories(event.target.value);
    } else {
      setCategories([event.target.value]);
    }
  };

  useEffect(() => {
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
        alert("يوجد خطأ ما!");
      });
  }, []);

  return (
    <Container>
      <h1>Open Positions </h1>
      <div
        style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
                      onClick={() => console.log("Job details")}
                      style={{ backgroundColor: "#d6e8ff", cursor: "pointer" }}
                    >
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {job.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {job.descriptionHtml}
                        </Typography>
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
