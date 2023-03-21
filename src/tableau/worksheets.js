import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { StrictMode, useEffect, useState } from "react";
import { gptMessages } from "../context";
import { getSummaryData } from "./getData";

const tableau = window.tableau;





//to get all the workheets in the dashboard and populate the dropdown selector
async function getWorksheets() {



  //  After initialization, ask Tableau what sheets are available
  await tableau.extensions.initializeAsync();

  return tableau.extensions.dashboardContent.dashboard.worksheets;
}

export const Worksheet = function ({ worksheets, selectedDataCallback }) {
  const [selectedSheet, setSelectedSheet] = useState("");

  console.log("worksgeets component got..", worksheets);

  const handleChange = (event) => {
    console.log("sleected sheet is ", event.target.value);
    setSelectedSheet(event.target.value);

    //  getSummaryData( event.target.value)

    selectedDataCallback(getSummaryData(event.target.value)); //sending selected sheet back to state up
  };

  /** 
  const items = worksheets.map((sheet) => {
    <MenuItem value={sheet.name}> {sheet.name} </MenuItem>;
  });
  */

  const elem = (
    <div className="row">
      <FormControl fullWidth>
        <InputLabel
          id="demo-simple-select-label"
          sx={{
            color: "white",
          }}
        >
          Select Worksheet
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedSheet}
          label="worksheet"
          onChange={handleChange}
          sx={{
            color: "white",
          }}
        >
          {worksheets.map((sheet) => {
            console.log("sheet name prop", sheet.name);
            return <MenuItem value={sheet.name}>{sheet.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );

  function Item({ worksheets }) {
    console.log("workhseet prop received is.. ", worksheets);
    return worksheets.map((sheet) => {
      console.log("sheet name prop", sheet.name);
      return <option value={sheet.name}>{sheet.name} </option>;
    });
  }

  return elem;
};
