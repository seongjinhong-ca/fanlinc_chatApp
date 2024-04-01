import React, { Component } from "react";

export const GlobalContext: React.Context<any> = React.createContext({});

export const withGlobalContextProvider = (WrappedComponent: any) => {
  return class extends Component {
    constructor(props: any) {
      super(props);
      this.state = {};
    }

    updateState = (newState: any) => {
      return new Promise(resolve => {
        this.setState(
          {
            ...this.state,
            ...newState
          },
          () => resolve(this.state)
        );
      });
    };

    dispatch = async (action: Function, args: any) => {
      await action(this.updateState, this.state, args);
    };

    render() {
      return (
        <GlobalContext.Provider
          value={{
            updateState: this.updateState,
            dispatch: this.dispatch,
            state: this.state
          }}
        >
          <WrappedComponent {...this.props} />
        </GlobalContext.Provider>
      );
    }
  };
};

export const withGlobalContext = (WrappedComponent: any) => {
  return class extends Component<any> {
    render() {
      return (
        <GlobalContext.Consumer>
          {value => {
            return <WrappedComponent globalContext={value} {...this.props} />;
          }}
        </GlobalContext.Consumer>
      );
    }
  };
};
