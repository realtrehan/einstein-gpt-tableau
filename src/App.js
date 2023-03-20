import { ChatsList } from "./chats.js";
import { ChatsProvider, ChatsDetailsProvider } from "./context.js";
import { AddChat } from "./addChat.js";
import { ChatsDetailsList } from "./chatDetails.js";

import { ChatSelected } from "./chatSelected.js";
import React, { Fragment, StrictMode, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { test } from "./context";
import { tableau as t } from "./extension.js";
import "./mystyle.css";
import { Config } from "./tableau/config.js";
import { ChatRes } from "./lib/chatres.js";
import { Worksheet } from "./tableau/worksheets.js";
import { getSummaryData } from "./tableau/getData.js";
import Link from "@mui/material/Link";

const tableau = window.tableau;

const App = observer(function () {
  const [worksheets, setWorksheets] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    tableau.extensions.initializeAsync().then(function () {
      console.log("tableau !!!");

      setWorksheets(tableau.extensions.dashboardContent.dashboard.worksheets);

      //setSummaryData (getSummaryData(selectedSheet))
    });
  }, []);

  const [config, setConfig] = useState({});
  const [showConfig, setShowConfig] = useState(true);

  //to get the summary data back from worksheet component
  function selectedDataCallback(selectedData) {
    console.log("setting callback selected data", selectedData);
    setSelectedData(selectedData);
  }

  function configCallback(c) {
    console.log("config callback receieved..", c);

    //setConfig({...config,key:c.key,url:c.url,model:c.model, temperature:c.temperature});
    setConfig({ ...c });

    setShowConfig(c.key.includes("enter your key"));
    // console.log("config callback set..", config);
  }

  //return <ChatSelected />
  return (
    <Fragment>
      <div className="container-fluid bg-secondary text-light ">
        <div className="row bg-secondary text-light  justify-content-end">
          <div className="col-7 col-sm-6 ">
            <div className="row align-content-start">
              <div className="col-7">Tableau Chat GPT Advisor</div>
          <div className="col-5">
          <Link  sx={{ color: "white"}}
                href="https://www.linkedin.com/in/trehanrahul/"
                target="_blank"
              >
                @Rahul Trehan
              </Link>
          </div>
             
            </div>
          </div>

          <div className="col-5 col-sm-6 ps-3">
            <Config configCallback={configCallback} />
          </div>
        </div>

        <p></p>
        <div className="row bg-secondary text-light  ">
          <Worksheet
            worksheets={worksheets}
            selectedDataCallback={selectedDataCallback}
          />
        </div>
        <p></p>

        <ChatSelected />
      </div>
    </Fragment>
  );
});

export default App;
