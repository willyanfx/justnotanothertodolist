import React, { useState, useEffect, useCallback, useContext } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { AppStateProvider } from './app-state';
import appReducer, { initialState } from './appReducer';
import useAuth from './useAuth';
import LoggedOut from './components/LoggedOut';
import LoggedIn from './components/LoggedIn';

const theme = {
    color: 'tomato'
};

function App() {
    const { authAttempted, auth } = useAuth();
    if (!authAttempted) return null;
    return <div>{auth ? <LoggedIn /> : <LoggedOut />}</div>;
}

export default () => (
    <ThemeProvider theme={theme}>
        <AppStateProvider reducer={appReducer} initialState={initialState}>
            <App />
        </AppStateProvider>
    </ThemeProvider>
);

const styles = css`
    display: flex;
    justify-content: center;
    min-height: calc(100vh);
    margin-left: calc(100vw - 100%);
    margin-right: 0;
`;
