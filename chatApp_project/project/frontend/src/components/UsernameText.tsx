import React from "react";
import { withGlobalContext } from "../contexts/GlobalContext";
import styled from "styled-components";
import { PRIMARY_COLOUR } from "../configurations/styles";

const _UsernameText = ({ username, isPro }: any) => {
  return (
    <Wrapper>
      {username}
      {isPro && <ProBadge>PRO</ProBadge>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const ProBadge = styled.span`
  background-color: ${PRIMARY_COLOUR};
  color: white;
  font-size: 0.5em;
  display: inline-block;
  margin-left: 10px;
  padding: 1px 5px 1px 5px;
  border-radius: 2px;
`;

export const UsernameText = withGlobalContext(_UsernameText);
