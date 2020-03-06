import React, { useState, useRef, useEffect } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useAppState } from '../app-state';
import { createDoc } from '../helpers';
import { format as formatDate, addDays } from 'date-fns';
import useProject from '../hooks/useProject';
import { MenuItem, Menu } from './MenuButton';
import { StandardProj } from '../types';

export const AddTask = ({ onCancel }: any) => {
    const [{ auth }] = useAppState();
    const [{ user }] = useAppState();
    const projects = useProject(user.uid);

    const [task, setTask] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [projectName, setProjectName] = useState('');

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        let projectId = projectName || taskDate;
        let collectedDate: string = '';

        if (projectId === 'TODAY') {
            collectedDate = formatDate(Date.now(), 'dd/MM/yyyy');
        } else if (projectId === 'NEXT_7DAYS') {
            collectedDate = formatDate(addDays(Date.now(), 6), 'dd/MM/yyyy');
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
        setTask('');
        setProjectName('');
    };

    return (
        <div className='NewPost_form'>
            <input
                css={inputCSS}
                type='text'
                onChange={e => setTask(e.target.value)}
            />
            <div style={{ display: 'flex' }}>
                <button onClick={handleSubmit}>Add Task</button>
                <button onClick={onCancel}>Cancel</button>
                <span css={dropdownCSS}>
                    <Menu label='📆'>
                        <MenuItem
                            onClick={() => setTaskDate(StandardProj.inbox)}>
                            Inbox
                        </MenuItem>
                        <MenuItem
                            onClick={() => setTaskDate(StandardProj.today)}>
                            Today
                        </MenuItem>
                        <MenuItem
                            onClick={() => setTaskDate(StandardProj.next7)}>
                            Next 7 days
                        </MenuItem>
                    </Menu>
                    {projects && (
                        <Menu label='👩‍💻'>
                            {projects.map((item: any) => (
                                <MenuItem
                                    key={item.id}
                                    onClick={() => setProjectName(item.name)}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Menu>
                    )}
                </span>
            </div>
        </div>
    );
};

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
