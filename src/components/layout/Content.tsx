import React from 'react';
import styled from 'styled-components';
import { Sidebar } from './Sidebar';
import { Tasks } from '../Tasks';

export const Content = () => {
    return (
        <section>
            <Sidebar />
            <Tasks />
        </section>
    );
};
