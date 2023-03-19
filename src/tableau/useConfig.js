
import {
    useChatsDetails,
    useChatsDetailsDispatch,
    initialChatsDetails,
    gptConfig
  } from "../context.js";
  
  import { Fragment, useEffect, useState } from "react";
  import React, { StrictMode } from "react";
  import _ from "lodash";
  import { observer } from "mobx-react-lite";
  import {Collapse} from 'reactstrap';
import { action } from "mobx";

const tableau = window.tableau;


export const  useConfig =  function (){

    const [config, SetConfig] = useState(null);

    useEffect(()=>{

tableau.extensions.initializeAsync().then( function () {
        // First, check for any saved settings and populate our UI based on them.
       const settings = tableau.extensions.settings.getAll();

       console.log("settings retrived..", {...settings});

            SetConfig( {key:settings.key,url:settings.url, model:settings.model});
             
      }, function (err) {
        // Something went wrong in initialization
        console.log('Error while Initializing: ' + err.toString());
      }
);

},[])
    
    
    return config;

}