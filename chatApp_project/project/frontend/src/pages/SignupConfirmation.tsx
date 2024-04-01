import React from "react";
import styled from "styled-components";
import { PRIMARY_FONT } from "../configurations/styles";

export const SignupConfirmation = () => {
  return (
    <SignupConfirmationPageWrapper>
      <h2>Please Check Your Email</h2>
      <p>
        We have sent an confirmation email to your index. Please following the
        instructions in that email to complete signup.
      </p>
    </SignupConfirmationPageWrapper>
  );
};

const SignupConfirmationPageWrapper = styled.div`
  text-align: center;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  font-family: ${PRIMARY_FONT};
`;
