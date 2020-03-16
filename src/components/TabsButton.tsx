import React from 'react';
import styled from 'styled-components';
import { rems } from '../constants/tokens';

export default function TabsButton({
    children
}: React.HTMLAttributes<HTMLSpanElement>) {
    return (
        <Button data-todo-button type='submit'>
            {children}
        </Button>
    );
}


const Button = styled.button`
    font-size: ${rems[14]};
    height: ${rems[32]};
    color: #fff;
    border: 1px solid #434343;
    border-radius: ${rems[4]};
    background: transparent;
    &:hover {
        background: #2e2c31;
    }

`