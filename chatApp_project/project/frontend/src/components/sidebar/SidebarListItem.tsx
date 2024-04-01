import React from "react";
import styled from "styled-components";

const _SidebarListItem = ({ children, onClick, active }: any) => {
  return (
    <ListItemWrapper onClick={onClick} active={active}>
      <ListItemTextWrapper>{children}</ListItemTextWrapper>
    </ListItemWrapper>
  );
};

type ListItemWrapperProps = {
  active?: boolean;
};

const ListItemWrapper = styled.div`
  background-color: white;
  cursor: pointer;
  transition: all ease 0.2s;

  background-color: ${(props: ListItemWrapperProps) =>
    props.active ? "#eeeeee" : "white"};

  &:hover {
    background-color: #eeeeee;
    transition: all ease 0.2s;
  }
`;

const ListItemTextWrapper = styled.div`
  padding: 10px 20px 10px 20px;
`;

export const SidebarListItem = _SidebarListItem;
