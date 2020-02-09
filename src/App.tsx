import React from 'react';
import { Content } from './components/layout/Content';
import { Navbar } from './components/layout/Navbar';
import styled from 'styled-components';

export const App = () => {
    return (
        <Main>
            <Navbar />
            <Content />
        </Main>
    );
};

const Main = styled.section`
    display: flex;
    justify-content: center;
    min-height: calc(100vh);
    margin-left: calc(100vw - 100%);
    margin-right: 0;
`;
