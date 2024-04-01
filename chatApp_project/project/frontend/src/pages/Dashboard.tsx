import React from "react";
import { Sidebar } from "../components/sidebar/Sidebar";
import styled from "styled-components";
import { withIdentity } from "../hocs/RequireIdentity";
import { Route, Switch } from "react-router";
import { Chat } from "./Chat";
import { CreateChat } from "./CreateChat";
import { Profile } from "./Profile";
import { Community } from "./Community";
import { Event } from "./Event";
import { Explore } from "./Explore";
import { LoadingIndicator } from "../LoadingIndicator";

const _Dashboard = () => {
  return (
    <div>
      <Sidebar />
      <PageWrapper>
        <LoadingIndicator />
        <Switch>
          <Route exact path={"/dashboard"}>
            <Explore />
          </Route>
          <Route path={"/dashboard/chats/:chatId"}>
            <Chat />
          </Route>
          <Route path={"/dashboard/create_chat"}>
            <CreateChat />
          </Route>
          <Route path={"/dashboard/profile"}>
            <Profile />
          </Route>
          <Route path={"/dashboard/communities/:communityId"}>
            <Community />
          </Route>
          <Route path={"/dashboard/events/:eventId"}>
            <Event />
          </Route>
        </Switch>
      </PageWrapper>
    </div>
  );
};

const PageWrapper = styled.div`
  padding-left: 300px;
`;

export const Dashboard = withIdentity(_Dashboard);
