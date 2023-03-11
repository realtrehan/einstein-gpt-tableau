import {
  useChats,
  useChatsDispatch,
  useChatsDetailsDispatch
} from "./context.js";

import { ChatsDetailsList } from "./chatDetails.js";
import { Fragment, useState } from "react";
import React, { StrictMode } from "react";

export function ChatsList({ selectChat }) {
  const chats = useChats();
  const chatsDispatch = useChatsDispatch();
  const chatsDetailsDispatch = useChatsDetailsDispatch();

  return (
      <Fragment>
      {chats.map((chat) => (
        <Chat id={chat.id} chat={chat} />
      ))}
    </Fragment>
  );

  function Chat({ chat }) {
    const [hover, setHover] = useState("");

    return (
      <div
        className={`chat ${hover}`}
        id={chat.id}
        onClick={(e) => {
          buttonClicked(e);
        }}
        onMouseEnter={() => setHover("hover")}
        onMouseLeave={() => setHover("")}
      >
        {chat.text}
      </div>
    );
  }

  function buttonClicked(e) {
    console.log("selected chat id..", e.target.id);

    selectChat(e.target.id);

    chatsDispatch({
      type: "changed",
      id: e.target.id
    });
  }
}
