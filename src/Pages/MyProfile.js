import { width } from "@mui/system";
import React, { useEffect, useState } from "react";
import ErrorsDisplayer from "../Components/ErrorsDisplayer";
import { apiURL } from "../envvars";
import {
  swalToast,
  swalShowErrors,
  swalConfirm,
  swalShow,
} from "../Utility/swal";
import "./MyProfile.css";

const MyProfile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "01-01-0001",
    dateHired: "01-01-0001",
    title: "",
    gitHubURL: "",
    linkedInURL: "",
    personalWebsite: "",
    profilePictureURL: "",
  });
  const [errs, setErrs] = useState([]);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const getData = async () => {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const resp = await fetch(
      `${apiURL}/api/Employees/${localStorage.getItem("userId")}`,
      requestOptions
    );
    if (resp.status !== 200) {
      const respJson = await resp.json();
      swalShowErrors("Something went wrong!", respJson.errors);
      return;
    }
    const data = await resp.json();
    setProfileData(data);
    localStorage.setItem("userPfpUrl", data.profilePictureURL);
  };
  useEffect(() => {
    async function tmp() {
      await getData();
    }
    tmp();
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const uploadNewPicture = async () => {
    let formData = new FormData();
    formData.append("employeeId", localStorage.getItem("userId"));
    formData.append("picture", profilePictureFile);
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", `${apiURL}/api/employees/changepfp`);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader(
      "Authorization",
      `bearer ${localStorage.getItem("token")}`
    );
    xhr.onload = async () => {
      let data = xhr.response;
      console.log(data);
      if (data.isSuccessful === false) {
        swalShowErrors("Something went wrong!", data.errors);
      } else {
        swalToast("Profile Picture Changed Successfully", "success");
        await getData();
        window.location.reload();
      }
    };
    xhr.onreadystatechange = function () {
      if (xhr.status !== 200) {
        swalShowErrors("Something went wrong", "");
      }
    };
    xhr.send(formData);
  };
  const handleSubmit = async () => {
    const cmd = {
      gitHubURL: profileData.gitHubURL !== "" ? profileData.gitHubURL : null,
      linkedInURL:
        profileData.linkedInURL !== "" ? profileData.linkedInURL : null,
      personalWebsite:
        profileData.personalWebsite !== "" ? profileData.personalWebsite : null,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(cmd),
    };

    const resp = await fetch(
      `${apiURL}/api/employees/updateProfile`,
      requestOptions
    );
    if (resp.status === 200) {
      swalToast("Profile Updated", "success");
      setErrs([]);
    } else if (resp.status === 400) {
      const respJson = await resp.json();
      setErrs(respJson.errors);
    } else {
      swalShow("Something went wrong", "", "error");
    }

    if (profilePictureFile !== null) {
      await uploadNewPicture();
    }
  };
  const handleDelete = async () => {
    const confirmed = await swalConfirm(
      "Are you sure you want to delete your profile picture?",
      "This action cannot be undone.",
      "warning"
    );
    if (!confirmed) {
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };
    const url = `${apiURL}/api/employees/deletepfp?employeeId=${localStorage.getItem(
      "userId"
    )}`;
    const resp = await fetch(url, requestOptions);
    const respJson = await resp.json();
    if (resp.status === 200) {
      swalToast("Profile Picture Deleted Successfully", "success");
      await getData();
      window.location.reload();
    } else {
      swalShowErrors("Something went wrong!", respJson.errors);
    }
  };
  return (
    <div id="myProfilePage">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossorigin="anonymous"
      ></link>
      <div class="container rounded bg-white mt-5 mb-5">
        <div class="row">
          <div class="offset-md-1 col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                class="rounded-circle mt-5"
                src={
                  profileData.profilePictureURL ??
                  "https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png"
                }
                style={{
                  objectFit: 'cover',
                  width: '150px',
                  height: '150px'
                }}
              /> 
              {profileData.profilePictureURL !== "" &&
              profileData.profilePictureURL !== null ? (
                <button
                  className="btn btn-outline-danger"
                  onClick={handleDelete}
                >
                  Delete Profile Picture
                </button>
              ) : null}
            </div>
          </div>
          <div class="col-md-5 border-right">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">Profile Settings</h4>
              </div>
              <div class="row mt-2">
                <div class="col-md-6">
                  <label class="labels">First Name</label>
                  <input
                    type="text"
                    class="form-control"
                    value={profileData.firstName}
                    disabled
                  />
                </div>
                <div class="col-md-6">
                  <label class="labels">Last Name</label>
                  <input
                    type="text"
                    class="form-control"
                    value={profileData.lastName}
                    disabled
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12">
                  <label class="labels">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    value={profileData.email}
                    disabled
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Date of Birth</label>
                  <input
                    type="date"
                    class="form-control"
                    value={profileData.dateOfBirth.substring(0, 10)}
                    disabled
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Date Hired</label>
                  <input
                    type="date"
                    class="form-control"
                    value={profileData.dateHired.substring(0, 10)}
                    disabled
                  />
                </div>
                <div class="row mt-2 px-0 mx-0 mb-1">
                  <div class="col-md-6">
                    <label class="labels">Title</label>
                    <input
                      type="text"
                      class="form-control"
                      value={profileData.title}
                      disabled
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="labels">Department</label>
                    <input
                      type="text"
                      class="form-control"
                      value={profileData.departmentName}
                      disabled
                    />
                  </div>
                </div>

                <div class="col-md-12">
                  <label class="labels">GitHub URL</label>
                  <input
                    type="text"
                    class="form-control"
                    value={profileData.gitHubURL}
                    name="gitHubURL"
                    onChange={handleChange}
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">LinkedIn URL</label>
                  <input
                    type="text"
                    class="form-control"
                    value={profileData.linkedInURL}
                    name="linkedInURL"
                    onChange={handleChange}
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Personal Website</label>
                  <input
                    type="text"
                    class="form-control"
                    value={profileData.personalWebsite}
                    name="personalWebsite"
                    onChange={handleChange}
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">New Profile Picture</label>
                  <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    onChange={(event) => {
                      let fName = event.target.files[0].name;
                      let dotAt = fName.lastIndexOf(".");
                      let ext = fName.substring(dotAt + 1);
                      if (ext !== "jpeg" && ext !== "jpg" && ext !== "png") {
                        swalShow(
                          "Only .jpeg/.jpg/.png files are supportetd!",
                          "",
                          "error"
                        );
                        event.target.value = "";
                        return;
                      }
                      if (event.target.files[0].size > 2 * 1024 * 1024) {
                        event.target.value = "";
                        swalShow(
                          "Image can't be larger than 2MB!",
                          "",
                          "error"
                        );
                        return;
                      }
                      setProfilePictureFile(event.target.files[0]);
                    }}
                  />
                </div>
              </div>
              <ErrorsDisplayer errors={errs} />
              <div class="mt-5 text-center">
                <button
                  class="btn btn-primary profile-button"
                  type="button"
                  onClick={handleSubmit}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyProfile;
