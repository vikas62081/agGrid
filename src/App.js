import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
const dateFilterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split('-');
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
};

function App() {
  const [gridApi, setGridApi] = useState()
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const rowData = [
    { make: "Toyota", model: "Celica", price: 35000, date: "09-02-2022" },
    { make: "Ford", model: "Mondeo", price: 32000, date: "11-02-2022" },
    { make: "Porsche", model: "Boxter", price: 72000, date: "10-02-2022" },
    { make: "Mers", model: "Mers", price: 92000, date: "12-02-2022" }
  ];

  const columns = [{ headerName: "Make", field: "make" },
  { headerName: "Price", field: "price" },
  { headerName: "Model", field: "model" },
  { headerName: "Date", field: "date", filter: 'agDateColumnFilter', filterParams: dateFilterParams, }
  ]
  const defColumnDefs = { flex: 1, }

  const onGridReady = (params) => {
    setGridApi(params)
  }
  const getFilterType = () => {
    if (startDate !== '' && endDate !== '') return 'inRange';
    else if (startDate !== '') return 'greaterThan'
    else if (endDate !== '') return 'lessThan'
  };
  useEffect(() => {
    if (gridApi) {
      if (startDate !== '' && endDate !== '' && startDate > endDate) {
        alert("Start Date should be before End Date")
        setEndDate('')
      } else {
        var dateFilterComponent = gridApi.api.getFilterInstance('date');
        dateFilterComponent.setModel({
          type: getFilterType(),
          dateFrom: startDate ? startDate : endDate,
          dateTo: endDate,
        });
        gridApi.api.onFilterChanged();
      }

    }

  }, [startDate, endDate])
  return (
    <div className="App">
      <h2 align="center">Ag Grid with React</h2>
      <p align="center">Date Range Filtering </p>
      <div className="ag-theme-alpine" style={{ height: 400 }}>
        From : <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        To : <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          defaultColDef={defColumnDefs}
          onGridReady={onGridReady} />
      </div>
    </div>
  );
}

export default App;
