import React, { useState } from 'react';

const AddProject = () => {
    const [show, setShow] = useState<boolean>(false);
    return (
        <div>
            {show && (
                <div>
                    <input type='text' />
                    <button>Add Project</button>
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
