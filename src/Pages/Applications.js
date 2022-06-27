import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import ViewApplication from "../Components/Applications/ViewApplication";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { apiURL } from "../envvars";

const Applications = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const [URL, setURL] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [selectedApplication, setSelectedApplication] = useState("");
  
  const [columnDefs, setColumnDefs] = useState([
    { field: "id", width: 60 },
    { field: "jobTitle" },
    { field: "stage" },
    { field: "firstName"},
    { field: "lastName"},
    { field: "email"},
    { field: "phone"},
    
    // { field: "creatorDepartmentName", headerName: "Department", width: 120 },
   
  ]);
  // color for closed applications
  const rowClassRules = useMemo(() => {
    return {
      unread: "data.stage === unread",
    };
  }, []);
  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    setSelectedApplication(selectedRows[0]);
  }, []);
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }; // fetch Applications
  useEffect(async () => {
    const url = `${apiURL}/api/JobApplications?pageNumber=1&pageSize=10`
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((rowData) => {
        if (localStorage.getItem("role") === "Employee") {
          setRowData(rowData);
        } else {
          setRowData(rowData.objects);
        }
      });
  }, []);
  const Delete = async () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      `${apiURL}/api/JobApplications/${applicationId}`,
      requestOptions
    );
    const index = rowData.findIndex((application) => application.id === selectedApplication.id);
    const applications = rowData;
    setRowData(applications);
    gridRef.current.api.refreshCells();
    alert("Application Deleted.")
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
          width: "100%",
        }}
      >
        <AgGridReact
          ref={gridRef}
          rowSelection={"single"}
          rowData={rowData}
          columnDefs={columnDefs}
          onSelectionChanged={onSelectionChanged}
          pagination={true}
          rowClassRules={rowClassRules}
          enableCellChangeFlash={true}
          paginationPageSize={10}
          ></AgGridReact>
      </div>
      <div
        style={{
          padding: "0 185px 0 185px",
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <ViewApplication selectedApplication={selectedApplication} />
          <Button
            variant="contained"
            color="error"
            onClick={Delete}
            disabled={!selectedApplication}
          >
            Delete Application
          </Button>
      </div>
    </div>
  );
};

export default Applications;
