import React from "react";
import styled from "styled-components";
import { PRIMARY_FONT } from "../configurations/styles";

export const ChatMessage = ({
  body,
  username,
  timestamp
}: {
  body: string;
  username: string;
  timestamp: Date;
}) => {
  return (
    <ChatMessageWrapper>
      <div>
        <UsernameText>
          {username} {timestamp.toISOString()}
        </UsernameText>
      </div>
      {body}
    </ChatMessageWrapper>
  );
};

const ChatMessageWrapper = styled.div`
  border-bottom: rgba(0, 0, 0, 0.2) 1px solid;
  padding: 10px 0 10px 0;
  font-family: ${PRIMARY_FONT};
`;

const UsernameText = styled.span`
  font-size: 12px;
  color: #767676;
`;
