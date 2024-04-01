import React       from 'react';
import {TextInput} from "../components/TextInput";

export default {
    title: 'TextInput',
};

export const regular = () => <TextInput />;
export const withPlaceholder = () => <TextInput placeholder={"This is a placeholder!"} />;
export const withPassword = () => <TextInput placeholder={"Enter your password"} type={"password"} />;
export const withError = () => <TextInput placeholder={"Enter your password"} type={"password"} error={"Wrong password!"} />;
