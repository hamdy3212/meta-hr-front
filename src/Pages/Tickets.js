import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import CreateTicket from "../Components/Tickets/CreateTicket"
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
const Tickets = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const [columnDefs, setColumnDefs] = useState([
    { field: "id", width: 50 },
    { field: "creatorName" },
    { field: "subject" },
    { field: "lastMessage" },
  ]);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    selectedRows.length === 1
      ? console.log(selectedRows[0].id)
      : alert("Select only on department");
  }, []);
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }; // fetch departments
  useEffect(() => {
    fetch("https://localhost:7057/api/Tickets?pageNumber=1&pageSize=10", requestOptions)
      .then((response) => response.json())
      .then((rowData) => {
        console.log(rowData.objects)
        setRowData(rowData.objects);
      });
  }, []);
  return (
    <Grid container spacing={2} style={{ padding: 30, display:"flex", justifyContent:"space-between", height:"100%" }}>
      <Grid
        sm="2"
        style={{
          backgroundColor: "lightgrey",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          padding: "0 5px"         
        }}
      >
        <Button variant="contained" color="success" style={{marginBottom:"10px"}}>
          {" "}
          All Tickets (99)
        </Button>
        <Button variant="contained" color="success">
          {" "}
          My Tickets (30)
        </Button>
      </Grid>
      <Grid sm="10">
      <div
      style={{
        width: "100%",
        height: "160%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding:"0 5px"
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
          paginationAutoPageSize={true}
          pagination={true}

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
        {console.log(localStorage.getItem("localUserInfo"))}
        <CreateTicket />
        <Button
          variant="contained"
          color="error"
        >
          End Ticket
        </Button>
      </div>
    </div>
      </Grid>
    </Grid>
  );
};

export default Tickets;
