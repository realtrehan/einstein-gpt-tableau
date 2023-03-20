import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { StrictMode, useEffect, useState } from "react";

const tableau = window.tableau;

//to get all the workheets in the dashboard and populate the dropdown selector
async function getWorksheets() {
  //  After initialization, ask Tableau what sheets are available
  await tableau.extensions.initializeAsync();

  return tableau.extensions.dashboardContent.dashboard.worksheets;
}

export const Worksheet = function ({worksheets}) {

  const [selectedSheet, setSelectedSheet] = useState("");

  console.log("worksgeets component got..", worksheets);

  const handleChange = (event) => {
    console.log("sleected sheet is ", event.target.value);
    setSelectedSheet(event.target.value);
  };

  /** 
  const items = worksheets.map((sheet) => {
    <MenuItem value={sheet.name}> {sheet.name} </MenuItem>;
  });
  */

  const elem = (
    <div className="row">
      <label>
        Select the worksheet &nbsp; 
        <select value={selectedSheet} onChange={handleChange}>
          <Item worksheets={worksheets} />
        </select>
      </label>
    </div>
  );

  function Item({ worksheets }) {
    console.log("workhseet prop received is.. ", worksheets);
    return (worksheets).map((sheet) => {
      console.log("sheet name prop", sheet.name);
      return <option value={sheet.name}>{sheet.name} </option>;
    });
  }

  return elem;
};
