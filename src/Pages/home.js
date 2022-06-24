import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import CreateAnnouncement from "../Components/createAnnouncement";
import InfiniteScroll from "react-infinite-scroll-component";

import "./Home.css";
const Home = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [announcementsPageNumber, setAnnouncementsPageNumber] = useState(1);
  const [hasMoreAnnouncements, setHasMoreAnnouncements] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [hasMoreTickets, setHasMoreTickets] = useState(true);
  const [ticketsPageNumber, setTicketsPageNumber] = useState(1);
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const loadAnnouncements = () => {
    // fetch Announcements
    fetch(
      `https://localhost:7057/api/Announcements?pageNumber=${announcementsPageNumber}&pageSize=9`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setAnnouncements([...announcements, ...data.objects]);
        if(data.objects.length < 9) {
          setHasMoreAnnouncements(false)
        }
      });
    setAnnouncementsPageNumber(announcementsPageNumber + 1);
    
  };
  const loadTickets = () => {
    // fetch Tickets
    fetch(
      `https://localhost:7057/api/Tickets?pageNumber=${ticketsPageNumber}&pageSize=10`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setTickets([...tickets, ...data.objects]);
        if(data.objects.length < 10) {
          setHasMoreTickets(false)
        }
      });
    setTicketsPageNumber(ticketsPageNumber + 1);
  };
  useEffect(() => {
    loadTickets();
    loadAnnouncements();
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
          {tickets.length === 0 ? (
            <h1>There is no opened Tickets right now.</h1>
          ) : (
            <InfiniteScroll
              dataLength={tickets.length} //This is important field to render the next data
              next={loadTickets}
              hasMore={hasMoreTickets}
              loader={<h4>Loading...</h4>}
              style={{display:"flex", flexWrap:"wrap"}}

              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>There is no more opened tickets.</b>
                </p>
              }
            >
              {tickets.map((ticket, index) => {
                return (
                  <Grid
                    key={index}
                    xs={6}
                    style={{ padding: "0 5px", marginBottom: "10px" }}
                  >
                    <div className="announcement-card">
                      <div className="announcement-card-header">
                        <Avatar
                          src={ticket.creatorPfpURL ? ticket.creatorPfpURL : "/static/images/avatar/1.jpg"}
                          style={{ marginRight: "5px" }}
                        />
                        <div>
                          <h2>{ticket.creatorName}</h2>
                          <h4>
                            Employee at {ticket.creatorDepartmentName}{" "}
                            departement
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
              })}
            </InfiniteScroll>
          )}
        </div>
      </Grid>
      <Grid xs={5} style={{ padding: "0 5px" }}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}> 

        <h1
          style={{
            textAlign: "center",
            margin: "10px 10px 10px 0",
          }}
          >
          Announcements 
        </h1>
        <CreateAnnouncement />
          </div>
        {announcements.length === 0 ? (
          <h1>There is no Announcements.</h1>
        ) : (
          <InfiniteScroll
            dataLength={tickets.length} //This is important field to render the next data
            next={loadAnnouncements}
            hasMore={hasMoreAnnouncements}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>You have seen all the announcements</b>
              </p>
            }
          >
            {announcements.map((announcement,index) => {
              return (
                <div
                  key={index}
                  className="announcement-card"
                  style={{ marginBottom: "15px" }}
                >
                  <div className="announcement-card-header">
                    <Avatar
                      src={announcement.authorPfpURL ? announcement.authorPfpURL : "/static/images/avatar/1.jpg"}
                      style={{ marginRight: "5px" }}
                    />
                    <div>
                      <h2>{announcement.authorName}</h2>
                      {/* <h3>title or position</h3> */}
                      <p style={{ margin: "0px", opacity: "0.7" }}>
                        created at :{announcement.createdAt.split("T")[0]}
                      </p>
                    </div>
                  </div>
                  <hr style={{ width: "40%", marginLeft: "0px" }} />
                  <p>{announcement.content} </p>
                </div>
              );
            })}
          </InfiniteScroll>
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
