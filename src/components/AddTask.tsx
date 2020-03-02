import React, { useState, useRef } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useAppState } from '../app-state';
import { createDoc } from '../helpers';
import { format as formatDate, addDays } from 'date-fns';

import { MenuButton, MenuItem } from './MenuButton';

export const AddTask = () => {
    const [{ auth }] = useAppState();

    const [task, setTask] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [project, setProject] = useState('');
    const [showAddTask, setShowAddTask] = useState(true);
    const taskRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        let projectId = project || 'TODAY';
        let collectedDate: string;

        if (projectId === 'TODAY') {
            collectedDate = formatDate(Date.now(), 'dd/MM/yyyy');
        } else if (projectId === 'NEXT_7DAYS') {
            collectedDate = formatDate(addDays(Date.now(), 6), 'dd/MM/yyyy');
        } else {
            collectedDate = formatDate(addDays(Date.now(), 14), 'dd/MM/yyyy');
        }
        createDoc(
            {
                date: collectedDate,
                uid: auth.uid,
                task: task,
                projectId,
                archived: false
            },
            'tasks'
        );
    };

    return (
        <div css={addTaskCSS}>
            <button onClick={() => setShowAddTask(!showAddTask)}>
                <span>+</span>
                <span>Add Task</span>
            </button>
            {showAddTask && (
                <div className='NewPost_form'>
                    <input
                        css={inputCSS}
                        type='text'
                        onChange={e => setTask(e.target.value)}
                    />
                    <div style={{ display: 'flex' }}>
                        <button onClick={handleSubmit}>Add Task</button>
                        <button onClick={() => setShowAddTask(!showAddTask)}>
                            Cancel
                        </button>
                        <span css={dropdownCSS}>
                            <MenuButton>
                                <MenuItem>Today</MenuItem>
                                <MenuItem>Next 7 days</MenuItem>
                            </MenuButton>
                            <MenuButton placeholder='Projects'>
                                <MenuItem></MenuItem>
                            </MenuButton>
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

const addTaskCSS = css`
    margin-top: 20px;
`;
const inputCSS = css`
    height: 32px;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #cacaca;
    margin-top: 8px;
    margin-bottom: 8px;
`;

const dropdownCSS = css`
    display: inline-grid;
    grid-auto-flow: column;
    grid-column-gap: 16px;
`;
