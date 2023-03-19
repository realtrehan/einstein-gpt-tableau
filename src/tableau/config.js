import {
  useChatsDetails,
  useChatsDetailsDispatch,
  initialChatsDetails,
  gptConfig,
} from "../context.js";

import { Fragment, useEffect, useState } from "react";
import React, { StrictMode } from "react";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import { Collapse } from "reactstrap";
import { action } from "mobx";
import Slider from '@mui/material/Slider'


const tableau = window.tableau;

export const Config = function ({configCallback}) {
  const [key, setKey] = useState('enter your key');
  const [url, setURL] = useState('');
  const [model, setModel] = useState('');
  const [temperature, setTemperature] = useState(0.7);

  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    tableau.extensions.initializeAsync().then(
      function () {
        // First, check for any saved settings and populate our UI based on them.
        const settings = tableau.extensions.settings.getAll();

        console.log("settings retrived..", { ...settings });

        setKey(settings.key); setURL(settings.url); setModel(settings.model);
        setTemperature(settings.temperature)
          
      
        let updated = _.cloneDeep(gptConfig);
        updated.key = settings.key;
        updated.url = settings.url;
        updated.model = settings.model;
        updated.temperature = settings.temperature;
        _.assign(gptConfig, updated);
        

     //configCallback({key:settings.key, url:settings.url,model:settings.model,temperature: temperature})

      
      },
      function (err) {
        // Something went wrong in initialization
        console.log("Error while Initializing: " + err.toString());
      }
    );
  },[]);

  const handleTemperatureChange = (event, newValue) => {
    setTemperature(newValue/100);
  };

  function saveConfig(e) {
    // Save the newest settings via the settings API.

    tableau.extensions
      .initializeAsync()
      .then(function () {
        console.log("setting being saved are.. ", key, url, model);

        tableau.extensions.settings.set("key", key);
        tableau.extensions.settings.set("url", url);
        tableau.extensions.settings.set("model", model);
        tableau.extensions.settings.set("temperature", temperature);

        // to do saveAsyncto not have gptConfig.
        tableau.extensions.settings
          .saveAsync()
          .then(function () {
            setCollapse(false);
            
            action(() => {
              const updated = _.cloneDeep(gptConfig);
              updated.key = key;
              updated.url = url;
              updated.model = model;
              _.assign(gptConfig, updated);

            });
        
           console.log("callign config callback..", {key:key, url:url,model:model})
            configCallback({key:key, url:url,model:model, temperature: temperature})
          })
          .catch((err) => {
            console.log("error saving config..", err);
          });
      })
      .catch((err) => {
        console.log("error in saving config..", err);
      });
  }

  const elem = (
    <div className="container-fluid">
      <a
        class="btn btn-sm btn-outline-light text-light "
        role="button"
        onClick={() => setCollapse(!collapse)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          fill="currentColor"
          class="bi bi-gear"
          viewBox="0 0 16 16"
        >
          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
        </svg>
        &nbsp;Configure-ChatGPT
      </a>

      <Collapse isOpen={collapse}>
        <div className="card card-body">
          <label for="keyInput">Open AI Access Key</label>
          <input
            id="keyInput"
            type="text"
            className="form-control "
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Type your chat gpt api key here..."
            onChange={(e) => {
              setKey(e.target.value);
            }}
            value={key}
          ></input>
          <p></p>
          <label for="urlInput">Open AI URL</label>
          <input
            id="urlInput"
            type="text"
            className="form-control "
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Type your chat gpt url here..."
            onChange={(e) => {
              setURL(e.target.value);
            }}
            value={url}
          ></input>
          <p></p>

          <label for="modelInput">Exact Model Name</label>
          <input
            id="modelInput"
            type="text"
            className="form-control "
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Change the model name based on https://platform.openai.com/docs/models"
            onChange={(e) => {
              setModel(e.target.value);
            }}
            value={model}
          ></input>

<Slider
  aria-label="Always visible"
  value={temperature*100}
  step={10}
  marks={[{value:10,label:'predictability'}, {value:90,label:'creativity'}]}
  valueLabelDisplay="on"
  onChange={handleTemperatureChange}
  defaultValue={70}
/>

          <p></p>
          <button className="btn btn-primary btn-small" onClick={saveConfig}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-check-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
            </svg>
            &nbsp; save config
          </button>
        </div>
      </Collapse>
    </div>
  );

  return elem;
};
