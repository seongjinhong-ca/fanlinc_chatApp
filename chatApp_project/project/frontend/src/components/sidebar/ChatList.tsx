import React, { useEffect } from "react";
import { withGlobalContext } from "../../contexts/GlobalContext";
import { SidebarListItem } from "./SidebarListItem";
import { fetchAllChats, fetchJoinedChatIds } from "../../contexts/actions/chat";
import { withRouter } from "react-router-dom";

const _ChatList = ({ globalContext, history, location }: any) => {
  useEffect(() => {
    globalContext.dispatch(fetchAllChats, {});
    globalContext.dispatch(fetchJoinedChatIds, {});
  }, []);

  const getChatName = (chatId: string) => {
    const chats = globalContext.state.chats || [];
    for (const chat of chats) {
      if (chat.chatId === chatId) {
        return chat.name;
      }
    }
    return chatId;
  };

  const openChat = (chatId: string) => {
    history.push("/dashboard/chats/" + chatId);
  };

  const isCurrentChat = (chatId: string) => {
    return location.pathname.match("^/dashboard/chats/" + chatId + "$");
  };

  return (
    <div>
      {(globalContext.state.joinedChatIds || []).map((chatId: string) => {
        return (
          <SidebarListItem
            key={chatId}
            onClick={() => openChat(chatId)}
            active={isCurrentChat(chatId)}
          >
            {getChatName(chatId)}
          </SidebarListItem>
        );
      })}
    </div>
  );
};

export const ChatList = withGlobalContext(withRouter(_ChatList));
