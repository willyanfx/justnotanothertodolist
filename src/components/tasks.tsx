import React from 'react';
import styled from 'styled-components';
import { Checkbox } from './Checkbox';

export const Tasks = () => {
    return (
        <TaskDisplay>
            <h2>Project name</h2>
            <TaskList>
                <li>
                    <Checkbox />
                    <span>task</span>
                </li>
            </TaskList>
        </TaskDisplay>
    );
};

const TaskDisplay = styled.div`
    width: 656px;
    background-color: white;
    margin-left: 266px;
    border-right: 3px;
    min-height: calc(100vh);
    vertical-align: top;
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 80px;
    padding-bottom: 84px;

    h2 {
        font-size: 20px;
        font-weight: normal;
        margin: 0 30px 20px 0;
    }
`;
const TaskList = styled.ul`
    display: flex;
    line-height: 18px;
    color: #333;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 14px;
    list-style-type: none;
    border-bottom: 1px solid #f0f0f0;
`;
