import { useChats, useChatsDispatch } from "./context.js";

import React, { StrictMode } from "react";

export function AddChat({ newChat }) {
  const chats = useChats();
  const dispatch = useChatsDispatch();

  if (newChat) {
    console.log("chat icon button submitted");
    dispatch({
      type: "added",
      id: chats.length + 1,
      text: `${chats.length + 1} new chat`
    });
  }

  let addChatButton = (
    <button
      onClick={
        buttonClicked
      }
    >
      New Chat
    </button>
  );

  function buttonClicked(e) {
    console.log("chat lenght is ", chats.length);

    dispatch({
      type: "added",
      id: chats.length + 1,
      text: `${chats.length + 1} new chat`
    });
  }

  return addChatButton;
}
