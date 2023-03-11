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

export function ChatSelected() {
  const [selectedChat, setSelectedChat] = useState("");
  
  const [addedChat, setAddedChat] = useState(null);

  const [newChat, setNewChat] = useState(false);
  const detailsDispatch = useChatsDetailsDispatch();
  const chatDetails = useChatsDetails();

  const textInput = useRef(null);

  //call back to get selected chat id from chats component and pass it to chatdetails
  const selectChat = function (chatId) {
    console.log("call back id set ", chatId);
    setSelectedChat(chatId);
  };

  // callback to get the chatId for chatinput component and pass it to chat details
  const addedChatId = function (activeChatId, question, answer) {

    setAddedChat({activeChatId, question, answer})
  };

  const elem = (
    <div id="page" className="flex-container">
      <div id="chatCol" className="chatsCol">
      <ChatsDetailsProvider>
        <ChatsProvider>
          <ChatInput addedChatId={addedChatId} />
          <AddChat newChat={newChat} />
          <ChatsList selectChat={selectChat} />
        </ChatsProvider>
        </ChatsDetailsProvider>
      </div>
      <div id="chatDetailCol" className="chatDetailsCol">
        <ChatsDetailsProvider>
          <ChatsDetailsList selectedChat={selectedChat} addedChat={addedChat} />
        </ChatsDetailsProvider>
      </div>
    </div>
  );

  return elem;
}
