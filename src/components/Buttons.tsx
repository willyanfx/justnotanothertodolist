import React from 'react';
import styled from 'styled-components';
import { rems } from '../constants/tokens';

interface ButtonProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
    <Primary onClick={onClick}>{children}</Primary>
);

export const SecondaryBtn: React.FC<ButtonProps> = ({ children, onClick }) => (
    <Secondary onClick={onClick}>{children}</Secondary>
);

const Primary = styled.button`
    font-size: ${rems[16]};
    height: ${rems[32]};
    color: ${props => props.theme.primary};
    font-weight: 600;
    border: 1px solid transparent;
    border-radius: ${rems[4]};
    background: transparent;
    &:hover {
        background: ${props => props.theme.btnHover};
    }
`;


const Secondary = styled.button`
    font-size: ${rems[14]};
    border-radius: ${rems[4]};
    color: ${props => props.theme.textSecond};
    border: none;
    background: transparent;
    height: ${rems[32]};
    &:hover {
        background: ${props => props.theme.btnHover};
    }
`;
