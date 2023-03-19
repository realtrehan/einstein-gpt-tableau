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


const tableau = window.tableau;

const App = observer(function () {
  useEffect(() => {
    tableau.extensions.initializeAsync().then(function () {
      console.log("tableau !!!");
    });
  });

  const[config, setConfig]= useState({key:'enter your key',url:'',model:''});

  function configCallback(c){

    console.log("config callback receieved..", c);
      setConfig(c)
  }

  //return <ChatSelected />
  return (
    <Fragment>
      <div className="row bg-secondary text-light  justify-content-end">
        <div className="col-7 col-sm-6 ">
          <h6>Tableau Chat GPT Advisor Extension</h6>
         
        </div>
        <div className="col-5 col-sm-6">
          <Config configCallback={configCallback}/>
        </div>
       
      </div>

      <ChatSelected />
  

      

    </Fragment>
  );
});

export default App;
