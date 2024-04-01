import React, { useEffect } from "react";
import { Login } from "./pages/Login";
import { Route, Switch, withRouter } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { SignupConfirmation } from "./pages/SignupConfirmation";
import {
  withGlobalContext,
  withGlobalContextProvider
} from "./contexts/GlobalContext";
import { Dashboard } from "./pages/Dashboard";
import { Communities } from "./pages/Communities";
import { NotFoundPage } from "./components/NotFoundPage";
import { getToken } from "./utilities/getToken";
import IdentityService from "./services/IdentityService";
import { setIdentity } from "./contexts/actions/login";

const App: React.FC = ({ history, globalContext }: any) => {
  useEffect(() => {
    (async () => {
      const token = getToken();
      if (!token) {
        history.push("/login");
      }
      const identity = await IdentityService.getIdentity();
      await globalContext.dispatch(setIdentity, { identity });
    })();
  }, []);

  return (
    <Switch>
      <Route path={"/login"}>
        <Login />
      </Route>
      <Route exact path={"/signup"}>
        <Signup />
      </Route>
      <Route exact path={"/signup/confirm"}>
        <SignupConfirmation />
      </Route>
      <Route path={"/dashboard"}>
        <Dashboard />
      </Route>
      <Route exact path={"/communities"}>
        <Communities />
      </Route>
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default withGlobalContextProvider(withGlobalContext(withRouter(App)));
