import { Fragment } from "react";
import React, { StrictMode } from "react";
import { useChats, useChatsDispatch } from "./context.js";
import { useState, useRef, useEffect } from "react";
import SendButton from "./sendButton.svg";
import { useChatsDetails, useChatsDetailsDispatch } from "./context.js";
import _ from "lodash";

//addedChatId is callback to pass the chatId back to the parent chatdetails
export function ChatInput({addedChatId}) {
    const chats = useChats();
    const dispatch = useChatsDispatch();

    const chatsDetails = useChatsDetails();
    const dispatchDetails = useChatsDetailsDispatch();
  
    console.log("chat details dispatch is ", dispatchDetails)

    const [newChat, setNewChat] = useState(false);

    //for the input text chat enter press key
    function newChatEnter(e) {
        console.log("enter ..", e);
        if (e.key === "Enter") {
          console.log("enter key add value is...", e.target.value);
          //textInput.current.removeEventListener("onKeyDown", newChatEnter);
             
          setNewChat(true);

          const activeChatId = chats.filter((chat)=> chat.active == true)[0].id

          console.log("active chat id in chatinput is ", activeChatId);
          
          //pass the activeId and the input question/answer back to chatdetails
          addedChatId( activeChatId ,e.target.value,"sample answer coming from chatgpt");

          const addedChat = {activeChatId: activeChatId, question:e.target.value, answer:"sample answer coming from chatgpt"}
          //pass the new chatId back to the parent to update the chatdetails component
            /**  */

            handleChatEnterforDetails(chatsDetails,dispatchDetails,addedChat )


        }
      }

      //for the send icon button click
      function newChatSendButton(e){
        setNewChat(true);

          //pass the new chatId back to the parent to update the chatdetails component
          addedChatId( chats.length + 1);

          dispatch({
            type: "added",
            id: chats.length + 1,
            text: `${chats.length + 1} new chat`
          });

      }

    const elem = (
        <Fragment>
    <div id="title" className="title">
    <input
    id="questionInput"

      type="text"
      class="form-control"
      aria-label="Default"
      aria-describedby="inputGroup-sizing-default"
      placeholder="Type your question here..."
      onKeyPress={newChatEnter}
     
    />
  </div>
  <button id="sendButton"  onClick={newChatSendButton} >
    <img id="sendIcon" className="sendButton" src={SendButton} alt="React Logo" />
  </button>
  </Fragment>
    )
    return elem;


    function handleChatEnterforDetails (chatsDetails, dispatchDetails, addedChat) {
        {
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
              */
              dispatchDetails({
                type: "changed",
                payload: updatedActiveQuestionAnswer,
              });
            
            }
    }

}

