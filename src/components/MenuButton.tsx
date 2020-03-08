import React, { useState } from 'react';
import styled from '@emotion/styled';

export function Menu(props: any) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <MenuDiv>
            <MenuButton onClick={() => setOpen(!open)}>
                {props.label}
            </MenuButton>

            <MenuListContainer style={{ opacity: open ? 1 : 0 }}>
                {props.children}
            </MenuListContainer>
        </MenuDiv>
    );
}

export function MenuItem({ children, onClick }: any) {
    return (
        <li role='button' onClick={onClick}>
            <span>{children}</span>
        </li>
    );
}

const MenuDiv = styled.div``;
const MenuButton = styled.button`
    padding: 9px 16px;
    border-radius: 6px;
    color: #151924;
    border: 1px solid #151924;
    background: #fff;
    line-height: 22px;
    font-size: 16px;
    font-family: inherit;
    -webkit-appearance: none;
`;

const MenuListContainer = styled.ul`
    position: absolute;
    padding: 0;
    margin: 0;
    visibility: visible;
    background: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.12),
            rgba(255, 255, 255, 0.12)
        ),
        #121212;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2), 0px 3px 14px rgba(0, 0, 0, 0.12),
        0px 8px 10px rgba(0, 0, 0, 0.14);
    border-radius: 4px;
    border: none;
    outline: none;

    li {
        height: 32px;
        padding-left: 8px;
        padding-right: 8px;
        display: flex;
        align-items: center;
        /* transform: translate(6px, 0); */
        transition: all 0.3s ease;
        &:hover {
            background: #484848;
        }
    }
`;
