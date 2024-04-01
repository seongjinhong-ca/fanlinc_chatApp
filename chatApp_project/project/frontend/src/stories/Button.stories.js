import React    from 'react';
import {action} from '@storybook/addon-actions';
import {Button} from "../components/Button";

export default {
    title: 'Button',
};

export const text = () => <Button text={"Please click me!"} onClick={action('clicked')}/>;
export const icon = () => <Button text={"Please click me!"} icon={"times"} onClick={action('clicked')}/>;
