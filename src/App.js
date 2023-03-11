import { ChatsList } from "./chats.js";
import { ChatsProvider, ChatsDetailsProvider } from "./context.js";
import { AddChat } from "./addChat.js";
import { ChatsDetailsList } from "./chatDetails.js";

import { ChatSelected } from "./chatSelected.js";
import React, { StrictMode } from "react";

export default function App() {
  return <ChatSelected />;
}
