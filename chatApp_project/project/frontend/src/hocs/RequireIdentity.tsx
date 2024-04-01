import React, { Component } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import styled from "styled-components";

export const withIdentity = (WrappedComponent: any) => {
  return class extends Component<any> {
    render() {
      return (
        <GlobalContext.Consumer>
          {value => {
            return value.state.identity ? (
              <WrappedComponent {...this.props} />
            ) : (
              <AuthLoadingPage>
                <i
                  className="fa fa-circle-o-notch fa-spin"
                  aria-hidden="true"
                />
                <br />
                <br />
                Brewing some coffee...
              </AuthLoadingPage>
            );
          }}
        </GlobalContext.Consumer>
      );
    }
  };
};

const AuthLoadingPage = styled.div`
  padding: 100px;
  text-align: center;
  font-size: 30px;
  opacity: 0.4;
`;
