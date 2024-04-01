import React from "react";
import styled from "styled-components";
import { PRIMARY_FONT } from "../configurations/styles";

export const Copyright: React.FC<any> = () => {
  return <Wrapper>Copyright CSCC01 BestTeam All Rights Reserved</Wrapper>;
};

const Wrapper = styled.div`
  font-family: ${PRIMARY_FONT};
  text-align: left;
  opacity: 0.5;
  border-top: #8d8d8d 1px solid;
  margin-top: 30px;
  font-size: 12px;
  padding-top: 10px;
`;
