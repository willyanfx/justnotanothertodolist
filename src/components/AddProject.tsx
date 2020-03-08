import React, { useState, useRef } from 'react';
import { createDoc } from '../helpers';
import { useAppState } from '../app-state';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';

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
            <ProjectBtn
                aria-label='Add Project'
                data-testid='add-project-action'
                onClick={() => setShow(!show)}
                onKeyDown={() => setShow(!show)}
                role='button'
                tabIndex={0}>
                <span>
                    <FiPlus />
                </span>
                <span>Add Project</span>
            </ProjectBtn>
            {show && (
                <AddProjectDiv>
                    <input
                        value={projectName}
                        onChange={e => setProjectName(e.target.value)}
                        type='text'
                    />
                    <div>
                        <ProjectBtn onClick={handleAddProject}>
                            Add Project
                        </ProjectBtn>
                        <span
                            data-cancel-project
                            onClick={() => setShow(!show)}>
                            Cancel
                        </span>
                    </div>
                </AddProjectDiv>
            )}
        </>
    );
};

export default AddProject;

const ProjectBtn = styled.span`
    color: #fff;
    padding: 0 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    font-size: 14px;
    text-align: center;
    &:hover {
        background: rgba(187, 134, 252, 0.04);
    }
`;

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
    > div {
        display: grid;
        grid-column-gap: 8px;
        grid-template-columns: 1fr 1fr;
        margin-top: 8px;
    }
    button {
        color: #fff;
        background: transparent;
        height: 32px;
    }
`;
