import React from "react";
import styled from 'styled-components';
import { rems } from "../../constants/tokens";

export const Today = () => (
    <SVG viewBox='0 0 32 32'>
        <path
            d="M26 4h-4V2h-2v2h-8V2h-2v2H6c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 22H6V12h20v14zm0-16H6V6h4v2h2V6h8v2h2V6h4v4z"
        />
    </SVG>
);


export const Next7 = () => (
    <SVG viewBox='0 0 32 32'>
        <path
            d="M21 30a8 8 0 110-16 8 8 0 010 16zm0-14a6 6 0 100 12 6 6 0 000-12z"
        />
        <path d="M22.59 25L20 22.41V18h2v3.59l2 2L22.59 25z" />
        <path
            d="M28 6a2 2 0 00-2-2h-4V2h-2v2h-8V2h-2v2H6a2 2 0 00-2 2v20a2 2 0 002 2h4v-2H6V6h4v2h2V6h8v2h2V6h4v6h2V6z"

        />
    </SVG>
);



export const Inbox = () => (
    <SVG viewBox='0 0 32 32'>
        <path
            d="M20 21h-8a2 2 0 01-2-2v-2a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2zm-8-4v2h8v-2h-8z"
        />
        <path
            d="M28 4H4a2 2 0 00-2 2v4a2 2 0 002 2v16a2 2 0 002 2h20a2 2 0 002-2V12a2 2 0 002-2V6a2 2 0 00-2-2zm-2 24H6V12h20v16zm2-18H4V6h24v4z"
        />
    </SVG>
);

export const ArrowDown = () => (
    <SVG viewBox='0 0 32 32'>
        <path d="M16 22L6 12l1.4-1.4 8.6 8.6 8.6-8.6L26 12 16 22z" />
    </SVG>
);

export const Plus = () => (
    <SVG viewBox='0 0 32 32'>
        <path d="M17 15V8h-2v7H8v2h7v7h2v-7h7v-2h-7z" />
    </SVG>
);

export const Delete = () => (
    <SVG viewBox='0 0 32 32'>
        <path d="M12 12h2v12h-2V12zm6 0h2v12h-2V12z" />
        <path
            d="M4 6v2h2v20a2 2 0 002 2h16a2 2 0 002-2V8h2V6H4zm4 22V8h16v20H8zm4-26h8v2h-8V2z"
        />
    </SVG>
);

export const CloseX = () => (
    <SVG viewBox='0 0 32 32'>
        <path
            d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4l6.6 6.6L8 22.6 9.4 24l6.6-6.6 6.6 6.6 1.4-1.4-6.6-6.6L24 9.4z"
        />
    </SVG>
);

export const ProjectIcon = () => (
    <SVG viewBox='0 0 32 32'>
        <path
            d="M27 9h-3V6a2 2 0 00-2-2H10a2 2 0 00-2 2v3H5a3 3 0 00-3 3v14a2 2 0 002 2h24a2 2 0 002-2V12a3 3 0 00-3-3zM10 6h12v3H10V6zm18 20H4v-9h8v5h8v-5h8v9zm-14-9h4v3h-4v-3zM4 15v-3a1 1 0 011-1h22a1 1 0 011 1v3H4z"
        />
    </SVG>
);


export const User = () => (
    <SVG viewBox='0 0 32 32'>
        <path
            d="M12 4a5 5 0 110 10 5 5 0 010-10zm0-2a7 7 0 100 14 7 7 0 000-14zm10 28h-2v-5a5 5 0 00-5-5H9a5 5 0 00-5 5v5H2v-5a7 7 0 017-7h6a7 7 0 017 7v5zm3-13.82l-2.59-2.59L21 15l4 4 7-7-1.41-1.41L25 16.18z"
        />
    </SVG>
);



const SVG = styled.svg`
        fill: ${props => props.theme.text};
    width: ${rems[20]};
    height: ${rems[20]};
`
