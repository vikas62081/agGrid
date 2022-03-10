import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function App() {
  const [gridApi, setGridApi] = useState()
  const rowData = [
    { make: "Toyota", model: "Celica", price: 35000, date: "09-02-2022", available: true },
    { make: "Ford", model: "Mondeo", price: 32000, date: "11-02-2022", available: false },
    { make: "Porsche", model: "Boxter", price: 72000, date: "10-02-2022", available: true },
    { make: "Mers", model: "Mers", price: 92000, date: "12-02-2022", available: true }
  ];

  // const columns = [{ headerName: "Make", field: "make" },
  // { headerName: "Price", field: "price" },
  // { headerName: "Model", field: "model" },
  // { headerName: "Date", field: "date" }]

  const getDynamicColumns = (obj) => {
    return Object.keys(obj).map(key => ({ field: key }))
  }


  const defColumnDefs = { flex: 1 }

  const onGridReady = (params) => {
    setGridApi(params)
    params.api.setColumnDefs(getDynamicColumns(rowData[0]))
  }

  return (
    <div className="App">
      <h2 align="center">Ag Grid with React</h2>
      <p align="center">Dynamically Columns Creation from RowData in AG Grid</p>
      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <AgGridReact
          rowData={rowData}
          // columnDefs={columns}
          defaultColDef={defColumnDefs}
          onGridReady={onGridReady} />
      </div>
    </div>
  );
}

export default App;
