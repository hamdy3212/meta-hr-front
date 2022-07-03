import { apiURL } from "../envvars";

export let getUserDepId = () => {
  const userId = localStorage.getItem("userId");
  const url = `${apiURL}/api/employees/${userId}`;
  const reqOps = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  return fetch(url, reqOps)
    .then(response => response.json())
    .then(data => data.departmentId);
};
