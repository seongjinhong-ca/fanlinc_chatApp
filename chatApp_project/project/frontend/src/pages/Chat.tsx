import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ChatMessage } from "../components/ChatMessage";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { PRIMARY_FONT } from "../configurations/styles";
import openSocket from "socket.io-client";
import { withRouter, useParams } from "react-router-dom";
import { withGlobalContext } from "../contexts/GlobalContext";
import { withIdentity } from "../hocs/RequireIdentity";
import { fetchAllChats } from "../contexts/actions/chat";
import { UsernameText } from "../components/UsernameText";

const SOCKET_LINK = "http://localhost:3000";

const socket = openSocket(SOCKET_LINK);
socket.on("connect", () => console.log("Socket connected..."));

export const _Chat = ({ globalContext, location }: any) => {
  const [messages, setMessages]: [any, any] = useState([]);
  const [text, setText] = useState("");
  const [roomName, setRoomName] = useState("my-gaming-chat");
  const { chatId } = useParams();

  useEffect(() => {
    globalContext.dispatch(fetchAllChats, {});
    const roomName = chatId || "myroom";
    const username = globalContext.state.identity.uid;
    setRoomName(roomName);
    socket.emit("SET_UID", username);
    socket.emit("JOIN_ROOM", roomName);
  }, []);

  socket.on("NEW_MESSAGE", (msg: any) => {
    let newMessages = [...messages];
    newMessages.push({
      body: msg.message.text,
      username: msg.message.uid,
      timestamp: new Date(msg.message.sentAt)
    });
    setMessages(newMessages);
  });

  const sendMessage = (msg: string) => {
    socket.emit("SEND_MESSAGE", {
      roomId: roomName,
      text: msg
    });
  };

  const getChatName = () => {
    const chats = globalContext.state.chats || [];
    for (const chat of chats) {
      if (chat.chatId === chatId) {
        return chat.name;
      }
    }
    return chatId;
  };

  return (
    <PageWrapper>
      <ChatTitle>#{getChatName()}</ChatTitle>
      <LowerWrapper>
        <SidebarWrapper>
          <h2>Members</h2>
          <MemberItem>
            <MemberProfilePicture />
            <UsernameText username={"andrew yang"} isPro={true} />
          </MemberItem>
          <MemberItem>
            <MemberProfilePicture />
            <UsernameText username={"luctug31881"} />
          </MemberItem>
          <MemberItem>
            <MemberProfilePicture />
            <UsernameText username={"BookBrace"} />
          </MemberItem>
          <MemberItem>
            <MemberProfilePicture />
            <UsernameText username={"CottonPitcher"} />
          </MemberItem>
          <br />
          <Button text={"Invite"} icon={"plus"} link compact />
        </SidebarWrapper>
        <ChatWrapper>
          {messages.map((message: any, key: any) => {
            return (
              <ChatMessage
                body={message.body}
                username={message.username}
                timestamp={message.timestamp}
                key={key}
              />
            );
          })}
          <br />
          <ChatTextInputWrapper>
            <TextInput
              placeholder={"Enter your message..."}
              text={text}
              onTextChange={setText}
              onKeyPress={(event: any) => {
                if (event.key === "Enter" && text !== "") {
                  sendMessage(text);
                  setText("");
                }
              }}
            />
          </ChatTextInputWrapper>
          <Button text={"Send"} />
        </ChatWrapper>
      </LowerWrapper>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  padding: 30px;
`;

const LowerWrapper = styled.div`
  display: flex;
`;

const SidebarWrapper = styled.div`
  width: 300px;
  padding-right: 20px;
  h2 {
    text-transform: uppercase;
    font-size: 20px;
    opacity: 0.4;
  }
`;

const ChatWrapper = styled.div`
  flex: 1;
`;

const ChatTitle = styled.h2`
  font-family: ${PRIMARY_FONT};
  font-weight: normal;
  padding-bottom: 15px;
`;

const ChatTextInputWrapper = styled.div`
  display: inline-block;
  padding-right: 20px;
  width: calc(100% - 100px);
`;

const MemberItem = styled.div`
  border-radius: 5px;
  transition: all ease 0.4s;
  padding: 10px;
  padding-left: 0;
  cursor: pointer;
  &:hover {
    background-color: #eeeeee;
    transition: all ease 0.4s;
    padding-left: 10px;
  }
`;

const MemberProfilePicture = styled.div`
  width: 40px;
  height: 40px;
  background-color: red;
  border-radius: 20px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 15px;
  background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRluevlhSJH9F_xnxbiMKawTvz8xCHYrw2oWZ7PzfaT7T7kPzlB&s");
  background-size: cover;
  background-position: center;
`;

export const Chat = withGlobalContext(withIdentity(withRouter(_Chat)));
