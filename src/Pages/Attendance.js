import React, { useState, useEffect,   useRef} from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { apiURL } from "../envvars";
import { useParams } from "react-router-dom";
import { swalConfirm, swalToast, swalShowErrors } from "../Utility/swal";
export default function AttendanceLog() {
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
    // Each Column Definition results in one Column.
    const deleteButtons = (a) => {
        let ID = a.data.id
        return(
            <Button variant="contained" color="error" onClick={()=>deleteLog(ID)}>Delete</Button>
        )
    }
    const dateFormatter = (params) => {
        return(
            params.value.split("T")[0] 
            )
      };
      const timeFormatter = (params) => {
        return(
            params.value.split("T")[1].split(".")[0]
            )
      };
    const [columnDefs, setColumnDefs] = useState([
        { field: "id", width: 50 },
        { field: "date", headerName:"Day",
        valueFormatter: dateFormatter,
        width:120
    },
    { field: "date",headerName:"Time", width:120,
    valueFormatter: timeFormatter,
},
        { field: "delete", width: 130, cellRenderer:deleteButtons },
      ]);
  let { employeeID } = useParams();
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const fetchLogs = () => {
    const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };    
    const url = `${apiURL}/api/Attendances/getByEmployeeId/${employeeID}?pageNumber=1&pageSize=1000`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setRowData(data.objects);
      });
  }
  useEffect(async () => {
    fetchLogs()
  }, []);

  const deleteLog = async (ID) => {
    const confirmed = await swalConfirm(
      `Are you sure you want to delete This Log?`,
      "",
      "warning"
    );
    if (!confirmed) {
      return;
    }
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      `${apiURL}/api/Attendances/${ID}`,
      requestOptions
    );

    if (response.status === 200) {
      swalToast("Log deleted successfully.");
      fetchLogs()
    } else {
      const respJson = await response.json();
      swalShowErrors("Error", respJson.errors);
    }
  };
  return (
    <div
      style={{
        width: "100%",
        height: "160%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        className="ag-theme-alpine"
        style={{
          height: "100%",
          width: "35%",
        }}
      >
        <AgGridReact
          ref={gridRef}
          rowSelection={"single"}
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}

        ></AgGridReact>
      </div>
    </div>
  );
}
