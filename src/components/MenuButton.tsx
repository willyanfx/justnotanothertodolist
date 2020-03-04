import React, { useState } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export function Menu(props: any) {
    const [open, setOpen] = useState<boolean>(true);

    return (
        <div css={menu}>
            <button onClick={() => setOpen(!open)} css={menuButton}>
                {props.label}
            </button>
            <div
                css={css`
                    opacity: ${open ? 1 : 0};
                    position: absolute;
                    border: 1px solid #000;
                `}>
                <ul css={menuList}>{props.children}</ul>
            </div>
        </div>
    );
}

export function MenuItem({ children, onClick }: any) {
    return (
        <li role='button' css={menuItem} onClick={onClick}>
            <span>{children}</span>
        </li>
    );
}

const menu = css``;
const menuButton = css`
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

const menuList = css`
    padding: 0;
    margin: 0;
    visibility: visible;
    /* transform: scale(1) translate(0, 12px);
    transition: opacity 0.3s ease, visibility 0.3s ease,
        transform 0.3s cubic-bezier(0.4, 0.6, 0.5, 1.32); */
`;
const menuItem = css`
    height: 32px;
    padding-left: 8px;
    padding-right: 8px;
    display: flex;
    align-items: center;
    /* transform: translate(6px, 0); */
    transition: all 0.3s ease;
    &:hover {
        background: #cacaca;
    }
`;
