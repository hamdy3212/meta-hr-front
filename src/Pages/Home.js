import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import CreateAnnouncement from "../Components/createAnnouncement";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Home.css";
import { apiURL } from "../envvars";
import { userIsInRole, roles } from "../Utility/roles";

const Home = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [announcementsPageNumber, setAnnouncementsPageNumber] = useState(1);
  const [hasMoreAnnouncements, setHasMoreAnnouncements] = useState(true);

  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const loadAnnouncements = () => {
    // fetch Announcements
    fetch(
      `${apiURL}/api/Announcements?pageNumber=${announcementsPageNumber}&pageSize=9`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setAnnouncements([...announcements, ...data.objects]);
        if (data.objects.length < 9) {
          setHasMoreAnnouncements(false);
        }
      });
    setAnnouncementsPageNumber(announcementsPageNumber + 1);
  };
  useEffect(() => {
    loadAnnouncements();
  }, []);
  return (
    <Grid
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid xs={6} style={{ padding: "0 5px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              margin: "10px 10px 10px 0",
            }}
          >
            Announcements
          </h1>
          {userIsInRole(roles.hrSenior) ||
          userIsInRole(roles.hrJunior) ||
          userIsInRole(roles.departmentDirector) ? (
            <CreateAnnouncement />
          ) : null}
        </div>
        {announcements.length === 0 ? (
          <h1>There is no Announcements.</h1>
        ) : (
          <InfiniteScroll
            dataLength={announcements.length} //This is important field to render the next data
            next={loadAnnouncements}
            hasMore={hasMoreAnnouncements}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>You have seen all the announcements</b>
              </p>
            }
            style={{ maxWidth: "720px" }}
          >
            {announcements.map((announcement, index) => {
              return (
                <div
                  key={index}
                  className="announcement-card"
                  style={{ marginBottom: "15px", minWidth: "400px" }}
                >
                  <div className="announcement-card-header">
                    <Avatar
                      src={
                        announcement.authorPfpURL
                          ? announcement.authorPfpURL
                          : "/static/images/avatar/1.jpg"
                      }
                      style={{ marginRight: "5px" }}
                    />
                    <div>
                      <h2>{announcement.authorName}</h2>
                      <p style={{ margin: "0px", opacity: "0.7" }}>
                        {announcement.createdAt.split("T")[0]}
                      </p>
                    </div>
                    <h4
                      style={{
                        marginLeft: "auto",
                        marginRight: "10px",
                        color: "#6c757d",
                      }}
                    >
                      {announcement.departmentName != null
                        ? announcement.departmentName
                        : "Global"}
                    </h4>
                  </div>
                  <hr style={{ width: "100%", marginLeft: "0px" }} />
                  <h3>{announcement.title}</h3>
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
