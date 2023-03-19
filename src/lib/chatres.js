import { observer } from "mobx-react-lite";
import { action } from "mobx";

import React, { Fragment, StrictMode, useEffect, useState } from "react";

import { gptConfig, gptResponses } from "../context.js";
import _ from "lodash";
import { useRunGPT } from "./useRunGPT";

export const ChatRes = function ({ config }) {
  // const [gptRes, SetGptRes] =useState('')

  let gptRes;
  const [res,setRes] = useState('')

  console.log("config received by chat res..", config);
  //const url = "https://api.openai.com/v1/chat/completions";
  //const key = "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"
  let key, url, model;
  if (typeof config.key != "undefined") {
    key = config.key;
    url = config.url;
    model = config.model;
  } else {
    (key = "enter your key"), (url = ""), (model = "");
  }

  const messages = {
    model: model,
    messages: [{ role: "user", content: "Say this is a test!" }],
    temperature: 0.7,
  };

  console.log("calling run gpt with key from config.", key);
  gptRes = useRunGPT(messages, url, key);

   // if ( gptRes.current != '' ) { setRes(gptRes.current)}

  //const responses = gptResponses.responses.slice()
  return (
    <div>
      <h1> test gpt respnose : {gptRes} </h1>
    </div>
  );
};
