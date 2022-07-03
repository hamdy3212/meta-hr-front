import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiURL } from "../envvars";
import { swalShowErrors } from "../Utility/swal";

const Job = () => {
  let { jobID } = useParams();
  const [jobData, setJobData] = useState({});
  useEffect(async () => {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const resp = await fetch(
      `${apiURL}/api/jobPostings/${jobID}`,
      requestOptions
    );
    const respJson = await resp.json();
    if (resp.status === 200) {
      setJobData(respJson);
    } else {
      swalShowErrors("Something went wrong!", respJson.errors);
    }
  }, []);
  return (
    <div className="container" style={{ marginTop: "-15px" }}>
      <div>
        <h1 style={{textAlign:"center"}}>
          {jobData.title} - (ID: {jobData.id})
        </h1>
        <div id="descDiv"
          style={{
            maxWidth: "600px",
            border: "1px solid gray",
            borderRadius: "10px",
            padding: "15px 15px"
          }}
          dangerouslySetInnerHTML={{__html: jobData.descriptionHtml}}
        >
        </div>
      </div>
    </div>
  );
};

export default Job;
