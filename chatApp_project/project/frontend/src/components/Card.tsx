import React from "react";
import styled from "styled-components";

const _Card = ({ children }: any) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  padding: 20px;
  background-color: white;
  width: 200px;
  box-shadow: rgba(0, 0, 0, 0.1) 5px 5px 10px;
  border-radius: 10px;
  margin: 20px;
`;

export const Card = _Card;
