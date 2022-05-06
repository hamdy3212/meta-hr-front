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
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";

export const Departments = () => {
  // const navigate = useNavigate();

  // const gridRef = useRef(null);
  // // useEffect(() => {
  // //   fetch(``, {
  // //     headers: {
  // //       Authorization: "Bearer " + localStorage.getItem("token"),
  // //     },
  // //   })
  // //     .then((response) => {
  // //       return response.json();
  // //     })
  // //     .then((result) => {
  // //       console.log(result)
  // //       setRowData(result);
  // //     })
  // //     .catch((error) => {
  // //       alert("يوجد خطأ ما!");
  // //     });
  // // }, []);

  // const editCase = () => {
  //   const selectedNodes = gridRef.current.api.getSelectedNodes();
  //   const selectedData = selectedNodes.map((node) => node.data);
  //   if (selectedData[0]) {
  //     navigate(`/editcase/${selectedData[0].id}`);
  //   } else {
  //     navigate(`/editcase`);
  //   }
  // };
  // const Delete = async (e) => {
  //   const selectedNodes = gridRef.current.api.getSelectedNodes();
  //   const selectedData = selectedNodes.map((node) => node.data);
  //   const selectedDataStringPresentation = selectedData.map(
  //     (node) => `${node.id}`
  //   );
  //   const requestOptions = {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     },
  //     body: JSON.stringify({
  //       id: selectedDataStringPresentation[0],
  //     }),
  //   };
  //   const response = await fetch(
  //     "https://localhost:5001/api/Cases/DeleteCase",
  //     requestOptions
  //   );
  //   alert("Deleted Successfully");
  // };
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: "id" },
    { field: "name" },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
  }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  const requestOptions = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    console.log(`Bearer ${localStorage.getItem("token")}`)
    fetch("https://localhost:7057/api/Departments", requestOptions)
      .then((result) => console.log(result))
      .then((rowData) => {
        setRowData(rowData);
      });
  }, []);
  console.log(rowData);

  // Example using Grid's API
  const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []);

  return (
    <div>
      {/* Example using Grid's API */}
      <button onClick={buttonListener}>Push Me</button>

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={{ width: 500, height: 500 }}>
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        />
      </div>
    </div>
  );
};
