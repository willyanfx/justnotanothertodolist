import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export function MenuButton({ children }: any) {
    return (
        <select css={dropdown} placeholder='Please choose'>
            {children}
        </select>
    );
}

export function MenuItem({ children }: any) {
    return <option>{children}</option>;
}

const dropdown = css`
    display: inline-block;
    position: relative;
    overflow: hidden;
    height: 28px;
    width: 150px;
    background: #f2f2f2;
    border: 1px solid;
    border-color: white #f7f7f7 whitesmoke;
    border-radius: 3px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
`;
