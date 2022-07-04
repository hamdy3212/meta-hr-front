import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import RequestVacation from "../Components/Vacations/RequestVacation";
import DenyVacation from "../Components/Vacations/DenyVacation";
import { userIsInRole, roles } from "../Utility/roles";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { apiURL } from "../envvars";
import { swalShowErrors, swalToast } from "../Utility/swal";

const Vacations = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const [URL, setURL] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [ticketStatus, setTicketStatus] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState("");
  const handleCreated = () => {
    getData();
  };
  const dateFormatter = (params) => {
    return params.value.split("T")[0];
  };
  const fullName = (params) => {
    return params.data.employeeFirstName + " " + params.data.employeeLastName;
  };
  const reviewedBy = (params) => {
    if (params.data.reviewerFirstName === null) {
      return "";
    }
    return params.data.reviewerFirstName + " " + params.data.reviewerLastName;
  };
  const acceptVacation = async (id) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        state: 1,
        denialReason: "",
      }),
    };
    const response = await fetch(
      `${apiURL}/api/VacationRequests/${id}`,
      requestOptions
    );
    if (response.status === 200) {
      swalToast("Vacation Request Approved", "success");
      getData();
    } else {
      const respJson = await response.json();
      swalShowErrors("Something went wrong", respJson.errors);
    }
  };

  const stateChanger = (props) => {
    if (props.value === "Pending") {
      return (
        <div>
          <Button
            variant="contained"
            color="success"
            style={{ marginRight: "5px" }}
            onClick={() => acceptVacation(props.data.id)}
          >
            Accept
          </Button>
          <DenyVacation id={props.data.id} onCreated={handleCreated} />
        </div>
      );
    } else {
      return props.value;
    }
  };
  const columns =
    userIsInRole(roles.employee) === false
      ? [
          { field: "name", headerName: "Name", valueFormatter: fullName },
          { field: "employeeEmail" },
          { field: "departmentName" },
          { field: "state", cellRenderer: stateChanger },
          {
            field: "ReviewerFirstName",
            headerName: "Reviewed by",
            valueFormatter: reviewedBy,
          },
        ]
      : [
          {
            field: "ReviewerFirstName",
            headerName: "Reviewed by",
            valueFormatter: reviewedBy,
          },
          { field: "state" },
        ];
  const [columnDefs, setColumnDefs] = useState([
    { field: "id", width: 70 },
    ...columns,
    { field: "from", width: 150, valueFormatter: dateFormatter },
    { field: "to", width: 150, valueFormatter: dateFormatter },
    { field: "denialReason" },
  ]);
  const getData = async () => {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }; // fetch Vacations
    const url =
      userIsInRole(roles.employee)
        ? `${apiURL}/api/VacationRequests/byEmployee?employeeId=${localStorage.getItem(
            "userId"
          )}&pageNumber=1&pageSize=1000`
        : `${apiURL}/api/VacationRequests?pageNumber=1&pageSize=1000`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((rowData) => {
        console.log(rowData);
        setRowData(rowData.objects);
      });
  };

  useEffect(async () => {
    await getData();
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "160%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "8px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
        Vacation Requests
      </h1>
      <div
        className="ag-theme-alpine"
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          enableCellChangeFlash={true}
          paginationPageSize={10}
        ></AgGridReact>
      </div>
      <div style={{ marginTop: "15px" }}>
        <RequestVacation onCreated={handleCreated} />
      </div>
    </div>
  );
};

export default Vacations;
