import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { AppStateProvider } from './app-state';
import appReducer, { initialState } from './appReducer';
import useAuth from './useAuth';
import LoggedOut from './components/LoggedOut';
import LoggedIn from './components/LoggedIn';

function App() {
    const { authAttempted, auth } = useAuth();
    if (!authAttempted) return null;
    return <Container>{auth ? <LoggedIn /> : <LoggedOut />}</Container>;
}

export default () => (
    <ThemeProvider theme={theme}>
        <AppStateProvider reducer={appReducer} initialState={initialState}>
            <App />
        </AppStateProvider>
    </ThemeProvider>
);

const theme = {
    background: '#121212',
    fontColor: '#fff'
};

const Container = styled.div`
    background: ${props => props.theme.background};
    display: flex;
    justify-content: center;
    margin-right: 0;
    height: 100vh;
    width: 100%;

    [data-todo-button] {
        height: 2rem;
        font-size: 1rem;
        border-radius: 0.25rem;
        span {
            width: 1.5rem;
            height: 1.5rem;
            margin-left: 0.25rem;
        }
    }
    [data-todo-input] {
        height: 2rem;
        width: 100%;
        border-radius: 0.25rem;
        border: 1px solid #dadada;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        background: #292929;
    }

    [data-todo-secondary-btn] {
    }
`;
