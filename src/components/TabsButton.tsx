import React from 'react';
import styled from 'styled-components';
import { rems } from '../constants/tokens';

export default function TabsButton({
    children
}: React.HTMLAttributes<HTMLSpanElement>) {
    return (
        <Button type='submit'>
            {children}
        </Button>
    );
}


const Button = styled.button`
    font-size: ${rems[14]};
    height: ${rems[32]};
    width: 100%;
    color:  ${props => props.theme.text};
    border: 1px solid ${props => props.theme.outline};
    border-radius: ${rems[4]};
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    svg{
        margin-right: ${rems[4]}
    }
    &:hover {
        background: ${props => props.theme.main};
    }

`