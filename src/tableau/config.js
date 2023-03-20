import {
  useChatsDetails,
  useChatsDetailsDispatch,
  initialChatsDetails,
  gptConfig as configStore,
  gptConfig,
} from "../context.js";

import { Fragment, useEffect, useState } from "react";
import React, { StrictMode } from "react";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import { Collapse } from "reactstrap";
import { action } from "mobx";
import Slider from "@mui/material/Slider";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/material/Button";

const tableau = window.tableau;

export const Config = function ({ configCallback }) {
  const [key, setKey] = useState("");
  const [url, setURL] = useState("");
  const [model, setModel] = useState("");
  const [temperature, setTemperature] = useState(0.7);

  const [collapse, setCollapse] = useState(true);

  useEffect(() => {
    tableau.extensions.initializeAsync().then(
      function () {
        // First, check for any saved settings and populate our UI based on them.
        const settings = tableau.extensions.settings.getAll();

        console.log("settings retrived..", { ...settings });

        if (typeof settings.key == "undefined") {
          setKey("enter your key");
          setCollapse(true);
        } else {
          setKey(settings.key);
          setCollapse(false);
        }

        typeof settings.url == "undefined"
          ? setURL("https://api.openai.com/v1/chat/completions")
          : setURL(settings.url);

        typeof settings.model == "undefined"
          ? setModel("gpt-3.5-turbo")
          : setModel(settings.model);

        typeof settings.temperate == "undefined"
          ? setTemperature("0.7")
          : setTemperature(settings.temperature);

        //action(() => {
          //const updated = _.cloneDeep(gptConfig.configs[0]);
          const updated = _.cloneDeep(gptConfig);
          updated.key = settings.key;
          updated.url = settings.url;
          updated.model = settings.model;
          updated.temperature = settings.temperature;

          _.assign(gptConfig, updated);

          //_.assign(gptConfig.configs[0], updated);
        //});

        configCallback({
          key: settings.key,
          url: settings.url,
          model: settings.model,
          temperature: settings.temperature,
        });
      },
      function (err) {
        // Something went wrong in initialization
        console.log("Error while Initializing: " + err.toString());
      }
    );
  }, []);

  const handleTemperatureChange = (event, newValue) => {
    setTemperature(newValue / 100);
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

            //action(() => {
             // const updated = _.cloneDeep(gptConfig.configs[0]);
             const updated = _.cloneDeep(gptConfig);
              updated.key = key;
              updated.url = url;
              updated.model = model;
              updated.temperature = temperature;

              _.assign(gptConfig, updated);
            //});

            configCallback({
              key: key,
              url: url,
              model: model,
              temperature: temperature,
            });
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
      <Button
        variant="contained"
        onClick={() => setCollapse(!collapse)}
        size="small"
        endIcon={<SettingsIcon />}
      >
        Configure
      </Button>

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
            value={temperature * 100}
            step={10}
            marks={[
              { value: 10, label: "predictability" },
              { value: 90, label: "creativity" },
            ]}
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
} 

