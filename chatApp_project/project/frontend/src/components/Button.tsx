import React from "react";
import styled from "styled-components";
import {
  BORDER_RADIUS,
  PRIMARY_COLOUR,
  PRIMARY_FONT,
  WHITE_TEXT_COLOUR
} from "../configurations/styles";
import { darken } from "polished";

type ButtonProps = {
  text: string;
  icon?: string;
  link?: boolean;
  compact?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  link = false,
  compact = false,
  disabled = false,
  onClick = () => {}
}) => {
  const onClickProxy = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <ButtonWrapper
      onClick={onClickProxy}
      disabled={disabled}
      link={link}
      compact={compact}
    >
      {icon ? (
        <IconWrapper>
          <i className={"fa fa-" + icon} />
        </IconWrapper>
      ) : null}
      {text}
    </ButtonWrapper>
  );
};

const IconWrapper = styled.div`
  display: inline-block;
  padding-right: 10px;
`;

type ButtonWrapperProps = {
  disabled: boolean;
  link: boolean;
  compact: boolean;
};

const ButtonWrapper = styled.div`
  background-color: ${(props: ButtonWrapperProps) =>
    props.link ? "transparent" : PRIMARY_COLOUR};
  display: inline-block;
  padding: ${props =>
    props.compact ? "10px 0 10px 0" : "10px 20px 10px 20px"};
  color: ${(props: ButtonWrapperProps) =>
    props.link ? PRIMARY_COLOUR : WHITE_TEXT_COLOUR};
  font-family: ${PRIMARY_FONT};
  border-radius: ${BORDER_RADIUS};
  box-shadow: ${(props: ButtonWrapperProps) =>
    props.link ? "none" : "rgba(0, 0, 0, 0.3) 5px 5px 10px"};
  transition: all ease 0.3s;
  cursor: ${(props: ButtonWrapperProps) =>
    props.disabled ? "not-allowed" : "pointer"};
  position: relative;
  left: 0;
  top: 0;
  opacity: ${(props: ButtonWrapperProps) => (props.disabled ? "0.5" : "1")};
  &:hover {
    background-color: ${(props: ButtonWrapperProps) =>
      props.link ? "transparent" : darken(0.05, PRIMARY_COLOUR)};
    transition: all ease 0.3s;
  }
  &:active {
    background-color: ${(props: ButtonWrapperProps) =>
      props.link ? "transparent" : darken(0.1, PRIMARY_COLOUR)};
    transition: all ease 0.3s;
    position: relative;
    left: 3px;
    top: 3px;
  }
`;
