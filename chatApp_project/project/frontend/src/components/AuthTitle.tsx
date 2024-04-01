import React from "react";
import styled from "styled-components";
import { PRIMARY_FONT } from "../configurations/styles";

export const AuthTitle: React.FC<any> = ({ title, description }) => {
  return (
    <Wrapper>
      <h1>{title}</h1>
      <p>{description}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: ${PRIMARY_FONT};
  text-align: left;
  h1 {
    font-size: 40px;
    font-weight: normal;
  }
`;
