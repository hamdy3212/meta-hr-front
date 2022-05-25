import React from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import "./Home.css";
const Home = () => {
  return (
    <Grid style={{ display: "flex" }}>
      <Grid xs={6}>
        <h1>Opened Tickets</h1>
        <p>
          {" "}
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus illum
          rerum exercitationem sed ab ipsam labore veritatis, voluptas nihil,
          tenetur quis et commodi id sequi ut cum quod, modi voluptatibus.
        </p>
      </Grid>
      <Grid xs={6} style={{ padding: "0 5px" }}>
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Announcements
        </h1>
        <div className="announcement-card">
          <div className="announcement-card-header">
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              style={{ marginRight: "5px" }}
            />
            <div>
              <h2 style={{ margin: 0 }}>Hamdy Youssef</h2>
              <h3 style={{ margin: 0 }}>Senior Hr</h3>
              <p style={{ margin: "0px", opacity: "0.7" }}> 13th jan 2022 </p>
            </div>
          </div>
          <hr style={{ width: "40%", marginLeft: "0px" }} />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus
            illum rerum exercitationem sed ab ipsam labore veritatis, voluptas
            nihil, tenetur quis et commodi id sequi ut cum quod, modi
            voluptatibus.
          </p>
        </div>
      </Grid>
    </Grid>
  );
};

export default Home;
