import React from 'react';
import styled from 'styled-components';
import { rems } from '../constants/tokens';

interface ButtonProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
    <Container onClick={onClick}>{children}</Container>
);

export const SecondaryBtn: React.FC<ButtonProps> = ({ children, onClick }) => (
    <Secondary onClick={onClick}>{children}</Secondary>
);

const Container = styled.button`
    font-size: ${rems[14]};
    height: ${rems[32]};
    color: #fff;
    border: 1px solid #434343;
    border-radius: ${rems[4]};
    background: transparent;
    &:hover {
        background: #2e2c31;
    }
`;
const Secondary = styled.button`
    font-size: ${rems[14]};
    border-radius: ${rems[4]};
    color: #fff;
    border: none;
    background: transparent;
    height: ${rems[32]};
    &:hover {
        background: #2e2c31;
    }
`;
