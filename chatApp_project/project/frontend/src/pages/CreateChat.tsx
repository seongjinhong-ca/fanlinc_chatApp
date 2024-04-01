import React, { useState } from "react";
import { withGlobalContext } from "../contexts/GlobalContext";
import styled from "styled-components";
import { PRIMARY_FONT } from "../configurations/styles";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { withRouter } from "react-router-dom";
import ChatManagementService from "../services/ChatManagementService";
import { fetchAllChats, fetchJoinedChatIds } from "../contexts/actions/chat";

const _CreateChat = ({ history, globalContext }: any) => {
  const [loading, setLoading] = useState(false);
  const [chatName, setChatName] = useState("");

  const createChat = async () => {
    setLoading(true);
    try {
      await ChatManagementService.createChat(chatName);
    } catch (e) {
      console.error(e);
      window.alert("Failed to create chat!");
      return;
    } finally {
      setLoading(false);
    }
    // Reload a list of joined chats because we just joined a new one.
    globalContext.dispatch(fetchJoinedChatIds, {});
    globalContext.dispatch(fetchAllChats, {});
    window.alert("Chat successfully created!");
    history.push("/dashboard");
  };

  return (
    <PageWrapper>
      <h2>Create Chat</h2>
      <p>
        Create a new private chat, you will be automatically assigned as a
        moderator for this chat. By default the chat will be private, you can
        choose to publish your chat at any time.
      </p>
      <TextInput
        type={"text"}
        placeholder={"Chat name"}
        text={chatName}
        onTextChange={setChatName}
        disabled={loading}
      />
      <br />
      <Button
        text={"Create"}
        icon={"check"}
        onClick={createChat}
        disabled={loading || !chatName}
      />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  font-family: ${PRIMARY_FONT};
  padding: 30px;
`;

export const CreateChat = withGlobalContext(withRouter(_CreateChat));
