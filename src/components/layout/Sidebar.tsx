import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export const Sidebar = () => {
    return (
        <div css={styleSidebar}>
            <ul>
                <li>
                    <div>
                        <i>📥</i>
                        <span>Inbox</span>
                    </div>
                </li>
                <li>
                    <div>
                        <i>📆</i>
                        <span>Today</span>
                    </div>
                </li>
                <li>
                    <div>
                        <i>🗓</i>
                        <span>Next 7 days</span>
                    </div>
                </li>
                <div>
                    <span>
                        <h2>Projects</h2>
                    </span>
                    <span>▾</span>

                    <ul></ul>
                </div>
            </ul>
        </div>
    );
};

const styleSidebar = css`
    width: 266px;
    height: calc(100vh);
    padding-top: 74px;
    position: fixed;
    overflow-x: hidden;
    overflow-y: hidden;
    border-right: 3px;
    background-color: #fafafa;
`;
const styleUl = css``;
const styleProjects = css``;
