import { AgGridColumn, AgGridReact } from "ag-grid-react";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import AddDepartment from "../Components/Departments/AddDepartment";
import AssignDirector from "../Components/Departments/AssignDirector";

export const Departments = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const [departmentId, setDepartmentId] = useState();
  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: "id", width: 50 },
    { field: "name", width: 190 },
    { field: "directorName", width: 200 },
  ]);

  // delete department
  const deleteDepartment = async () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      `https://localhost:7057/api/Departments/${departmentId}`,
      requestOptions
    );
  };
  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    selectedRows.length === 1
      ? setDepartmentId(selectedRows[0].id)
      : alert("Select only on department");
  }, []);

  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }; // fetch departments
  useEffect(() => {
    fetch("https://localhost:7057/api/Departments", requestOptions)
      .then((response) => response.json())
      .then((rowData) => {
        setRowData(rowData);
      });
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
          onSelectionChanged={onSelectionChanged}
        ></AgGridReact>
      </div>
      {localStorage.getItem("role") !== "Employee" && (
        <div
          style={{
            padding: "0 185px 0 185px",
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
          }}
        >
          <Button
            variant="contained"
            onClick={() => deleteDepartment()}
            disabled={console.log("first")}
            color="error"
          >
            delete
          </Button>
          <AddDepartment />
          <AssignDirector departmentId={departmentId} />
        </div>
      )}
    </div>
  );
};