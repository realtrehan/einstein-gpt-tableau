import { gptMessages } from "../context";

export const getSummaryData = async function getSummaryData(selectedSheetName) {
  const tableau = window.tableau;

  //initialize the new messages to zero for each worksheet in the gptmessage store
  const newMsgs = [];
  gptMessages.messages.clear(); //this is needed to empty the store array for each worksheet selection

  //  return new Promise((resolve, reject) => {})

  console.log("get summary caalled for shheet...", selectedSheetName);

  let formattedTable = []; //this variable is used to store the crosstab extracted form the worksheet summary data

  const worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;

  const selectedSheet = worksheets.find(function (sheet) {
    return sheet.name === selectedSheetName;
  });

  const dataTableReader = await selectedSheet.getSummaryDataAsync();

  //create the column header for table
  console.log("data table raw format is ", dataTableReader);

  let colNames = [],
    colTypes = [];
  dataTableReader.columns.forEach(function (column) {
    colNames.push(column._fieldName);
    colTypes.push(column._dataType);
  });
  formattedTable.push(colNames);
  formattedTable.push(colTypes);

  //console.log("raw data table is ", dataTableReader)

  //create the data rows of table
  let formattedRow = [];
  dataTableReader.data.forEach(function (row) {
    row.forEach(function (val) {
      // console.log("_nativeValue type is ", typeof val._nativeValue);
      if (typeof val._nativeValue === "number") {
        if (val._nativeValue > 1) {
          formattedRow.push(parseFloat(val._nativeValue).toFixed(2));
        } else {
          formattedRow.push(parseFloat(val._nativeValue).toFixed(4));
        }
      } else {
        formattedRow.push(val._nativeValue);
      }
    });

    formattedTable.push(formattedRow);
    formattedRow = [];
  });

  console.log(
    "formatted table of selected sheet -",
    selectedSheetName,
    " looks like ",
    formattedTable
  );

  console.log("returning formatted data..", formattedTable);

  //push the summary data to chatGPT messages array
  newMsgs.push({ role: "system", content: "You are a helpful data analyst" });
  newMsgs.push({
    role: "user",
    content: "the data for analysis has these columns: " + formattedTable[0],
  });
  newMsgs.push({
    role: "user",
    content: "the data set values are : " + formattedTable.slice(2),
  });
  _.assign(gptMessages.messages, newMsgs);
  // gptMessages.messages.replace(newMsgs)

  return formattedTable;
};
