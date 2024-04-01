import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import styled from "styled-components";
import { TextInput } from "../components/TextInput";
import { validateEmailAddress } from "../utilities/validators/validateEmailAddress";
import { AuthTitle } from "../components/AuthTitle";
import { withRouter } from "react-router-dom";
import { Copyright } from "../components/Copyright";
import IdentityService from "../services/IdentityService";
import { withGlobalContext } from "../contexts/GlobalContext";
import { loginWithToken, setIdentity } from "../contexts/actions/login";

const _Login = ({ history, globalContext }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If there is already an identity, then we go to dashboard.
    if (globalContext.state.identity) {
      history.push("/dashboard");
    }
  }, [globalContext]);

  const loginButtonOnClickHandler = async () => {
    setEmailError("");
    setPasswordError("");
    if (!validateEmailAddress(email)) {
      setEmailError("You must enter a valid email.");
      return;
    }

    setLoading(true);
    const { token } = (await IdentityService.login(email, password)) || {};
    if (!token) {
      setPasswordError("Wrong email address or password.");
    } else {
      await globalContext.dispatch(loginWithToken, { token });
      const identity = await IdentityService.getIdentity();
      await globalContext.dispatch(setIdentity, { identity });
    }
    setLoading(false);
  };

  const signupButtonOnClickHandler = async () => {
    history.push("/signup");
  };

  return (
    <LoginPageWrapper>
      <AuthTitle
        title={"Login to Fanlinc"}
        description={
          "Login to your Fanlinc account to start exploring communities!"
        }
      />
      <ControlGroup>
        <TextInput
          placeholder={"Email Address"}
          text={email}
          onTextChange={setEmail}
          disabled={loading}
          error={emailError}
        />
      </ControlGroup>
      <ControlGroup>
        <TextInput
          placeholder={"Password"}
          type={"password"}
          text={password}
          error={passwordError}
          onTextChange={setPassword}
          disabled={loading}
        />
      </ControlGroup>
      <ControlGroup>
        <Button
          text={"Login"}
          icon={"sign-in"}
          disabled={loading}
          onClick={loginButtonOnClickHandler}
        />
        <Button
          text={"Don't have an account?"}
          link
          disabled={loading}
          onClick={signupButtonOnClickHandler}
        />
      </ControlGroup>
      <Copyright />
    </LoginPageWrapper>
  );
};

const ControlGroup = styled.div`
  padding-top: 10px;
`;

const LoginPageWrapper = styled.div`
  padding-top: 100px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
`;

export const Login = withGlobalContext(withRouter(_Login));
