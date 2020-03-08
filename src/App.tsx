import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { AppStateProvider } from './app-state';
import appReducer, { initialState } from './appReducer';
import useAuth from './useAuth';
import LoggedOut from './components/LoggedOut';
import LoggedIn from './components/LoggedIn';

const theme = {
    background: '#121212'
};

const Container = styled.div`
    background: ${props => props?.theme?.background};
    display: flex;
    justify-content: center;
    margin-right: 0;
    height: 100vh;
    width: 100%;
`;

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
