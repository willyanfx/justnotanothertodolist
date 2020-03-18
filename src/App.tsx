import React from 'react';
import styled from 'styled-components';

import { AppStateProvider } from './app-state';
import appReducer, { initialState } from './appReducer';
import useAuth from './useAuth';
import LoggedOut from './components/LoggedOut';
import LoggedIn from './components/LoggedIn';
import { ThemeModeProvider } from './context/ThemeContext';

function App() {
    const { authAttempted, auth } = useAuth();
    if (!authAttempted) return null;
    return <Container>{auth ? <LoggedIn /> : <LoggedOut />}</Container>;
}

export default () => (
    <ThemeModeProvider>
        <AppStateProvider reducer={appReducer} initialState={initialState}>
            <App />
        </AppStateProvider>
    </ThemeModeProvider>

);


const Container = styled.div`
    background: ${props => props.theme.body};
    display: flex;
    justify-content: center;
    margin-right: 0;
    height: 100vh;
    width: 100%;
`;
