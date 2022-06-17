import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import CreateAnnouncement from "../Components/createAnnouncement";

import "./Home.css";
const Home = () => {
  const [tickets, setTickets] = useState({ objects: [], totalCount: 0 });
  const [announcements, setAnnouncements] = useState({
    objects: [],
    totalCount: 0,
  });

  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }; // fetch Tickets
  useEffect(async () => {
    fetch("https://localhost:7057/api/Announcements?pageSize=8", requestOptions)
    .then((response2) => response2.json())
    .then((data2) => {
      console.log("data");
      setAnnouncements(data2);
    });
    fetch(
      "https://localhost:7057/api/Tickets?pageNumber=1&pageSize=8",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setTickets(data);
      });
  
  }, []);
  return (
    <Grid style={{ display: "flex" }}>
      <Grid xs={7} style={{ padding: "0 5px", borderRight: "3px solid black" }}>
        <h1 style={{ textAlign: "center", margin: "10px 0" }}>
          Opened Tickets
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {tickets.totalCount === 0 ? (
            <h1>There is no opened Tickets right now.</h1>
          ) : (
            tickets.objects.map((ticket, index) => {
              return (
                <Grid  key={index} xs={6} style={{ padding: "0 5px", marginBottom: "10px" }}>
                  <div className="announcement-card">
                    <div className="announcement-card-header">
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        style={{ marginRight: "5px" }}
                      />
                      <div>
                        <h2>{ticket.creatorName}</h2>
                        <h4>
                          Employee at {ticket.creatorDepartmentName} departement
                        </h4>
                      </div>
                    </div>
                    <hr style={{ width: "40%", marginLeft: "0px" }} />
                    <h3 style={{ color: "green" }}>
                      Ticket Subject: {ticket.subject}
                    </h3>
                    <h4>Last Message: {ticket.lastMessage}</h4>
                    <p style={{ margin: "0px", opacity: "0.7" }}>
                      created at: {ticket.createdAt.split("T")[0]}
                    </p>
                  </div>
                </Grid>
              );
            })
          )}
        </div>
      </Grid>
      <Grid xs={5} style={{ padding: "0 5px" }}>
        <h1
          style={{
            textAlign: "center",
            margin: "10px 0",
          }}
        >
          Announcements
        </h1>
        {announcements.totalCount === 0 ? (
          <h1>There is no Announcements.</h1>
        ) : (
          announcements.objects.map((announcement) => {
            return (
              <div className="announcement-card">
                <div className="announcement-card-header">
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    style={{ marginRight: "5px" }}
                  />
                  <div>
                    <h2>Hamdy Youssef</h2>
                    <h3>Senior Hr</h3>
                    <p style={{ margin: "0px", opacity: "0.7" }}>
                      {" "}
                      13th jan 2022{" "}
                    </p>
                  </div>
                </div>
                <hr style={{ width: "40%", marginLeft: "0px" }} />
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Natus illum rerum exercitationem sed ab ipsam labore
                  veritatis, voluptas nihil, tenetur quis et commodi id sequi ut
                  cum quod, modi voluptatibus.
                </p>
              </div>
            );
          })
        )}
        <CreateAnnouncement/>
      </Grid>
    </Grid>
  );
};

export default Home;
