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
import { apiURL } from "../envvars";
import { swalConfirm, swalToast, swalShowErrors } from "../Utility/swal";

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
    const selectedDep = rowData.filter((o) => o.id === departmentId);
    const depName = selectedDep[0].name;
    const confirmed = await swalConfirm(
      `Are you sure you want to delete the ${depName} department?`,
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
      `${apiURL}/api/Departments/${departmentId}`,
      requestOptions
    );

    if (response.status === 200) {
      swalToast("Department deleted successfully.");
    } else {
      const respJson = await response.json();
      swalShowErrors("Error", respJson.errors);
    }
  };
  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    selectedRows.length === 1
      ? setDepartmentId(selectedRows[0].id)
      : alert("Select only one department");
  }, []);

  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }; // fetch departments
  useEffect(() => {
    fetch(`${apiURL}/api/Departments`, requestOptions)
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
        marginTop:"8px"
      }}
    >
      <h1 style={{textAlign:"center", marginBottom: "10px"}}>Departments</h1>
      <div
        className="ag-theme-alpine"
        style={{
          height: "100%",
          width: "442px"
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
            justifyContent: "space-between",
            flexDirection: "row",
            minWidth:"442px",
            marginTop:"15px"
          }}
        >
          <Button
            variant="contained"
            onClick={() => deleteDepartment()}
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
