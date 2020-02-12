import React from 'react';
import { Content } from './components/layout/Content';
import { Navbar } from './components/layout/Navbar';
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';

const theme = {
    color: 'tomato'
};

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <main css={styles}>
                <Navbar />
                <Content />
            </main>
        </ThemeProvider>
    );
};

const styles = css`
    display: flex;
    justify-content: center;
    min-height: calc(100vh);
    margin-left: calc(100vw - 100%);
    margin-right: 0;
`;
