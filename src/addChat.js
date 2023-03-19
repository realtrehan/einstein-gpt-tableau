import { useChats, useChatsDispatch } from "./context.js";

import React, { StrictMode } from "react";
import { Observer, observer } from "mobx-react";
import { initialChats  as chats, initialChatsDetails as chatsDetailsStore} from "./context.js";
import { autorun, trace } from "mobx";

export const AddChat =   observer( function ({setSelectedChat}) {


  const chatsDetails = chatsDetailsStore.chatsDetails;

  const addChatButton = (
    
    <button className="btn btn-outline-info btn-sm btn-block"
      onClick={
        buttonClicked
      }
    >
      New Chat
    </button>
    
  ) ;

  function buttonClicked(e) {
    console.log("chat lenght is ", chats.chats.length);
   
    chats.chats.forEach(chat=>{chat.active = false }) 

     chatsDetails.push({
      chatId: chats.chats.length,
      questionAnswers: []
    })
   
    setSelectedChat(chats.chats.length)

      chats.chats.push(
        {
        id: chats.chats.length,
        text: `${chats.chats.length +1 }. chat`,
        active: true
      });
    
  }

  return (
 addChatButton
  );
}
)
