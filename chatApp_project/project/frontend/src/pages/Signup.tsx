import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { AuthTitle } from "../components/AuthTitle";
import { Copyright } from "../components/Copyright";
import { validateEmailAddress } from "../utilities/validators/validateEmailAddress";
import SignupController from "../controllers/SignupController";
import { withRouter } from "react-router-dom";
import { withGlobalContext } from "../contexts/GlobalContext";

const _Signup = ({ history, globalContext }: any) => {
  const [emailAvailable, setEmailAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    // If there is already an identity, then we go to dashboard.
    if (globalContext.state.identity) {
      history.push("/dashboard");
    }
  }, [globalContext]);

  const submitButtonHandler = async () => {
    if (!emailAvailable) {
      setEmailError("");
      if (!validateEmailAddress(email)) {
        return setEmailError("Please enter an valid email address.");
      }
      setLoading(true);
      if (!(await SignupController.isEmailAvailable(email))) {
        setLoading(false);
        return setEmailError("Email address already used by a user.");
      }
      setLoading(false);
      setEmailAvailable(true);
    } else {
      setPasswordError("");
      if (password.length < 8) {
        return setPasswordError("Password must be at least 8 characters.");
      }
      setLoading(true);
      const [_, err] = await SignupController.createUser(
        email,
        password,
        nickname
      );
      if (err) {
        window.alert("Failed to create account.");
        console.error(err);
        setLoading(false);
      } else {
        window.alert("Account created!");
        history.push("/login");
      }
    }
  };

  const loginButtonOnClickHandler = () => {
    history.push("/login");
  };

  return (
    <SignupPageWrapper>
      <AuthTitle
        title={"Create Fanlinc Account"}
        description={
          "Create your Fanlinc account today to start discovering local fan groups!"
        }
      />
      <ControlGroup>
        <TextInput
          placeholder={"Email Address"}
          disabled={loading || emailAvailable}
          text={email}
          onTextChange={setEmail}
          error={emailError}
        />
      </ControlGroup>
      {emailAvailable ? (
        <Fragment>
          <ControlGroup>
            <TextInput
              placeholder={"Nickname"}
              disabled={loading}
              text={nickname}
              onTextChange={setNickname}
            />
          </ControlGroup>
          <ControlGroup>
            <TextInput
              placeholder={"Password"}
              type={"password"}
              disabled={loading}
              text={password}
              onTextChange={setPassword}
              error={passwordError}
            />
          </ControlGroup>
        </Fragment>
      ) : null}
      <ControlGroup>
        <Button
          text={emailAvailable ? "Create Account" : "Confirm"}
          icon={loading ? "circle-o-notch fa-spin" : ""}
          disabled={loading}
          onClick={submitButtonHandler}
        />
        <Button
          text={"Already have an account?"}
          link
          onClick={loginButtonOnClickHandler}
        />
      </ControlGroup>
      <Copyright />
    </SignupPageWrapper>
  );
};

const ControlGroup = styled.div`
  padding-top: 10px;
`;

const SignupPageWrapper = styled.div`
  padding-top: 100px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
`;

export const Signup = withGlobalContext(withRouter(_Signup));
