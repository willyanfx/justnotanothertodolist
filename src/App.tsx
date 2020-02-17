import React, { useState, useEffect, useCallback, useContext } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { AppStateProvider } from "./app-state"
import appReducer, { initialState } from "./appReducer";
import useAuth from './useAuth';

const theme = {
    color: 'tomato'
};

function Log() {
    const { authAttempted, auth } = useAuth();
    if (!authAttempted) return null
    return <div>{authAttempted ? <span>Dentro</span> : <span>Fora</span>}</div>
}


export const App: React.FC = () => {

    return (
        <ThemeProvider theme={theme}>
            <AppStateProvider reducer={appReducer} initialState={initialState}>
                <Log />
            </AppStateProvider>
        </ThemeProvider>
    )
}



const styles = css`
    display: flex;
    justify-content: center;
    min-height: calc(100vh);
    margin-left: calc(100vw - 100%);
    margin-right: 0;
`;
