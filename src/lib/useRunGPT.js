import { action, runInAction } from "mobx";
import { observer } from "mobx-react";

import React, { Fragment, StrictMode, useEffect, useRef, useState } from "react";
import { gptConfig, gptResponses } from "../context.js";

export const useRunGPT = function (gptRequestPayload, url, key) {
  
    /*** 
    const gptPayload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer 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",
      //+ gptConfig.key
    },
    body: JSON.stringify(gptRequestPayload),
  }; */

  const gptPayload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer "+ key
    },
    body: JSON.stringify(gptRequestPayload),
  };

  console.log("key receied by runGPT is..", key)

  const [res, setRes] = useState(null);
 

  useEffect(()=>{
   

    if (key.includes('enter your key') === false)  {
      console.log("calling gpt api with payload..", gptPayload);
    /** */
    fetch(url, gptPayload)
      .then((res) => res.json())
      .then(
        action((res) => {
          console.log("gpt response...", res);
          const content = res.choices[0].message.content;
          console.log("gpt response...", content);
          setRes(content);
          
        })
      ).catch((err)=>{console.log("error in gpt fetch!!", err)});
  
};

  },[gptRequestPayload])


  return res;
};
