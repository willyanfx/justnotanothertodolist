import React, { useState, useRef } from 'react';
import { createDoc } from '../helpers';
import { useAppState } from '../app-state';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';
import { rems } from '../constants/tokens';
import { Button, SecondaryBtn } from './Buttons';
import { Input } from './Input';

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
                    <Input
                        value={projectName}
                        placeholder='Add Project'
                        onChange={e => setProjectName(e.target.value)}
                    />
                    <div>
                        <Button onClick={handleAddProject}>Add Project</Button>
                        <SecondaryBtn onClick={() => setShow(!show)}>
                            Cancel
                        </SecondaryBtn>
                    </div>
                </AddProjectDiv>
            )}
        </>
    );
};

export default AddProject;

const ProjectBtn = styled.span`
    color: #fff;
    padding: 0 ${rems[16]};
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${rems[32]};
    font-size: ${rems[16]};
    text-align: center;
    &:hover {
        background: rgba(187, 134, 252, 0.04);
    }
`;

const AddProjectDiv = styled.div`
    /* display: block; */
    position: relative;
    margin: ${rems[8]} ${rems[8]};
    color: #fff;

    > div {
        display: grid;
        grid-column-gap: ${rems[8]};
        grid-template-columns: 1fr 1fr;
        margin-top: ${rems[8]};
    }
`;
