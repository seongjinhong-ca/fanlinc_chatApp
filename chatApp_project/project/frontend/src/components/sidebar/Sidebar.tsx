import React from "react";
import { withGlobalContext } from "../../contexts/GlobalContext";
import styled from "styled-components";
import { ProfileHeading } from "./ProfileHeading";
import { Button } from "../Button";
import { logoutAndClearStorage } from "../../contexts/actions/logout";
import { withRouter } from "react-router-dom";
import { CommunityList } from "./CommunityList";
import { ChatList } from "./ChatList";
import { PRIMARY_FONT } from "../../configurations/styles";
import { SidebarListItem } from "./SidebarListItem";

const _Sidebar = ({ globalContext, history, location }: any) => {
  const logout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await globalContext.dispatch(logoutAndClearStorage, {});
      history.push("/login");
    }
  };

  return (
    <SidebarContainer>
      <ProfileHeading />
      <ExploreWrapper>
        <SidebarListItem
          active={location.pathname.match("^/dashboard$")}
          onClick={() => history.push("/dashboard")}
        >
          <i className="fa fa-compass" aria-hidden="true" /> Explore
        </SidebarListItem>
      </ExploreWrapper>
      <SidebarSectionHeading>Communities</SidebarSectionHeading>
      <CommunityList />
      <SidebarSectionHeading>Chats</SidebarSectionHeading>
      <ChatList />
      <Button
        text={"Create Chat"}
        link
        icon={"plus"}
        onClick={() => {
          history.push("/dashboard/create_chat");
        }}
      />
      <br />
      <br />
      <Button text={"Logout"} link icon={"sign-out"} onClick={logout} />
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  all: unset;
  background-color: white;
  width: 300px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  box-shadow: rgba(0, 0, 0, 0.2) 0 0 20px;
  font-size: 14px;
  line-height: 1.43 !important;
  letter-spacing: 0 !important;
  font-family: ${PRIMARY_FONT};
`;

const SidebarSectionHeading = styled.div`
  padding: 10px 20px 10px 20px;
  font-size: 14px;
  text-transform: uppercase;
  color: #747474;
`;

const ExploreWrapper = styled.div`
  font-size: large;
`;

export const Sidebar = withGlobalContext(withRouter(_Sidebar));
