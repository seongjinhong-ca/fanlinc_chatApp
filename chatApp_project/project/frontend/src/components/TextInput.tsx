import React, { useState } from "react";
import styled from "styled-components";
import {
  BLACK_TEXT_COLOUR,
  BORDER_RADIUS,
  PRIMARY_FONT
} from "../configurations/styles";

type TextInputProps = {
  type?: string;
  placeholder?: string;
  text?: string;
  onTextChange?: (text: string) => void;
  onKeyPress?: (event: any) => void;
  error?: string;
  disabled?: boolean;
};

export const TextInput: React.FC<TextInputProps> = ({
  type = "text",
  placeholder = "",
  text,
  onTextChange,
  onKeyPress,
  error,
  disabled = false
}) => {
  const [defaultText, setDefaultText] = useState("");

  return (
    <div>
      <InputControl
        type={type}
        placeholder={placeholder}
        value={text ? text : defaultText}
        error={!!error}
        disabled={disabled}
        onKeyPress={onKeyPress}
        onChange={e =>
          onTextChange
            ? onTextChange(e.target.value)
            : setDefaultText(e.target.value)
        }
      />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
    </div>
  );
};

type InputControlProps = {
  error: boolean;
};

const InputControl = styled.input`
  color: ${BLACK_TEXT_COLOUR};
  width: calc(100% - 40px);
  font-family: ${PRIMARY_FONT};
  font-size: 16px;
  padding: 10px 20px 10px 20px;
  border-radius: ${BORDER_RADIUS};
  border: ${(props: InputControlProps) =>
    props.error ? "red 1px solid" : "none"};
  background-color: #f0f0f0;
  &:disabled {
    opacity: 0.7;
  }
`;

const ErrorMessage = styled.div`
  font-family: ${PRIMARY_FONT};
  color: red;
`;
