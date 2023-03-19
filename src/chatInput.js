import { Fragment } from "react";
import React, { StrictMode } from "react";
import { useChats, useChatsDispatch } from "./context.js";
import { useState, useRef, useEffect } from "react";
import SendButton from "./sendButton.svg";
import { useChatsDetails, useChatsDetailsDispatch,gptConfig } from "./context.js";
import _ from "lodash";
import {
  initialChats as chatsStore,
  initialChatsDetails as chatsDetailsStore,
} from "./context.js";
import { action, autorun, runInAction, toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useConfig } from "./tableau/useConfig.js";
import { useRunGPT } from "./lib/useRunGPT.js";
import LinearProgress  from "@mui/material/LinearProgress";


//addedChatId is callback to pass the chatId back to the parent chatdetails
export const ChatInput = observer(function () {
  const chats = chatsStore.chats;

  const chatsDetails = chatsDetailsStore.chatsDetails;

  const [newChat, setNewChat] = useState(false);
  const [inputVal, setInputVal] = useState(""); //to capture the input text value
const [inputState, setInputState] = useState(false) //to disable enter key to avoid double submit

    const config = gptConfig

  //for the input text chat enter press key
  function newChatEnter(e) {
    console.log("enter ..", e);
    if (e.key === "Enter") {
       
      processNewChatEvent();
    }
  }

  // process new chat enter either via enter key or button click

  async function processNewChatEvent() {
    setNewChat(true);
    setInputState(true); //disable input enter

    const activeChatId = chats.find((chat) => chat.active == true);

    console.log("active chat id in chatinput is ", activeChatId.id);

    //pass the activeId and the input question/answer back to chatdetails
    // addedChatId( activeChatId ,e.target.value,"sample answer coming from chatgpt");
    let activeDetailIndex, activeQuestionAnswers;

    chatsDetails.forEach((detail, i) => {
      console.log("detail is..", detail);
      if (detail.chatId == activeChatId.id) {
        activeQuestionAnswers = detail;
        activeDetailIndex = i;
        console.log("detail ", activeQuestionAnswers, " i ", activeDetailIndex);
      }
    });

   

    //call the useRungpt hook to pass question to gpt

    const messages = {
        model: config.model,
        messages: [{ role: "user", content: inputVal }],
        temperature: parseFloat(config.temperature),
      };

      let gptRes;
     
    gptRes = await runGPT(messages,config.url, config.key)

    runInAction(()=>{
  // input the gpt response back to array
  chatsDetails[activeDetailIndex].questionAnswers.push({
    id: chatsDetails[activeDetailIndex].questionAnswers.length,
    question: "Question: " + inputVal,
    answer: gptRes,
  });
    })

    //this is needed in mobx to deal with changing the properties, because it does not tracks references.
    let updated;
    updated = _.cloneDeep(chatsDetails[activeDetailIndex]);
    _.assign(chatsDetails[activeDetailIndex], updated);

    const beforeUpdate = toJS(chatsDetails);

    //do the above to clone deep and assign or below like replace. the most important part to let mobx know the array has changed.
    //chatsDetails.replace(beforeUpdate)

    // reset the value to blank again after question entered.
    setInputVal("");
  }

// for running GPT 
function runGPT (gptRequestPayload,url, key){

    return new Promise((resolve, reject) => {


    const gptPayload = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer "+ key
        },
        body: JSON.stringify(gptRequestPayload),
      };

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

            setInputState(false) //renable the enter input 
            resolve(content);
            
          })
        ).catch((err)=>{console.log("error in gpt fetch!!", err)});
    
  };
})
}


  //for the send icon button click
  function newChatSendButton(e) {
    processNewChatEvent();
  }
  const style = {
    width: "auto",
    maxWidth: "700px",
  };

  const elem = (
    <Fragment>
      <div
        id="title"
        className="d-flex justify-content-center ps-3 mt-2"
      >
        <input
          id="questionInput"
          type="text"
          class="form-control "
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Type your question here..."
          onKeyPress={newChatEnter}
          onChange={(e) => {
            setInputVal(e.target.value);
          }}
          value={inputVal}
          disabled = {inputState}
        />

        <button id="sendButton" onClick={newChatSendButton} className="btn">
          <img
            id="sendIcon"
            className="sendButton col-sm-3"
            src={SendButton}
            alt="React Logo"
          />
        </button>
      </div>
      { inputState && <LinearProgress />}
    </Fragment>
  );
  return elem;
});
