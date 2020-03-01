import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export function Checkbox({ onClick }: any): React.ReactElement {
    return (
        <div>
            <button css={styleCheckbox} onClick={onClick} />
        </div>
    );
}

const styleCheckbox = css`
    cursor: pointer;
    border-color: gray;
    color: #343434;
    height: 16px;
    width: 16px;
    display: block;
    border: 1px solid gray;
    border-radius: 16px;
`;
