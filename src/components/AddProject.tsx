import React, { useState, useRef } from 'react';
import { createDoc } from '../helpers';
import { useAppState } from '../app-state';

const AddProject = () => {
    const [{ auth }] = useAppState();
    const [show, setShow] = useState<boolean>(false);
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
        <div>
            {show && (
                <div>
                    <input
                        value={projectName}
                        onChange={e => setProjectName(e.target.value)}
                        type='text'
                    />
                    <button onClick={handleAddProject}>Add Project</button>
                    <a href=''>Cancel</a>
                </div>
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
        </div>
    );
};

export default AddProject;
