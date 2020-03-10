import React, { useState } from 'react';
import styled from 'styled-components';
import { rems } from '../constants/tokens';

export function Menu(props: any) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <MenuContainer>
            <MenuButton
                data-menu-open={isOpen}
                onClick={() => setIsOpen(!isOpen)}>
                {props.label}
            </MenuButton>
            <MenuListContainer style={{ opacity: isOpen ? 1 : 0 }}>
                {props.children}
            </MenuListContainer>
        </MenuContainer>
    );
}

export function MenuItem({ children, onClick }: any) {
    return (
        <li role='button' onClick={onClick}>
            {children}
        </li>
    );
}

const MenuContainer = styled.div`
    position: static;
`;

const MenuButton = styled.button`
    width: ${rems[32]};
    height: ${rems[32]};
    border-radius: ${rems[4]};
    color: #fff;
    border: none;
    outline: none;
    background: transparent;
    font-size: ${rems[16]};
    font-family: inherit;
    -webkit-appearance: none;
    &:hover {
        background: #2e2c31;
    }
    &[data-menu-open='true'] {
        background: #2f2f2f;
    }
`;

const MenuListContainer = styled.ul`
    position: absolute;
    padding: ${rems[4]} 0;
    margin: ${rems[4]} 0;
    min-width: 100%;
    visibility: visible;
    background: #2f2f2f;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2), 0px 3px 14px rgba(0, 0, 0, 0.12),
        0px 8px 10px rgba(0, 0, 0, 0.14);
    border-radius: 4px;
    border: none;
    outline: none;
    z-index: 2000;
    white-space: nowrap;

    li {
        min-width: 100%;
        height: ${rems[32]};
        padding-left: ${rems[8]};
        padding-right: ${rems[8]};
        display: flex;
        align-items: center;
        /* transform: translate(6px, 0); */
        transition: all 0.3s ease;
        &:hover {
            background: #484848;
        }
    }
`;
