import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const _NotFoundPage = () => {
  return (
    <PageWrapper>
      <h1>(´・ω・`)</h1>
      <h4>We cannot find the page you are looking for...</h4>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  text-align: center;
  padding: 50px;
  h1 {
    font-size: 40px;
  }
  h4 {
    padding-top: 20px;
    font-weight: 100;
  }
`;

export const NotFoundPage = withRouter(_NotFoundPage);
