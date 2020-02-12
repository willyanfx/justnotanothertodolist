import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export const Sidebar = () => {
    return (
        <div css={styleSidebar}>
            <ul css={styleUl}>
                <li css={styleIl}>
                    <i css={styleIcon}>📥</i>
                    <span css={styleContent}>Inbox</span>
                </li>
                <li css={styleIl}>
                    <i css={styleIcon}>📆</i>
                    <span css={styleContent}>Today</span>
                </li>
                <li css={styleIl}>
                    <i css={styleIcon}>🗓</i>
                    <span css={styleContent}>Next 7 days</span>
                </li>
                <header css={styleProjects}>
                    <button>
                        <span>
                            <h2>Projects</h2>
                        </span>
                        <span>▾</span>
                    </button>

                    <ul></ul>
                </header>
            </ul>
        </div>
    );
};

const styleSidebar = css`
    width: 266px;
    height: calc(100vh);
    padding-top: 62px;
    position: fixed;
    overflow-x: hidden;
    overflow-y: hidden;
    border-right: 3px;
    background-color: #fafafa;
`;
const styleUl = css`
    margin: 0;
    padding: 0;
`;
const styleIl = css`
    min-height: 24px;
    font-size: 14px;
    list-style: none;
    cursor: pointer;
    padding: 5px 16px 5px 5px;
    transition: color 0.1s ease-in, background-color 0.1s ease-in;
    display: flex;
    border-radius: 3px;
    align-items: center;
`;

const styleIcon = css`
    width: 28px;
    height: 24px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    margin-top: -1px;
    font-size: 14px;
    color: #555;
`;
const styleContent = css`
    display: inline-block;
    width: 187px;
    vertical-align: top;
    min-height: 24px;
    line-height: 24px;
    word-break: break-all;
    word-break: break-word;
`;

const styleProjects = css`
    padding: 1px 0;
    position: relative;
    display: flex;
    font-size: 14px;
    line-height: 1em;
    cursor: pointer;
    button {
        flex: 1;
        display: flex;
        text-align: left;
        font-size: 14px;
        color: #333;
        font-weight: bold;
        padding: 10px 0;
    }
`;
