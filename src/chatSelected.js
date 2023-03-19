import { ChatsList } from "./chats.js";
import {
  ChatsProvider,
  ChatsDetailsProvider,
  useChatsDetailsDispatch,
  useChatsDetails,
} from "./context.js";
import { AddChat } from "./addChat.js";
import { ChatsDetailsList } from "./chatDetails.js";

import { useState, useRef, useEffect } from "react";
import SendButton from "./sendButton.svg";
import React, { StrictMode } from "react";
import { ChatInput } from "./chatInput.js";
import { observer } from "mobx-react";
import 'bootstrap/dist/css/bootstrap.css';
import { ChatRes } from "./lib/chatres.js";
import { useConfig } from "./tableau/useConfig.js";

export const ChatSelected = observer( function () {

  const [selectedChat, setSelectedChat] = useState("");
  
  const [addedChat, setAddedChat] = useState(null);

  const [newChat, setNewChat] = useState(false);
  
 
 // const chatDetails = useChatsDetails();
 //const  config = useConfig();

  //call back to get selected chat id from chats component and pass it to chatdetails
  const selectChat = function (chatId) {
    console.log("call back id set ", chatId);
    setSelectedChat(chatId);
  };

/** rr
  // callback to get the chatId for chatinput component and pass it to chat details
  const addedChatId = function (activeChatId, question, answer) {

    setAddedChat({activeChatId, question, answer})
  };
 */
const styleChat = {
   height: 'auto',
   maxheight: '1920px',

}
const styleDetail = {
  height: '600px',
  maxheight: '1920px',
}


  const elem = (
    <div id="page" className="container-fluid bg-light  " style={styleDetail} >
      <div className="row">
      <div id="chatCol" style={styleChat}  className="col-sm-3 bg-secondary text-light pt-2">
         
         <div className="d-flex flex-column align-items-stretch">
        
          <AddChat setSelectedChat={setSelectedChat} />
          <p></p>
          <ChatsList selectChat={selectChat} />
          </div>  
      </div>
      
      <div id="chatDetailCol" style={styleDetail}  className="col-sm-9 bg-light text-dark">
      <ChatInput/>
  
          <ChatsDetailsList selectedChat={selectedChat} addedChat={addedChat} />
      
     
      </div>
      </div>
    </div>
  );

  return elem;
}
)




