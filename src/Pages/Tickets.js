import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import CreateTicket from "../Components/Tickets/CreateTicket";
import SendMessage from "../Components/Tickets/SendMessage";
import ViewTicket from "../Components/Tickets/ViewTicket";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { apiURL } from "../envvars";
import { userIsInRole, roles } from '../Utility/roles'

const Tickets = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const [URL, setURL] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [ticketStatus, setTicketStatus] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState("");
  const handleCreated = () => {
    getData();
  }
  const statusFormatter = (params) => {
    if (params.value) {
      return "Open";
    } else {
      return "Closed";
    }
  };
  const awaitingResponseFormatter = (params) => {
    if(params.value){
      return "Yes";
    }
    return "No";
  }
  const [columnDefs, setColumnDefs] = useState([
    { field: "id", width: 60 },
    { field: "creatorName" },
    { field: "subject" },
    { field: "lastMessage", resizable: true },
    { field: "creatorDepartmentName", headerName: "Department", width: 120 },
    {
      field: "isOpen",
      headerName: "Status",
      width: 100,
      valueFormatter: statusFormatter,
    },
    { field: "isAwaitingResponse", headerName: "Awaiting Response?", valueFormatter: awaitingResponseFormatter  },
    { field: "createdAt"}
  ]);
  // color for closed tickets
  const rowClassRules = useMemo(() => {
    return {
      awaitingResponseTicket: "data.isAwaitingResponse === true"
    };
  }, []);
  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    setTicketId(selectedRows[0].id);
    setTicketStatus(selectedRows[0].isOpen);
    setSelectedTicket(selectedRows[0]);
  }, []);

  const getData = async () => {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }; // fetch Tickets
    const url =
      userIsInRole(roles.employee)
        ? `${apiURL}/api/Tickets/myTickets`
        : `${apiURL}/api/Tickets?pageNumber=1&pageSize=999`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((rowData) => {
        console.log(rowData);
        if (userIsInRole(roles.employee)) {
          setRowData(rowData);
        } else {
          setRowData(rowData.objects);
        }
      });
  }
  
  useEffect(async () => {
    await getData();
  }, []);
  const closeOpenTicket = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      `${apiURL}/api/Tickets/closeOrOpenTicket?ticketId=${ticketId}&isOpen=${!ticketStatus}`,
      requestOptions
    );
    const index = rowData.findIndex((ticket) => ticket.id === ticketId);
    console.log(index);
    const tickets = rowData;
    tickets[index].isOpen = !ticketStatus;
    setRowData(tickets);
    gridRef.current.api.refreshCells();
    if (ticketStatus) {
      alert(`Ticket is closed`);
    } else {
      alert(`Ticket is opened`);
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
        marginTop: "8px"
      }}
    >
      <h1 style={{textAlign:"center", marginBottom: "10px"}}>Tickets</h1>
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
          justifyContent: "space-between",
          flexDirection: "row",
          minWidth: "262px",
          marginTop: "15px"
        }}
      >
        {userIsInRole(roles.employee) ? <CreateTicket onCreated={handleCreated}/> : ""}
        <ViewTicket ticketId={ticketId} selectedTicket={selectedTicket} />
        {ticketStatus === false ? (
          <Button
            variant="contained"
            color="success"
            onClick={closeOpenTicket}
            disabled={!ticketId}
          >
            Open Ticket
          </Button>
        ) : (
          <Button
            variant="contained"
            color="error"
            onClick={closeOpenTicket}
            disabled={!ticketId}
          >
            End Ticket
          </Button>
        )}
      </div>
    </div>
  );
};

export default Tickets;
