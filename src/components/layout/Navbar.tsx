import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export const Navbar = () => {
    return (
        <header css={styleHeader}>
            <nav css={styleNav}>
                <div>
                    <img src='' alt='logo' />
                </div>
                <div css={styleSearchBar}>
                    <input type='text' placeholder='search' />
                </div>
                <div>
                    <ul css={styleUl}>
                        <li>
                            <button
                                css={theme => ({
                                    color: theme.color,
                                    styleAddButton
                                })}>
                                +
                            </button>
                        </li>
                        <li>
                            <button css={styleDarkmodeButton}>darkmode</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

const styleHeader = css`
    border-bottom: solid 1px #ca2100;
    background: #cacaca;
    transition: height 200ms ease-in;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    height: 44px;
    z-index: 400;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
`;

const styleNav = css`
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    max-width: 922px;
    margin: auto;
    height: 44px;
`;

const styleUl = css`
    display: flex;
    position: relative;
    list-style: none;
    justify-content: flex-end;
    li {
        list-style-type: none;
        cursor: pointer;
        width: 30px;
        height: 30px;
        text-align: center;
    }
`;
const styleAddButton = css`
    margin-right: 15px;
    font-size: 22px;
    display: flex;
    align-content: center;
    justify-content: center;
    border-radius: 50%;
`;
const styleDarkmodeButton = css`
    margin: 0;
`;

const styleSearchBar = css`
    width: 100%;
    input {
        width: 100%;
        height: 40px;
        font-size: 16px;
    }
`;
