import React, { useState, useRef } from 'react';
import { createDoc } from '../helpers';
import { useAppState } from '../app-state';
import styled from 'styled-components';
import { rems } from '../constants/tokens';
import { PrimaryBtn, SecondaryBtn } from '../Styles';
import { InputField } from '../Styles';
import { Plus } from './Icons';
import { useRequiredInput } from '../hooks/useRequiredInput';


const AddProject = () => {
    const [{ auth }] = useAppState();
    const [show, setShow] = useState<boolean>(false);
    const [projectName, setProjectName] = useState<string>('');
    const { error, setError } = useRequiredInput()
    const handleAddProject = () => {
        if (projectName === '') {
            setError(true)
        } else {
            createDoc(
                {
                    name: projectName,
                    uid: auth.uid,
                    projectId: ''
                },
                'projects'
            );
            setProjectName('');
        }
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
                <Plus />
                <span>Add Project</span>
            </ProjectBtn>
            {show && (
                <AddProjectDiv>
                    <InputField
                        data-error={error}
                        tabIndex={0}
                        aria-atomic="true"
                        aria-label='add task'
                        type="text"
                        required
                        value={projectName}
                        placeholder='Add Project'
                        onChange={e => setProjectName(e.target.value)}
                    />
                    <div>
                        <PrimaryBtn aria-label='Add Project' onClick={handleAddProject}>Add Project</PrimaryBtn>
                        <SecondaryBtn aria-label='Cancel' onClick={() => setShow(!show)}>
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
    color: ${props => props.theme.text};
    padding: 0 ${rems[16]};
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${rems[32]};
    font-size: ${rems[16]};
    text-align: center;
    margin: 0 ${rems[8]};
    &:hover {
        background: ${props => props.theme.hover};
    }
    svg {
        fill: ${props => props.theme.text};
        width: ${rems[24]};
        height: ${rems[24]};
    }
`;

const AddProjectDiv = styled.div`
    position: relative;
    margin: ${rems[8]} ${rems[8]};
    color: ${props => props.theme.text};
    > div {
        display: grid;
        grid-column-gap: ${rems[4]};
        grid-template-columns: 1fr 1fr;
        margin-top: ${rems[8]};
    }
`;
