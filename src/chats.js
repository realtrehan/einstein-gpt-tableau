import {
  useChats,
  useChatsDispatch,
  useChatsDetailsDispatch,
  gptResponses
} from "./context.js";

import { ChatsDetailsList } from "./chatDetails.js";
import { Fragment, useState } from "react";
import React, { StrictMode } from "react";
import { Observer, observer } from "mobx-react";
import { initialChats  as chats} from "./context.js";



export const ChatsList = observer( function ({ selectChat }) {
 // const chats = useChats();
 // const chatsDispatch = useChatsDispatch();
  //const chatsDetailsDispatch = useChatsDetailsDispatch();

  console.log("chat list triggereed..", chats)


  const Chat = observer( function ({ chat }) {
    const [hover, setHover] = useState("");
    const [highlighted, setHighlighted] = useState("")

    return (
   
      <div

        className={ chat.active? "highlighted": `${highlighted} ${hover}`}
        id={chat.id}
        onClick={(e) => {
            setHighlighted("highlighted")
          buttonClicked(e);
        }}
        onMouseEnter={() => setHover("hover " + highlighted)}
        onMouseLeave={() => setHover("" + highlighted)}
      >
        {chat.text}
      </div>
     
    );
  })
  

  function buttonClicked(e) {
    console.log("selected chat id..", e.target.id);

    selectChat(e.target.id);

    chats.chats.forEach(chat => { chat.id == e.target.id ? chat.active = true : chat.active=false })
/** 
    chatsDispatch({
      type: "changed",
      id: e.target.id
    });
    */
  }


//<Chat id={chat.id} chat={chat} /> chat={gptResponses.responses[0].response}

return (
  <div>
  {chats.chats.map((chat) => (
    <Chat id={chat.id} chat={chat} />
  ))}
  <p></p>
</div>
)
  }

)