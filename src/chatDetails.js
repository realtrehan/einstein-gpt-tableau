import {
  useChatsDetails,
  useChatsDetailsDispatch,
  initialChatsDetails,
  gptResponses
} from "./context.js";

import { Fragment, useState } from "react";
import React, { StrictMode } from "react";
import _ from "lodash";
import { observer } from "mobx-react-lite";

export const ChatsDetailsList = observer(function ({
  selectedChat,
  addedChat,
}) {
  //const chatsDetails = useChatsDetails();
  const dispatchDetails = useChatsDetailsDispatch();

  const chatsDetails = initialChatsDetails.chatsDetails;

  const [chatsUIDetails, setChatsUIDetails] = useState(chatsDetails);

  console.log("initiatlized chat details are..", chatsDetails);
  //console.log("selectedId passed to details.. ", selectedChat.chatId, " value of input ", selectedChat.chatValue);

  console.log("details receivied the added chat from chatinput ", addedChat);

  console.log("chat details are ", chatsDetails);

  let elem = <div></div>;

  if (selectedChat !== null && typeof selectedChat !== undefined) {
    console.log("selected chat from");

    elem = chatsDetails.map(function (chatDetail) {
      if (chatDetail.chatId == selectedChat) {
        return <ChatDetail questionAnswers={chatDetail.questionAnswers} />;
      }
    });

    console.log("filter chat details view ..", elem);
  }

  function ChatDetail({ questionAnswers }) {
    const elem = (
      <Fragment>
        <div className="d-flex flex-column  ms-2 mt-3 " >
          {questionAnswers.map((questionAnswer) => (
            <QuestionAnswer
              key={questionAnswer.id}
              questionAnswer={questionAnswer}
            />
          ))}
        </div>
      </Fragment>
    );
    return elem;
  }

  function QuestionAnswer({ questionAnswer }) {

    const style ={
      width: "auto",
      maxWidth: '1000px'
    }

    const elem = (
      <Fragment>
        <div className="d-flex justify-content-start  p-1 " style={style}>
          <span >{questionAnswer.question}  </span> 
        </div>
        <div className="d-flex justify-content-start  ps-2" style={style}>
          <span >{questionAnswer.answer} </span> 
        </div>
        <hr></hr>
      </Fragment>
    );
    return elem;
  }

  return <div>{elem}</div>;
});
