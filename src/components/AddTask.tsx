import React, { useState, useRef } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useAppState } from '../app-state';
import { createDoc } from '../helpers';

export const AddTask = () => {
    const [{ auth }] = useAppState();

    const [task, setTask] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [project, setProject] = useState('');
    const [showAddTask, setShowAddTask] = useState(true);
    const taskRef = useRef<HTMLInputElement | null>(null);
    const formRef = useRef(null);

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        let projectId = project || 'TODAY';
        let collectedDate: number;

        if (projectId === 'TODAY') {
            collectedDate = Date.now();
        } else {
            let newdate = new Date();
            collectedDate = newdate.setDate(newdate.getDate() + 7);
        }
        createDoc(
            {
                date: collectedDate,
                uid: auth.uid,
                task: taskRef.current?.value,
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
                <form
                    ref={formRef}
                    className='NewPost_form'
                    onSubmit={handleSubmit}>
                    <input css={inputCSS} type='text' ref={taskRef} />
                    <div style={{ display: 'flex' }}>
                        <button>Add Task</button>
                        <button>Cancel</button>
                        <span css={dropdownCSS}>
                            <button>Date</button>
                            <button>Project</button>
                        </span>
                    </div>
                </form>
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
