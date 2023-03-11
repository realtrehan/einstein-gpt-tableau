import { createContext, useContext, useReducer } from "react";
import React, { StrictMode } from "react";

const ChatsContext = createContext(null);

const ChatsDispatchContext = createContext(null);

const ChatsDetailsContext = createContext(null);

const ChatsDetailsDispatchContext = createContext(null);

export function useChats() {
  return useContext(ChatsContext);
}

export function useChatsDispatch() {
  return useContext(ChatsDispatchContext);
}

export function ChatsProvider({ children }) {
  const [chats, dispatch] = useReducer(chatsReducer, initialChats);

  return (
    <ChatsContext.Provider value={chats}>
      <ChatsDispatchContext.Provider value={dispatch}>
        {children}
      </ChatsDispatchContext.Provider>
    </ChatsContext.Provider>
  );
}

export function useChatsDetails() {
  return useContext(ChatsDetailsContext);
}

export function useChatsDetailsDispatch() {
  return useContext(ChatsDetailsDispatchContext);
}

export function ChatsDetailsProvider({ children }) {
  const [chatsDetails, dispatchDetails] = useReducer(
    chatsDetailsReducer,
    initialChatsDetails
  );

  return (
    <ChatsDetailsContext.Provider value={chatsDetails}>
      <ChatsDispatchContext.Provider value={dispatchDetails}>
        {children}
      </ChatsDispatchContext.Provider>
    </ChatsDetailsContext.Provider>
  );
}

function chatsReducer(chats, action) {
  switch (action.type) {
    case "added": {
      return [
        ...chats,
        {
          id: action.id,
          text: action.text
        }
      ];
    }
    case "changed": {
      return chats.map((chat) => {
        if (chat.id == action.id) {
          const changedChat = { active: true, ...chat };
          return changedChat;
        } else {
          return chat;
        }
      });
    }
    case "deleted": {
      return chats.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

function chatsDetailsReducer(chatsDetails, action) {
  switch (action.type) {
    case "added": {
      return [
        ...chatsDetails,
        {
          chatId: action.payload.chatId
        }
      ];
    }
    case "changed": {
      return chatsDetails.map((t) => {
        if (t.id === action.payload.chatId) {
          return action.payload;
        } else {
          return t;
        }
      });
    }

    case "selected": {
      return chatsDetails.map((chatDetail) => {
        if (chatDetail.chatId === action.payload.chatId) {
          const changedChatDetail = { active: true, ...chatDetail };
          return changedChatDetail;
        } else {
          return chatDetail;
        }
      });
    }

    case "deleted": {
      return chatsDetails.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialChats =[
  {id:0, text:"0 first chat ", active:true}
]
/** 
const initialChats = [
  { id: 0, text: "1.....", active: false },
  { id: 1, text: "2.....", active: true },
  { id: 2, text: "3.....", active: false }
];
*/

const initialChatsDetails = [
  {
  chatId:0,
  active: true,
  questionAnswers :[
    {
      id:0,
      question:'your first question',
      answer:''
    }
  ]
}
]

/** 
const initialChatDetails = [
  {
    chatId: 0,
    active: false,
    questionAnswers: [
      {
        id: 0,
        question:
          "1.1 question..tel me more about tabGPT. be an analyst and find areas of improvement.",
        answer: `1.1 answer...tel me more about tabGPT. be an analyst and find areas of improvement.
          1.1 answer...tel me more about tabGPT. be an analyst and find areas of improvement.
          1.1 answer...tel me more about tabGPT. be an analyst and find areas of improvement.
          1.1 answer...tel me more about tabGPT. be an analyst and find areas of improvement.
          1.1 answer...tel me more about tabGPT. be an analyst and find areas of improvement.
          1.1 answer...tel me more about tabGPT. be an analyst and find areas of improvement.`
      },
      { id: 1, question: "1.2 question..", answer: "1.2 answer...." }
    ]
  },
  {
    chatId: 1,
    active: true,
    questionAnswers: [
      { id: 0, question: "2.1 question..", answer: "2.1 answer...." },
      { id: 1, question: "2.2 question..", answer: "2.2 answer...." }
    ]
  }
];
*/

