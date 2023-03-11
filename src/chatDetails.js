import { useChatsDetails, useChatsDetailsDispatch } from "./context.js";

import { Fragment, useState } from "react";
import React, { StrictMode } from "react";
import _ from "lodash";

export function ChatsDetailsList({ selectedChat, addedChat }) {
  const chatsDetails = useChatsDetails();
  const dispatchDetails = useChatsDetailsDispatch();

  const [chatsUIDetails, setChatsUIDetails] = useState(chatsDetails);

  console.log("initiatlized chat details are..", chatsDetails);
  //console.log("selectedId passed to details.. ", selectedChat.chatId, " value of input ", selectedChat.chatValue);

  console.log("details receivied the added chat from chatinput ", addedChat);

  console.log("chat details are ", chatsDetails);
/** 
  if (addedChat != null && typeof addedChat !== "undefined") {
    const activeChatDetail = chatsDetails.find(
      (detail) => detail.chatId == addedChat.activeChatId
    );

    // Find the index of the object to replace in the questionAnswers array
    const index = chatsDetails.findIndex(
      (detail) => detail.chatId == addedChat.activeChatId
    );

 
    const activeQuestionAnswers = activeChatDetail.questionAnswers;
    console.log("active ques ans is ...", _.cloneDeep 
    (activeQuestionAnswers));

    const temp = _.cloneDeep(activeChatDetail.questionAnswers)

    const newActiveQuestionAnswers =  _.concat(activeQuestionAnswers, {
      id: activeQuestionAnswers.length ,
      question: addedChat.question,
      answer: addedChat.answer,
    });

    console.log(" new active question answer ",newActiveQuestionAnswers);
    
    const updatedActiveQuestionAnswer = Object.assign(newActiveQuestionAnswers, {
      chatId: addedChat.activeChatId,
      active: true,
          });

    console.log(
      "updated active question answer is ..", updatedActiveQuestionAnswer
    );
    // Replace the existing object with the new one
    const newChatsDetails = _.cloneDeep(chatsDetails);
    newChatsDetails[index].questionAnswers = updatedActiveQuestionAnswer;

    console.log(
      "updated active question answer is ..",  newChatsDetails
    );

    /** -- this will only trigger when it is part of a component property like onclick or callback function
    console.log("dipatching added question answer ", chatsDetails);
      //time to dispatch the added chat to the chatdetails array, but need to get the active chat from array
      dispatchDetails({
        type: "added",
        newChatsDetails,
      });
      
    }
*/
    let elem = <div></div>

    if (selectedChat !== null && typeof selectedChat !== undefined) {

      console.log("selected chat from")
    
       elem = chatsDetails.map(function (chatDetail) {
      if (chatDetail.chatId == selectedChat) {
        return <ChatDetail questionAnswers={chatDetail.questionAnswers} />;
      }
    });

    console.log("filter chat details view ..", elem)
      
    
    }


    return <div>{elem}</div>;

}

function ChatDetail({ questionAnswers }) {
  const elem = (
    <Fragment>
      <div className="chatDetailRow">
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
  const elem = (
    <Fragment>
      <div className="question">
        <p className="qText"> {questionAnswer.question} </p>
      </div>
      <div className="answer">
        <p className="aText"> {questionAnswer.answer} </p>
      </div>
    </Fragment>
  );
  return elem;
}
