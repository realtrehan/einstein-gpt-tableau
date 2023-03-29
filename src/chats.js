import {
  useChats,
  useChatsDispatch,
  useChatsDetailsDispatch,
  gptResponses,
} from "./context.js";

import { ChatsDetailsList } from "./chatDetails.js";
import { Fragment, useState } from "react";
import React, { StrictMode } from "react";
import { Observer, observer } from "mobx-react";
import { initialChats as chats } from "./context.js";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export const ChatsList = observer(function ({ selectChat }) {
  // const chats = useChats();
  // const chatsDispatch = useChatsDispatch();
  //const chatsDetailsDispatch = useChatsDetailsDispatch();

  const [editChatID, setEditChatID] = useState(null);
  const [inputVal, setInputVal] = useState(null);

  console.log("chat list triggereed..", chats);

  const Chat = observer(function ({ chat }) {
    const [hover, setHover] = useState("");
    const [highlighted, setHighlighted] = useState("");

    return (
      <div className="row p-1">
        <div className="col-9">
          <div
            className={chat.active ? "highlighted" : `${highlighted} ${hover}`}
            id={chat.id}
            onClick={(e) => {
              setHighlighted("highlighted");
              buttonClicked(e);
            }}
            onMouseEnter={() => setHover("hover " + highlighted)}
            onMouseLeave={() => setHover("" + highlighted)}
          >
            {chat.text}
          </div>
        </div>

        <div id={chat.id} onClick={(e) => editChatName(e)} className="col-3">
          <EditOutlinedIcon id={chat.id} onClick={(e) => editChatName(e)} />
        </div>
      </div>
    );
  });

  function editChatName(e) {
    console.log("selected edit chat id..", e.target.id);

    setEditChatID(e.target.id);
  }

  //for the edit chat name enter key
  function editChatEnter(e) {
    console.log("enter edit chat submit..", e);
    if (e.key === "Enter") {
      chats.chats.forEach((chat) => {
        if (chat.id == editChatID) {
          chat.text = inputVal;
        } //update the chat array with new name;
        const newChatArray = _.cloneDeep(chats.chats);
        _.assign(chats.chats, newChatArray); //updat the mobx store
      });

      setEditChatID(null); //set the edit state back to null;
    }
  }

  function buttonClicked(e) {
    console.log("selected chat id..", e.target.id);

    selectChat(e.target.id);

    chats.chats.forEach((chat) => {
      chat.id == e.target.id ? (chat.active = true) : (chat.active = false);
    });
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
      {chats.chats.map((chat) =>
        editChatID == chat.id ? (
          <input
            type="text"
            class="form-control "
            placeholder="rename chat..press enter to save"
            onKeyPress={editChatEnter}
            onChange={(e) => {
              setInputVal(e.target.value);
            }}
          />
        ) : (
          <Chat id={chat.id} chat={chat} />
        )
      )}
      <p></p>
    </div>
  );
});
