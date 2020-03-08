import React, { useState, useRef } from 'react';
import { createDoc } from '../helpers';
import { useAppState } from '../app-state';
import styled from '@emotion/styled';

const AddProject = () => {
    const [{ auth }] = useAppState();
    const [show, setShow] = useState<boolean>(true);
    const [projectName, setProjectName] = useState<string>('');
    const handleAddProject = () => {
        createDoc(
            {
                name: projectName,
                uid: auth.uid,
                projectId: ''
            },
            'projects'
        );
        setProjectName('');
    };
    return (
        <>
            {show && (
                <AddProjectDiv>
                    <input
                        value={projectName}
                        onChange={e => setProjectName(e.target.value)}
                        type='text'
                    />
                    <button onClick={handleAddProject}>Add Project</button>
                    <div onClick={() => setShow(!show)}>Cancel</div>
                </AddProjectDiv>
            )}
            <span>+</span>
            <span
                aria-label='Add Project'
                data-testid='add-project-action'
                onClick={() => setShow(!show)}
                onKeyDown={() => setShow(!show)}
                role='button'
                tabIndex={0}>
                Add Project
            </span>
        </>
    );
};

export default AddProject;

const AddProjectDiv = styled.div`
    display: block;
    margin: 8px 16px;
    color: #fff;
    input {
        width: 100%;
        height: 32px;
        background: transparent;
        border: 1px solid #cacaca;
    }
    button {
        color: #fff;
        background: transparent;
    }
`;
