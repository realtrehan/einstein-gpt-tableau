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

  const[config, setConfig]= useState({});
  const [showConfig, setShowConfig] = useState(true)

  function configCallback(c){

    console.log("config callback receieved..", c);

     //setConfig({...config,key:c.key,url:c.url,model:c.model, temperature:c.temperature});
      setConfig({...c})
      
      setShowConfig(c.key.includes('enter your key'))
     // console.log("config callback set..", config);
  }

  useEffect(()=>{
    console.log("config callback set..", config);
  }, [config])


  //return <ChatSelected />
  return (
    <Fragment>
      <div className="row bg-secondary text-light  justify-content-end">
        <div className="col-6 col-sm-6 ">
          <h6>Tableau Chat GPT Advisor Extension</h6>
         
        </div>
        <div className="col-6 col-sm-6">
        <Config configCallback={configCallback}/>
        </div>
       
      </div>

       <ChatSelected />
  

      
  

    </Fragment>
  );
});

export default App;
